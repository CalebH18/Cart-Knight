"use server";

import { createCart, getCart } from "@/library/database/cart";
import { prisma } from "@/library/database/prisma";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(productID: string) {
    const cart = await getCart() ?? await createCart();
    const itemInCart = cart.items.find((item) => item.productID === productID);
    if (itemInCart) {
        await prisma.cartItem.update({
            where: { id: itemInCart.id },
            data: {quantity: { increment: 1 }}
        });
    } else {
        await prisma.cartItem.create({
            data: {
                cartID: cart.id,
                productID,
                quantity: 1,
            },
        });
    }
    revalidatePath("/products/[id]");
}