import { cookies } from "next/dist/client/components/headers";
import { prisma } from "./prisma";
import { Cart, Prisma } from "@prisma/client";

export type CartWithProducts = Prisma.CartGetPayload<{
    include: { items: { include: { product: true } } };
}>;

export type ShoppingCart = CartWithProducts & {
    size: number;
    subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
    const locCartID=cookies().get("locCartID")?.value;
    const cart = locCartID
        ? await prisma.cart.findUnique({
            where: { id: locCartID },
            include: { items: { include: {product: true} } }
        })
    : null;
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
    const newCart = await prisma.cart.create({
        data: {}
    });
    //add security
    cookies().set("locCartID", newCart.id);
    return {
        ...newCart,
        items: [],
        size: 0,
        subtotal: 0,
    };
}