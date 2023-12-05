"use client";

import { CartItemWithProduct } from "@/library/database/cart";
import { FormPrice } from "@/library/FormPrice";
import Image from "next/image";
import Link from "next/link";
import { startTransition, useTransition } from "react";
import { setProductQuantity } from "./actions";

interface CartEntryProps {
    cartItem: CartItemWithProduct;
    setProductQuantity: (productID: string, quantity: number) => Promise<void>;
}

export default function Entry({ cartItem: {product, quantity}} : CartEntryProps){
    const [isPending, startTransition] = useTransition();
    const quantityOptions: JSX.Element[] = [];
    for(let i = 1; i <= 99; i++){
        quantityOptions.push(
            <option value={i} key={i}>
                {i}
            </option>
        )
    }
    return(
        <div>
            <div className="flex flex-wrap items-center gap-3">
                <Image
                    src={product.imageURL}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="rounded-lg"
                />
                <div>
                    <Link href={"/products/" + product.id} className="font-bold">
                        {product.name}
                    </Link>
                    <div>Price: {FormPrice(product.price)}</div>
                    <div className="my-1 flex items-center gap-2">
                        Quantity:
                        <select
                        className="select select-bordered w-full max-w-[80px]"
                        defaultValue={quantity}
                        onChange={e => {
                            const newQuant = parseInt(e.currentTarget.value)
                            startTransition(async () => {
                                await setProductQuantity(product.id, newQuant)
                            })
                        }}
                        >
                            <option value={0}>Remove</option>
                            {quantityOptions}
                        </select>
                    </div>
                    <div className="flex items-center gap-3">
                        Total: {FormPrice(product.price*quantity)}
                        {isPending && <span className="loading loading-spinner loading-sm"/>}
                    </div>
                </div>
            </div>
            <div className="divider"/>
        </div>
    )
}