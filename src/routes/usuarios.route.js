const express = require("express");
const controller = require("../controllers/usuarios.controller");
const auth = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");
const router = express.Router();


router.get("/", controller.list);
router.get("/:id", controller.getById);


router.post("/", auth, authorize(["user", "admin"]), controller.create);
router.put("/:id", auth, authorize(["user", "admin"]), controller.update);
router.delete("/:id", auth, authorize(["admin"]), controller.remove);


// GET
/**
* @swagger
* /api/v1/users:
* get:
* summary: Lista todos os usuários
* tags: [Usuários]
* responses:
* 200:
* description: Lista de usuários retornada com sucesso
*/
router.get('/', usuariosController.getAll);


// GET POR ID
/**
* @swagger
* /api/v1/users/{id}:
* get:
* summary: Busca um usuário por ID
* tags: [Usuários]
* parameters:
* - in: path
* name: id
* required: true
* schema:
* type: integer
* description: ID do usuário
* responses:
* * 200:
* description: Usuário encontrado
* 404:
* description: Usuário não encontrado
*/
router.get('/:id', usuariosController.getById);


// POST - CADASTRAR USUÁRIO
/**
* @swagger
* /api/v1/users:
* post:
* summary: Cadastra um novo usuário
* tags: [Usuários]
* requestBody:
* required: true
* content:
* application/json:
* schema:
* type: object
* required:
* - Nome
* - Email
* properties:
* Nome:
* type: string
* example: João Silva
* Email:
* type: string
* example: joao@email.com
* responses:
* 201:
* description: Usuário criado com sucesso
* 400:
* description: Dados inválidos
*/
router.post('/', usuariosController.create);


//PUT - ATUALIZAR USUÁRIO
/**
* @swagger
* /api/v1/users/{id}:
* put:
* summary: Atualiza um usuário existente
* tags: [Usuários]
* parameters:
* - in: path
* name: id
* required: true
* schema:
* type: integer
* description: ID do usuário
* requestBody:
* required: true
* content:
* application/json:
* schema:
* type: object
* properties:
* Nome:
* type: string
* Email:
* type: string
* responses:
* 200:
* description: Usuário atualizado com sucesso
* 404:
* description: Usuário não encontrado
*/
router.put('/:id', usuariosController.update);


// DELETE - EXCLUIR USUÁRIO
/**
* @swagger
* /api/v1/users/{id}:
* delete:
* summary: Remove um usuário
* tags: [Usuários]
* parameters:
* - in: path
* name: id
* required: true
* schema:
* type: integer
* description: ID do usuário
* responses:
* 200:
* description: Usuário removido com sucesso
* 404:
* description: Usuário não encontrado
*/
router.delete('/:id', usuariosController.delete);

module.exports = router;