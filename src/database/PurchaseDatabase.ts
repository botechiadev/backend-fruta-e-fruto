import { IPurchaseDB } from '../interfaces/interfaces';
import {BaseDatabase} from './BaseDatabase'

export class PurchaseDatabase extends BaseDatabase{
 public static TABLE_PURCHASES = "purchases"
 
async insertPurchase (purchase4insert: IPurchaseDB):Promise<void>{
await BaseDatabase.connection(PurchaseDatabase.TABLE_PURCHASES).insert(purchase4insert)
  
}


async findPurchaseById(id:string):Promise<IPurchaseDB[]>{

    const result = await BaseDatabase.connection(PurchaseDatabase.TABLE_PURCHASES).
    where( "id","LIKE", `%${id}%`)
  
  
      const purchasesDB = result
    return purchasesDB
  }
  
  
}