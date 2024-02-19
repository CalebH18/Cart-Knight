import zod from "zod";
const envSCHEMA = zod.object({
    DATABASE_URL: zod.string().nonempty(),
    GOOGLE_CLIENT_ID: zod.string().nonempty(),
    GOOGLE_CLIENT_SECRET: zod.string().nonempty(),
    NEXTAUTH_URL: zod.string().nonempty(),
    NEXTAUTH_SECRET: zod.string().nonempty(),
    PAYPAL_CLIENT_ID: zod.string().nonempty(),
    PAYPAL_CLIENT_SECRET: zod.string().nonempty(),
});
export const env = envSCHEMA.parse(process.env);
