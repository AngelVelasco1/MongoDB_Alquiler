use("db_campus_alquiler:");

db.sucursal.insertOne(
    {   
        _id: ObjectId(1),
        Nombre: "Zona Franca",
        Direccion: "CAlle 20",
        Telefono: 34578117
    }
);
db.sucursal_automovil.insertOne(
    {
        _id: ObjectId(1),
        ID_Sucursal_id: ObjectId("0000000129a187d200fedb8d"),
        ID_Automovil: ObjectId(1),
        cantidad: 5
    }
);
db.getCollection("sucursal").aggregate([
    {
        $lookup: {
            from: "sucursal_automovil",
            localField: "_id",
            foreignField: "ID_Sucursal_id",
            as: "Automoviles"
        }