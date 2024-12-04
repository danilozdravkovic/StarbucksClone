export interface ICartLine {
    productId:number,
    sizeId:number,
    addIns:ICartLineAddIns[]
}

export interface ICartLineAddIns{
    id:number,
    pump:number|null
}