import FSButton from "@/comps/FSButton";
import { prisma } from "@/library/database/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { type Prisma } from '@prisma/client';

async function add_User(formData: FormData) {
	"use server";
	const name=formData.get("name")?.toString();
	const email=formData.get("email")?.toString();
    const p=formData.get("password")?.toString();
	
    if (!name || !email || !p){
    	throw Error("Fill out the whole form please");
	}
    const hashedPassword = await bcrypt.hash(p, 10);
	const emailVerified=null;
	const image=null;
    const userData: Prisma.UserCreateInput = ({
        name,
        email,
        hashedPassword,
        emailVerified,
        image
    } as any);
	await prisma.user.create({
    	data: userData,
	});
	redirect("/")
}
export default async function addUserPage() {
	return(
    	<div>
        	<h1 className="mb-3 text-lg font-bold">Add Your User!</h1>
        	<form action={add_User}>
            	<input
                	required
                	name="name"
                	placeholder="name"
                	className="input input-bordered mb-3 w-full"
            	/>
            	<input
                	required
                	name="email"
                	placeholder="email"
                	className="input input-bordered mb-3 w-full"
            	/>
                <input
                	required
                	name="password"
                	placeholder="password"
                	className="input input-bordered mb-3 w-full"
            	/>
            	<FSButton className="btn-block">Add Your User</FSButton>
        	</form>
    	</div>
	)
}
