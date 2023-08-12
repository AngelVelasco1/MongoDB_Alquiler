import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class Automovil {
    @Expose({ name: 'car' })
    @IsDefined({ message: () => { throw { status: 422, message: 'The car param is required' } } })
    ID_automovil: number;

    @Expose({ name: 'brand' })
    @IsDefined({ message: () => { throw { status: 422, message: 'The make of car param is required' } } })
    Marca: string;

    @Expose({ name: 'model' })
    @IsDefined({ message: () => { throw { status: 422, message: 'The make of car param is required' } } })
    Modelo: string;

    @Expose({ name: 'year' })
    @IsDefined({ message: () => { throw { status: 422, message: 'The make of car param is required' } } })
    Anio: number;

    @Expose({ name: 'type' })
    @IsDefined({ message: () => { throw { status: 422, message: 'The make of car param is required' } } })
    Tipo: string;

    @Expose({ name: 'capacity' })
    @IsDefined({ message: () => { throw { status: 422, message: 'The make of car param is required' } } })
    Capacidad: number;

    @Expose({ name: 'rate' })
    @IsDefined({ message: () => { throw { status: 422, message: 'The make of car param is required' } } })
    Precio_Diario: number;

    constructor(data: Partial<Automovil>) {
        Object.assign(this, data)
        this.ID_automovil = 0;
        this.Marca = "";
        this.Modelo = "";
        this.Anio = 0;
        this.Tipo = "";
        this.Capacidad = 0;
        this.Precio_Diario = 0;
    }
}