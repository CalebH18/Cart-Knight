import PriceTag from "@/comps/PriceTag";
import { prisma } from "@/library/database/prisma"
import Image from "next/image";
import { notFound } from "next/navigation"
import AddCartButton from "./AddCart";
import { incrementProductQuantity } from "./actions";

interface ProductPageProps {
    params: {
        id: string,
    }
}
export default async function ProductPage(
    {params: {id}} : ProductPageProps
) {
    const product = await prisma.prod.findUnique({where: {id}})
    if (!product) notFound();
    return(
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            <Image
                src={product.imageURL}
                alt={product.name}
                width={550}
                height={550}
                className="rounded-lg"
                priority
            />
            <div>
                <h1 className="text-5xl font-bold">{product.name}</h1>
                <PriceTag price={product.price} className="mt-4" />
                <p className="py-6">{product.description}</p>
                <AddCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity}/>
            </div>
        </div>
    )
}