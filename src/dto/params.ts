import { Expose, Transform } from "class-transformer";
import { IsInt } from "class-validator";

export class Params {
    @IsInt()
    @Expose({name: "id"})
    @Transform(({value}) => {
        if(/^[0-9]+$/.test(value)) 
            return (value); else throw { status: 406, message: 'El ID contiene parametros incorrectos'};
    }, {toClassOnly: true})
    id: number

    constructor(data: Partial<Params>) {
        Object.assign(this, data);
        this.id = 1
    }

}