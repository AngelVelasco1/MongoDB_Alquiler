use("db_campus_alquiler:");

//? Create collections */
db.createCollection("sucursal");
db.createCollection("sucursal_automovil");
db.createCollection("automovil");
db.createCollection("reserva");
db.createCollection("cliente");
db.createCollection("alquiler");
db.createCollection("empleado");
db.createCollection("registro_devolucion");
db.createCollection("registro_entrega");

//? Insert documents into collections */
db.sucursal.insertOne({
    _id: ObjectId(1),
    Nombre: "Zona Franca",
    Direccion: "CAlle 20",
    Telefono: 34578117,
});
db.sucursal_automovil.insertOne({
    _id: ObjectId(1),
    ID_Sucursal_id: ObjectId("00000001a3e7bb96f4d30e47"),
    ID_Automovil: ObjectId(1),
    cantidad: 5,
});
db.automovil.insertOne({
    _id: ObjectId(1),
    ID_Automovil_id: ObjectId("00000001a3e7bb96f4d30e48"),
    Marca: "Ford",
    Modelo: 25,
    Anio: 2022,
    tipo: "Convertible",
    capacidad: 4,
    Precio_Diario: 50.5,
});
db.automovil.insertMany([
    {
        _id: ObjectId(2),
        ID_Automovil_id: ObjectId("00000001a3e7bb96f4d30e49"),
        Marca: "Toyota",
        Modelo: 30,
        Anio: 2021,
        tipo: "SUV",
        capacidad: 5,
        Precio_Diario: 70.25
    },

    {
        _id: ObjectId(3),
        ID_Automovil_id: ObjectId("00000001a3e7bb96f4d30e4a"),
        Marca: "Chevrolet",
        Modelo: 20,
        Anio: 2023,
        tipo: "Sedán",
        capacidad: 5,
        Precio_Diario: 55.75
    },

    {
        _id: ObjectId(4),
        ID_Automovil_id: ObjectId("00000001a3e7bb96f4d30e4b"),
        Marca: "Honda",
        Modelo: 28,
        Anio: 2022,
        tipo: "Hatchback",
        capacidad: 5,
        Precio_Diario: 60.0
    },

    {
        _id: ObjectId(5),
        ID_Automovil_id: ObjectId("00000001a3e7bb96f4d30e4c"),
        Marca: "Volkswagen",
        Modelo: 23,
        Anio: 2020,
        tipo: "SUV",
        capacidad: 7,
        Precio_Diario: 65.5
    }

]);
db.reserva.insertOne({
    ID_Reserva: ObjectId(1),
    ID_Cliente_id: ObjectId(1),
    ID_Automovil_id: ObjectId(1),
    Fecha_Reserva: "05-07-2020",
    Fecha_Inicio: "05-08-2020",
    Fecha_Fin: "05-08-2021",
    Estado: true,
});
db.cliente.insertOne({
    ID_Cliente: ObjectId(1),
    Nombre: "Martin",
    Apellido: "Velez",
    DNI: 1098845654,
    Direccion: "Avn 10",
    Telefono: "378178544",
    Email: "martin@gmail.com",
});
db.cliente.insertMany([
    {
        ID_Cliente: ObjectId(2),
        Nombre: "Laura",
        Apellido: "Castellanos",
        DNI: 10988457854,
        Direccion: "Avn 20",
        Telefono: "3178178544",
        Email: "laura@gmail.com"
    },
    {
        ID_Cliente: ObjectId(3),
        Nombre: "María",
        Apellido: "Gómez",
        DNI: 30457618902,
        Direccion: "Avenida 25",
        Telefono: "3189546578",
        Email: "maria@example.com"
    },
    {
        ID_Cliente: ObjectId(4),
        Nombre: "Carlos",
        Apellido: "Ramírez",
        DNI: 40851236759,
        Direccion: "Carrera 10",
        Telefono: "3107864598",
        Email: "carlos@example.com",
    },
    {
        ID_Cliente: ObjectId(5),
        Nombre: "Pablo",
        Apellido: "Velez",
        DNI: 78718728888,
        Direccion: "Avn 0",
        Telefono: "3124789852",
        Email: "pablo@gmail.com",
    }
]);

db.alquiler.insertOne({
    ID_Alquiler: ObjectId(1),
    ID_Automovil_id: ObjectId(1),
    ID_Cliente_id: ObjectId(1),
    Fecha_Inicio: "05-08-2020",
    Fecha_Fin: "05-08-2021",
    Costo_total: 500,
    Estado: true,
});
db.alquiler.insertOne({
    ID_Alquiler: ObjectId(2),
    ID_Automovil_id: ObjectId("00000001a3e7bb96f4d30e4a"),
    ID_Cliente_id: ObjectId(2),
    Fecha_Inicio: "05-08-2021",
    Fecha_Fin: "05-09-2022",
    Costo_total: 100,
    Estado: true,
});
db.empleado.insertOne({
    ID_Empleado: ObjectId(1),
    Nombre: "Angel",
    Apellido: "Fernandez",
    DNI: 187841147,
    Direccion: "Avn 6",
    Telefono: "3167852457",
    Cargo: "Jefe marketing",
});
db.registro_devolucion.insertOne({
    ID_Registro: ObjectId(1),
    ID_Alquiler_id: ObjectId(1),
    ID_Empleado_id: ObjectId(1),
    Fecha_Devolucion: "06-09-2021",
    Combustible_Devuelto: 40.5,
    Kilometraje_Devuelto: 20,
    Monto_Adicional: 10.5,
});
db.registro_entrega.insertOne({
    ID_Registro: ObjectId(1),
    ID_Alquiler_id: ObjectId(1),
    ID_Empleado_id: ObjectId(1),
    Fecha_Entrega: "06-09-2022",
    Combustible_Entregado: 4.5,
    Kilometraje_Entregado: 10,
});


//? Consultas 

//? 1. Mostrar todos los clientes registrados en la base de datos.
use("db_campus_alquiler:");
db.cliente.find()

//? 2. Obtener todos los automóviles disponibles para alquiler.
use("db_campus_alquiler:");
db.automovil.aggregate([
    {
        $lookup: {
            from: "alquiler",
            localField: "ID_Automovil_id",
            foreignField: "ID_Automovil_id",
            as: "Alquileres",
        }
    },
    {
        $project: {
            "ID_Automovil_id": 0,
            "Alquileres.ID_Alquiler": 0,
            "Alquileres.ID_Automovil_id": 0,
            "Alquileres.ID_Cliente_id": 0
        }
    },
    {
        $unwind: "$Alquileres"
    },
    {
        $match: {
            Alquileres: { $exists: true, $ne: [] }
        }
    }

]);

//? 3. Listar todos los alquileres activos junto con los datos de los clientes relacionados.
use("db_campus_alquiler:");
db.cliente.aggregate([
    {
        $lookup: {
            from: "alquiler",
            localField: "_id",
            foreignField: "ID_Cliente_id",
            as: "Alquileres",
        },
    },
    {
        $project: {
            "Alquileres._id": 0,
            "Alquileres.ID_Alquiler": 0,
            "Alquileres.ID_Automovil_id": 0,
            "Alquileres.ID_Cliente_id": 0
        }
    },
    {
        $unwind: "$Alquileres"
    },
    {
        $match: {
            "Alquileres.Estado": {
                $eq: true
            }
        }
    }
]);

//? 4. Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado.
use("db_campus_alquiler:");
db.reserva.aggregate([
    {
        $lookup: {
            from: "automovil",
            localField: "ID_Automovil_id",
            foreignField: "_id",
            as: "Automoviles"
        },
    },
    {
        $lookup: {
            from: "cliente",
            localField: "ID_Cliente_id",
            foreignField: "_id",
            as: "Clientes"
        }
    },
    {
        $unwind: "$Automoviles",
    },
    {
        $unwind: "$Clientes"

    },
    {
        $match: {
            Estado: {$eq: "Pendiente"}
        }
    },
    {
        $project: {
            "_id": 0,
            "Estado": 0,
            "ID_Reserva": 0,
            "ID_Cliente_id": 0,
            "ID_Automovil_id": 0,
            "Clientes._id": 0,
            "Clientes.ID_Cliente": 0,
            "Automoviles._id": 0,
            "Automoviles.ID_Cliente": 0,
            "Automoviles.ID_Automovil_id": 0

        }
    }
]);

//? 5. Obtener los detalles del alquiler con el ID_Alquiler específico. 
use("db_campus_alquiler:");
db.alquiler.find({ ID_Alquiler: { $eq: ObjectId("64c90bd3dd7baec87a23e154") } });

//? 6. Listar los empleados con el cargo de "Vendedor"
use("db_campus_alquiler:");
db.empleado.find({ Cargo: { $eq: "Vendedor" } })

//? 7. Cantidad total de automoviles de cada sucursal
use("db_campus_alquiler:");
db.sucursal.aggregate([
    {
        $lookup: {
            from: "sucursal_automovil",
            localField: "_id",
            foreignField: "ID_Sucursal_id",
            as: "Automoviles"
        }
    }, 
    {
        $unwind: "$Automoviles"
    },
    {
        $project: {
            "_id": 0,
            "Automoviles._id": 0,
            "Automoviles.ID_Sucursal_id": 0,
            "Automoviles.ID_Automovil": 0,
            "Automoviles.Name": 0,
        }
    }
 

])

//? 8. Obtener el costo total de un alquiler específico. 
use("db_campus_alquiler:");
db.alquiler.aggregate([
    {
        $match: {
            ID_Alquiler: {$eq: ObjectId("64c854fcda0104b3f605ce06")}
        } 
    },
    {
        $project: {
            "_id": 0,
            "ID_Alquiler": 0,
            "ID_Automovil_id": 0,
            "ID_Cliente_id": 0,
            "Fecha_Inicio": 0,
            "Fecha_Fin": 0,
            "Fecha_Fin": 0,
            "Estado": 0
        }
    }
])