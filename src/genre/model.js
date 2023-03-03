const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

// =====Author model=====
const Genre = connection.define("Genre", {
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  module.exports = Genre;