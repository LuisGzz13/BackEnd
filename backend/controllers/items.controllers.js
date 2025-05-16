import sqlUtils from "../utils/sql.js";  // Import the default object

const { sqlConnect, sql } = sqlUtils;  // Destructure sqlConnect and sql

export const getItems = async () => {
  const pool = await sqlConnect();
  const data = await pool.request().query("SELECT * FROM Alumnos");
  console.log(data);
};

export const getItem = async (req, res) => {
  const pool = await sqlConnect();
  const data = await pool
      .request()
      .input("myId", sql.Int, req.params.id)
      .query("select * from items where AlumnoID=@myId");
  res.json(data.recordset);
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

export const postItem = async (req, res) => {
  const pool = await sqlConnect();
  await pool
      .request()
      .input("name", sql.VarChar, req.body.name)
      .input("price", sql.Float, req.body.price)
      .query("insert into items (name, price) values (@name, @price)");

  const data = await pool
      .request()
      .input("name", sql.VarChar, req.body.name)
      .query("select * from items where name = @name");

  console.log(data.recordset);
  res.status(200).json({ operation: true, item:data.recordset[0]});
};


export const deleteItem = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool
        .request()
        .input("id", sql.Int, req.params.id)
        .query("delete from items where id=@id");
    
    res.status(200).json({ operation: true });
};