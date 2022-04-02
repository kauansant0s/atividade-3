export class Celular {
  
    constructor() {
}
   // constructor(id?: number, nome?: string, email?: string) {
   //   this.id = id;
   //   this.nome = nome;
   //   this.email = email;
   // }
   
   public id: number;
   public marca: string;    
   public modelo: string; 
   public ano: string;    
   public armazenamento: string;    
   public memoriaRAM: string; 
   public SO: string;
   toString() {
     return this.id+''+this.marca+''+this.modelo+''
     +this.ano+''+this.armazenamento+''+this.memoriaRAM+''
     +this.SO;
   }
 }