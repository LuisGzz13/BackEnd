import sqlUtils from "../utils/sql.js";  // Import the default object

const { sqlConnect, sql } = sqlUtils;  // Destructure sqlConnect and sql

export const getItems = async () => {
  const pool = await sqlConnect();
  const data = await pool.request().query("SELECT * FROM Alumnos");
  console.log(data);
};

export const postItems = async (req, res) => {
  const pool = await sqlConnect();
  const { nombre, apellido } = req.body;
  const data = await pool
    .request()
    .input("nombre", sql.VarChar, nombre)
    .input("apellido", sql.VarChar, apellido)
    .query("INSERT INTO Alumnos (nombre, apellido) VALUES (@nombre, @apellido)");
  res.json(data);
}

export const putItem = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool
        .request()
        .input("id", sql.Int, req.params.id)
        .input("name", sql.VarChar, req.body.name)
        .input("price", sql.Float, req.body.price)
        .query("update items set name=@name, price=@price where id=@id");

    res.status(200).json({ operation: true });
};

export const deleteItem = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool
        .request()
        .input("id", sql.Int, req.params.id)
        .query("delete from items where id=@id");
    
    res.status(200).json({ operation: true });
};