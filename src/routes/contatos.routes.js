const express = require("express");
const controller = require("../controllers/contatos.controller");
const { authenticateToken } = require("../middlewares/authenticateToken");
const { authorizeRoles } = require("../middlewares/authorizeRoles");

const router = express.Router();

router.get("/", controller.list);
router.get("/:id", controller.getById);


router.post("/", authenticateToken, authorizeRoles(["user", "admin"]), controller.create);
router.put("/:id", authenticateToken, authorizeRoles(["user", "admin"]), controller.update);
router.delete("/:id", authenticateToken, authorizeRoles(["admin"]), controller.remove);

// GET
/**
* @swagger
* /api/v1/contatos:
* get:
* summary: Lista todos os contatos
* tags: [Contatos]
* responses:
* 200:
* description: Lista de contatos retornada com sucesso
*/
router.get('/', contatosController.getAll);


// GET POR ID
/**
* @swagger
* /api/v1/contatos/{id}:
* get:
* summary: Busca um contato por ID
* tags: [Contatos]
* parameters:
* - in: path
* name: id
* required: true
* schema:
* type: integer
* description: ID do contato
* responses:
* * 200:
* description: Contato encontrado
* 404:
* description: Contato não encontrado
*/
router.get('/:id', contatosController.getById);


// POST - CADASTRAR CONTATO
/**
* @swagger
* /api/v1/contatos:
* post:
* summary: Cadastra um novo contato
* tags: [Contatos]
* requestBody:
* required: true
* content:
* application/json:
* schema:
* type: object
* required:
* - numerotelefone
* properties:
* numerotelefone:
* type: string
* example: (11) 99999-9999
* responses:
* 201:
* description: Contato criado com sucesso
* 400:
* description: Dados inválidos
*/
router.post('/', contatosController.create);


//PUT - ATUALIZAR CONTATO
/**
* @swagger
* /api/v1/contatos/{id}:
* put:
* summary: Atualiza um contato existente
* tags: [Contatos]
* parameters:
* - in: path
* name: id
* required: true
* schema:
* type: integer
* description: ID do contato
* requestBody:
* required: true
* content:
* application/json:
* schema:
* type: object
* properties:
* numerotelefone:
* type: string
* example: (11) 99999-9999
* responses:
* 200:
* description: Contato atualizado com sucesso
* 404:
* description: Contato não encontrado
*/
router.put('/:id', contatosController.update);


// DELETE - EXCLUIR CONTATO
/**
* @swagger
* /api/v1/contatos/{id}:
* delete:
* summary: Remove um contato
* tags: [Contatos]
* parameters:
* - in: path
* name: id
* required: true
* schema:
* type: integer
* description: ID do contato
* responses:
* 200:
* description: Contato removido com sucesso
* 404:
* description: Contato não encontrado
*/
router.delete('/:id', contatosController.delete);

module.exports = router;