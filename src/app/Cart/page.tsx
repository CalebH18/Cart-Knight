import { getCart } from "@/library/database/cart";
import Entry from "./Entry"
import { setProductQuantity } from "./actions";
import { FormPrice } from "@/library/FormPrice";

export const metadata = {
    title: "Your Cart - CartKnight",
};

export default async function CartPage(){
    const cart = await getCart();

    return(
        <div>
            <h1 className="mb-6 text-3x1 font-bold">Your Cart</h1>
            {cart?.items.map(cartItem => (
                <Entry cartItem={cartItem} key={cartItem.id} setProductQuantity={setProductQuantity}/>
            ))}
            {!cart?.items.length && <p>Cart is Empty</p>}
            <div className="flex flex-col items-end sm:items-center">
                <p className="mb-3 font-bold">
                    Total: {FormPrice(cart?.subtotal || 0)}
                </p>
                <button className="btn btn-primary sm:w-[200px]">Check Out</button>
            </div>
        </div>
    );
}