import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class Cliente {
    // Renombra el campo cuando se serializa (Cuando se convierte a JSON)
    @Expose({ name: 'name' })
    // Valida si el campo esta definido, es decir no es undefined.
    @IsDefined({ message: () => { throw { status: 422, message: 'The client name is required' } } })
    Nombre: string;

    @Expose({ name: 'lastName' })
    @IsDefined({ message: () => { throw { status: 422, message: 'The client lastname is required' } } })
    Apellido: string;

    @Expose({ name: 'dni' })
    @IsDefined({ message: () => { throw { status: 422, message: 'The client dni  is required' } } })
    DNI: string;

    @Expose({ name: 'address' })
    @IsDefined({ message: () => { throw { status: 422, message: 'The client addresss is required' } } })
    Direccion: string;

    @Expose({ name: 'phone' })
    @IsDefined({ message: () => { throw { status: 422, message: 'The client phone is required' } } })
    Telefono: string;

    @Expose({ name: 'email' })
    @IsDefined({ message: () => { throw { status: 422, message: 'The client email is required' } } })
    Email: string;
    // Acepta un objeto que contiene info parcial de Automovil
    constructor(data: Partial<Cliente>) {
        // Copia los datos proporcionados en el objeto data
        Object.assign(this, data)
        // Asigna Valores por defecto
        this.Nombre = "";
        this.Apellido = "";
        this.DNI = "";
        this.Direccion = "";
        this.Telefono = "30054781721";
        this.Email = "example@gmail.com";
    }
}