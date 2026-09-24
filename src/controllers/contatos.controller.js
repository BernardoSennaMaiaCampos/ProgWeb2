const repo = require("../repositories/contatos.repository");

async function list(req, res, next) {
 try {
  const data = await repo.findAll();
  res.json(data);
 } catch (err) {
  next(err);
 }
}

async function getById(req, res, next) {
 try {
  const { id } = req.params;
  const data = await repo.findById(id);
  if (!data) {
   return res.status(404).json({ message: "Contato nao encontrado" });
  }
  res.json(data);
 } catch (err) {
  next(err);
 }
}

async function create(req, res, next) {
 try {
  const created = await repo.create(req.body);
  const data = await repo.findById(created.id);
  res.status(201).json(data);
 } catch (err) {
  next(err);
 }
}

async function update(req, res, next) {
 try {
  const { id } = req.params;
  const affected = await repo.update(id, req.body);
  if (!affected) {
   return res.status(404).json({ message: "Contato nao encontrado" });
  }
  const data = await repo.findById(id);
  res.json(data);
 } catch (err) {
  next(err);
 }
}

async function remove(req, res, next) {
 try {
  const { id } = req.params;
  const affected = await repo.remove(id);
  if (!affected) {
   return res.status(404).json({ message: "Contato nao encontrado" });
  }
  res.status(204).send();
 } catch (err) {
  next(err);
 }
}

module.exports = { list, getById, create, update, remove };