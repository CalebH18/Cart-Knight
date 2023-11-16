import { Prod } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";
interface ProdCardProps {
    product: Prod;
}
export default function ProdCard({product}: ProdCardProps) {
    return(
        <Link
        href={"/products/" + product.id}
        className="card w-full bg-base-100 transition-shadow hover:shadow-xl"
        >
            <figure>
                <Image
                    src={product.imageURL}
                    alt={product.name}
                    width={800}
                    height={400}
                    className="h-48 object-cover"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title font-bold">
                    {product.name}
                </h2>
                <p>
                    {product.description}
                </p>
                <PriceTag price={product.price} />
            </div>
        </Link>
    )
}