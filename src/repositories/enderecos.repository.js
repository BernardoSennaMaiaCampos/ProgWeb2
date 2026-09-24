const { Endereco, Usuario } = require("../database/models");

function findAll() {
 return Endereco.findAll({
  include: [{ model: Usuario, as: "usuario", attributes: { exclude: ["senha"] } }]
 });
}

function findById(id) {
 return Endereco.findByPk(id, {
  include: [{ model: Usuario, as: "usuario", attributes: { exclude: ["senha"] } }]
 });
}

function create(data) {
 return Endereco.create(data);
}

async function update(id, data) {
 const [affected] = await Endereco.update(data, { where: { id } });
 return affected;
}

function remove(id) {
 return Endereco.destroy({ where: { id } });
}

module.exports = { findAll, findById, create, update, remove };