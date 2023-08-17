import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class Alquiler {
    // Renombra el campo cuando se serializa (Cuando se convierte a JSON)
    @Expose({ name: 'start_date' })
    // Valida si el campo esta definido, es decir no es undefined.
    @IsDefined({ message: () => { throw { status: 422, message: 'The start date param is required' } } })
    Fecha_Inicio: Date;

    @Expose({ name: 'end_date' })
    @IsDefined({ message: () => { throw { status: 422, message: 'The end date param is required' } } })
    Fecha_Fin: Date;

    @Expose({ name: 'total_amount' })
    @IsDefined({ message: () => { throw { status: 422, message: 'The total amount param is required' } } })
    Costo_Total: number;

    @Expose({ name: 'status' })
    @IsDefined({ message: () => { throw { status: 422, message: 'The status param is required' } } })
    Estado: string;
    // Acepta un objeto que contiene info parcial 
    constructor(data: Partial<Alquiler>) {
        // Copia los datos proporcionados en el objeto data
        Object.assign(this, data)
        // Asigna Valores por defecto
        this.Fecha_Inicio = new Date("2023-08-05");
        this.Fecha_Fin = new Date("2023-09-20");;
        this.Costo_Total = 0;
        this.Estado = "";
    }
}