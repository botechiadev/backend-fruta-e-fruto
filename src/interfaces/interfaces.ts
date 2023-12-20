import { PurchaseItem } from "../models/PurchaseItem";

export enum PRODUCTS_CATEGORY {
    'horti-fruti',
    'laticinios',
    'armazem'
}


export interface IProductDB {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    category: PRODUCTS_CATEGORY;
}

export enum USER_ROLES {
    "Cadastrado",
    "Cliente", 
    "Anonimo"
  }

export interface IUserDB {
    id: string;
    fullname: string;
    nickname: string;
    email: string;
    password: string;
    role: USER_ROLES;
    avatar: string;
  };

export enum RECIPES_CATEGORY{
    "Frutas",
    "Vegetais",
    "Smoothies",
    "Sucos"
}



export interface IRecipeDB{
    id: string,
    name: string,
    ingredients: string[],
    cooking: string[],
    description: string,
    imgUrl: string,
    category: RECIPES_CATEGORY
}

export enum PAYMENT_TYPES{
    JUROS0=1|2,
    JUROS5=3|4|5|6,
    JUROS10=7|8
}

export interface IPurchaseDetails{
    id:string,
    purchaseList:PurchaseItem[],
    totalPrice: number,
    percentOfDiscount:number,
    totalDiscount: number,
    finalPrice:number ,
    totalItems : number ,
    paymentType: PAYMENT_TYPES,
    buyerId?: string |undefined,
    accountId?: string|undefined 
}

export interface IPurchaseItem {
 id:string,
  name: string,
  quantity: number,
  unityPrice: number,
  totalPrice : number,
  purchase_id: string
}