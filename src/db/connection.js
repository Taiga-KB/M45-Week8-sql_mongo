const {Sequelize} = require("sequelize");
console.log(process.env.MYSQL_URI);
const connection = new Sequelize(process.env.MYSQL_URI);

connection.authenticate();

console.log("DB is working");

module.exports = connection;