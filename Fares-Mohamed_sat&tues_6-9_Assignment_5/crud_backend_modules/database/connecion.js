import mysql2 from 'mysql2'

const query = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "CRUD",
    port: "8889"
})

export default query