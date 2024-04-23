"use client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function CheckOut() {
  return (
    <div className="h-screen bg-white flex items-center justify-center">
      <PayPalScriptProvider
        options={{
          clientId:
          process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical", color: "gold" }}
          createOrder={async (data, actions) => {
            const res = await fetch("/api/checkout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const order = await res.json();
            console.log(order);
            return order.id;
          }}
          onCancel={(data) => {
            console.log("Cancelled:", data);
          }}
          onApprove={(data, actions) => {
            console.log("Approved:", data);
            actions.order.capture();
            window.location.href = "/thankYou";
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default CheckOut;
