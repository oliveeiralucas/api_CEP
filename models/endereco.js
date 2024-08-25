'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Endereco extends Model {

    static associate(models) {
      // define association here
    }
  }
  Endereco.init({
    cep: DataTypes.STRING,
    logradouro: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    complemento: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    municipioIBGE: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Endereco',
  });
  return Endereco;
};