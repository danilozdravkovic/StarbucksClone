export interface IProductCategory {
    id:number,
    name:string,
    src?:string,
    parentId:string
}

export interface IProductCategoryPrint extends IProductCategory{
    children:IProductCategory[]
}
