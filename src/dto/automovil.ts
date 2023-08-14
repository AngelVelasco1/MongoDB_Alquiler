import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class Automovil {
    // Renombra el campo cuando se serializa (Cuando se convierte a JSON)
    @Expose({ name: 'car' })
    // Valida si el campo esta definido, es decir no es undefined.
    @IsDefined({ message: () => { throw { status: 422, message: 'The car param is required' } } })
    ID_automovil: number;

    @Expose({ name: 'brand' })
    @IsDefined({ message: () => { throw { status: 422, message: 'The make of car param is required' } } })
    Marca: string;

    @Expose({ name: 'model' })
    @IsDefined({ message: () => { throw { status: 422, message: 'The model of car param is required' } } })
    Modelo: string;

    @Expose({ name: 'year' })
    @IsDefined({ message: () => { throw { status: 422, message: 'The age of car param is required' } } })
    Anio: number;

    @Expose({ name: 'type' })
    @IsDefined({ message: () => { throw { status: 422, message: 'The type of car param is required' } } })
    Tipo: string;

    @Expose({ name: 'capacity' })
    @IsDefined({ message: () => { throw { status: 422, message: 'The capacity of car param is required' } } })
    Capacidad: number;

    @Expose({ name: 'rate' })
    @IsDefined({ message: () => { throw { status: 422, message: 'The daily_rate of car param is required' } } })
    Precio_Diario: number;
    // Acepta un objeto que contiene info parcial de Automovil
    constructor(data: Partial<Automovil>) {
        // Copia los datos proporcionados en el objeto data
        Object.assign(this, data)
        // Asigna Valores por defecto
        this.ID_automovil = 0;
        this.Marca = "";
        this.Modelo = "";
        this.Anio = 0;
        this.Tipo = "";
        this.Capacidad = 0;
        this.Precio_Diario = 0;
    }
}