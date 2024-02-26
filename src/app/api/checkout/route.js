import { NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";
import { getCart } from "@/library/database/cart";

let environment = new paypal.core.SandboxEnvironment(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID, process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET);
let client = new paypal.core.PayPalHttpClient(environment);

export async function POST() {
  const cart = await getCart();
  let request = new paypal.orders.OrdersCreateRequest();

  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: cart.subtotal/100,
        },
      },
    ],
  });

  const response = await client.execute(request);

  return NextResponse.json({
    id: response.result.id,
  });
}
