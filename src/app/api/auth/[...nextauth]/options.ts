import { mergeAnonToUser } from "@/library/database/cart";
import { prisma } from "@/library/database/prisma";
import { env } from "@/library/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        session({session, user}) {
            session.user.id = user.id
            return session;
        },
    },
    events: {
        async signIn({user}) {
            await mergeAnonToUser(user.id);
        }
    }
}

export default authOptions;
