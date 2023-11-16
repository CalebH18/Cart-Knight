export function FormPrice(price: number) {
    return (price / 100).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
}