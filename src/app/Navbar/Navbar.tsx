import { getCart } from "@/library/database/cart";
import Link from "next/link";
import { redirect } from "next/navigation";
import ShopCartButton from "./ShopCartButton";
import UserButton from "./UserButton";
import { getServerSession } from "next-auth";
import { authOpt } from "../api/auth/[...nextauth]/route";

async function search_bar(formData: FormData) {
    "use server";
    const searchBar = formData.get("searchBar")?.toString();
    if (searchBar) {
        redirect("/search?query=" + searchBar);
    }
}

export default async function Navbar() {
    const cart = await getCart();
    const sess= await getServerSession(authOpt);
    return(
        <div className="bg-base-100">
            <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost text-xl">Lancelot</Link>
                </div>
                <div>
                    <Link href="/About">About Us</Link>
                </div>
                <div className="flex-none gap-2">
                    <form action={search_bar}>
                        <div className="form-control">
                            <input
                                name="searchBar"
                                placeholder="Search"
                                className="input input-bordered w-full" 
                            />
                        </div>
                    </form>
                    <ShopCartButton cart={cart} />
                    <UserButton session={sess}/>
                </div>
            </div>
        </div>
    );
}