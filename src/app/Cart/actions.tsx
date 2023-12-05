"use server"

import { createCart, getCart } from "@/library/database/cart";
import { prisma } from "@/library/database/prisma";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productID: string, quantity: number){
    const cart = await getCart() ?? await createCart();
    const itemInCart = cart.items.find((item) => item.productID === productID);
    if(quantity==0){
        if(itemInCart){
            await prisma.cartItem.delete({
                where: {id: itemInCart.id}
            })
        }
    }else{
        if(itemInCart){
            await prisma.cartItem.update({
                where: {id: itemInCart.id},
                data: {quantity}
            })
        }else{
            await prisma.cartItem.create({
                data: {
                    cartID: cart.id,
                    productID,
                    quantity
                }
            })
        }
    }
    revalidatePath("/Cart");
}