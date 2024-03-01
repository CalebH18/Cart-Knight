import { cookies } from "next/dist/client/components/headers";
import { prisma } from "./prisma";
import { Cart, CartItem, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";

export type CartWithProducts = Prisma.CartGetPayload<{
    include: { items: { include: { product: true } } };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
    include:{product: true};
}>

export type ShoppingCart = CartWithProducts & {
    size: number;
    subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
    const session = await getServerSession(authOptions);

    let cart: CartWithProducts | null = null;

    if(session){

        cart = await prisma.cart.findFirst({
            where: {userId : session.user.id},
            include: { items: { include: {product: true} } } 

        })

    }


    else {
        const locCartID=cookies().get("locCartID")?.value;
        cart = locCartID
            ? await prisma.cart.findUnique({
                where: { id: locCartID },
                include: { items: { include: {product: true} } },
            })
        : null;
    }

    
    if (!cart) {
        return null;
    }
    return {
        ...cart,
        size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
        subtotal: cart.items.reduce(
          (acc, item) => acc + item.quantity * item.product.price,
          0
        ),
    };
}

export async function createCart(): Promise<ShoppingCart> {

    // rajan code **************************
    // this function will merge user cart with the anonymous cart

    const session = await getServerSession(authOptions);

    let newCart: Cart;

    if(session){
        newCart = await prisma.cart.create({
            data: {userId: session.user.id} // next auth doesnt have id so need to add
        })

    }
    else {
        newCart = await prisma.cart.create({
            data: {}
        });
        cookies().set("locCartID", newCart.id);
    }

    // *************************************

    //add security

    return {
        ...newCart,
        items: [],
        size: 0,
        subtotal: 0,
    };
}

// this function will merge carts
export async function mergeAnonToUser(userId:string) {

    const locCartID=cookies().get("locCartID")?.value;

    const locCart = locCartID
        ? await prisma.cart.findUnique({
            where: { id: locCartID },
            include: { items: true },
        })
    : null;

    if (!locCart) return;


    const userCart = await prisma.cart.findFirst({
        where: {userId},
        include: { items: true },
    })

    await prisma.$transaction(async tx => {
        if(userCart)
        {
            const mergedCartItems = mergeCartItems(locCart.items, userCart.items)


            await tx.cartItem.deleteMany({
                where: {cartID: userCart.id}
            })

            await tx.cartItem.createMany({
                data: mergedCartItems.map(item => ({
                    cartID: userCart.id,
                    productID: item.productID,
                    quantity: item.quantity,
                }))
            })

        }
        else {
            await tx.cart.create ({
                data: {
                    userId,
                    items: {
                        createMany: {
                            data: locCart.items.map(item => ({
                                productID: item.productID,
                                quantity: item.quantity,
                            }))
                        }
                    }
                }
            })
        }

        await tx.cart.delete({
            where: {id: locCart.id}
        })

        cookies().set("locCartIDs", "");
    });
    
}

function mergeCartItems(...cartItems: CartItem[][]) {
    return cartItems.reduce((acc, items) => {
        items.forEach((item) => {
            const existingItem = acc.find((i) => i.productID === item.productID);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            }
            else {
                acc.push(item);
            }
        });
        return acc;
    }, [] as CartItem[]);
}

