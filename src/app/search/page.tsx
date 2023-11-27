import ProdCard from "@/comps/ProdCard"
import { prisma } from "@/library/database/prisma"

interface SearchPageProps {
    searchParams: { query: string }
}

export default async function SearchPage ({searchParams : {query}}: SearchPageProps) {
    const prods = await prisma.prod.findMany({
        where: {
            OR: [
                { name: { contains: query, mode: "insensitive" }},
                { description: { contains: query, mode: "insensitive" }},
            ]
        },
        orderBy: { id: "desc" }
    })
    if(prods.length === 0){
        return <div>Sorry, no prodocts found</div>
    }
    return (
        <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {prods.map(product =>(
                <ProdCard product= {product} key={product.id} />
            ))}
        </div>
    )
}