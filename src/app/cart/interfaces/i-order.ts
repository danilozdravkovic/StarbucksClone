export interface IOrder {
    address:string | null | undefined,
    totalPrice:number,
    paymentOption:string,
    pickupOption:string,
    cardNumber:string | null | undefined,
}
