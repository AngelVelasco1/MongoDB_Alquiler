import { Expose, Transform } from "class-transformer";
import { IsInt } from "class-validator";
export class Params{
    @Expose({name: "id"})
    @Transform(({value})=>{
        if(isNaN(value)) throw new Error("El id contiene parametros incorrectos")
        return (value); 
    }, {toClassOnly: true})
    @IsInt()
    id: number;
    constructor(data: Partial<Params>){
        Object.assign(this, data);
        this.id = 1;
    }
}