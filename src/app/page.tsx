import ProdCard from '@/comps/ProdCard';
import { prisma } from '@/library/database/prisma';
import Image from 'next/image';

export default async function Home() {
  const products = await prisma.prod.findMany({
    orderBy: {id: "desc"}
  });
  return (
    <div>
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.slice(0).map(product =>(
          <ProdCard product= {product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
