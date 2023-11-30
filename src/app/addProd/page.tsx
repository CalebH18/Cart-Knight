import FSButton from "@/comps/FSButton";
import { prisma } from "@/library/database/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOpt } from "../api/auth/[...nextauth]/route";
async function add_Product(formData: FormData) {
    "use server";
    const name=formData.get("name")?.toString();
    const description=formData.get("description")?.toString();
    const imageURL=formData.get("imageURL")?.toString();
    const price=Number(formData.get("price") || 0);
    if (!name || !description || !imageURL || !price){
        throw Error("Fill out the whole form please");
    }
    await prisma.prod.create({
        data: {name, description, imageURL, price},
    });
    redirect("/")
}
export default async function addProdPage() {
    const sess= await getServerSession(authOpt);
    if(!sess){
        return(<div>Sorry, you do not have access to that</div>)
    }
    return(
        <div>
            <h1 className="mb-3 text-lg font-bold">Add Products!</h1>
            <form action={add_Product}>
                <input
                    required
                    name="name"
                    placeholder="name"
                    className="input input-bordered mb-3 w-full"
                />
                <textarea
                    required
                    name="description"
                    placeholder="enter desc here"
                    className="textarea-bordered textarea mb-3 w-full" 
                />
                <input
                    required
                    name="imageURL"
                    placeholder="URL pls"
                    type="url"
                    className="input input-bordered mb-3 w-full"
                />
                <input
                    required
                    name="price"
                    placeholder="moneyz cost"
                    type="number"
                    className="input input-bordered mb-3 w-full"
                />
                <FSButton className="btn-block">Add that bad boy</FSButton>
            </form>
        </div>
    )
}