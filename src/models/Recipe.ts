import { RECIPES_CATEGORY } from "../interfaces/interfaces"

export class Recipe{
    constructor(
        private id: string,
        private title: string,
        private ingredients: string[],
        private cooking: string[],
        private description: string,
        private imageUrl: string,
        private category: RECIPES_CATEGORY
     ){}

       public getId():string{
        return this.id
       }


       public getTitle():string{
        return this.title
       }

       public getDescription():string{
        return this.description
       }

       public setDescription (value:string):void{
            this.description = value
       }
       public getImageUrl():string{
        return this.imageUrl
       }

       public setImageUrl (value:string):void{
            this.imageUrl = value
       }
       public getPrice():number{
        return this.price
       }

       public setPrice (value:number):void{
            this.price = value
       }
       public getCategory():PRODUCTS_CATEGORY{
          return this.category
         }
  
         public setCategory (value:RECIPES_CATEGORY):void{
              this.category = value
         }
}

