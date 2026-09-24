const express = require("express");
const controller = require("../controllers/enderecos.controller");
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
* /api/v1/enderecos:
* get:
* summary: Lista todos os endereços
* tags: [Endereços]
* responses:
* 200:
* description: Lista de endereços    retornada com sucesso
*/
router.get('/', enderecosController.getAll);


// GET POR ID
/**
* @swagger
* /api/v1/enderecos/{id}:
* get:
* summary: Busca um endereço por ID
* tags: [Endereços]
* parameters:
* - in: path
* name: id
* required: true
* schema:
* type: integer
* description: ID do endereço   
* responses:
* * 200:
* description: Endereço encontrado
* 404:
* description: Endereço não encontrado
*/
router.get('/:id', enderecosController.getById);


// POST - CADASTRAR ENDEREÇO
/**
* @swagger
* /api/v1/enderecos:
* post:
* summary: Cadastra um novo endereço
* tags: [Endereços]
* requestBody:
* required: true
* content:
* application/json:
* schema:
* type: object
* required:
* - Cep
* - Rua
* - Numero
* properties:
* Cep:
* type: string
* example: 12345-678
* Rua:
* type: string
* example: Rua Exemplo
* Numero:
* type: string
* example: 123
* responses:
* 201:
* description: Endereço criado com sucesso
* 400:
* description: Dados inválidos
*/
router.post('/', enderecosController.create);


//PUT - ATUALIZAR ENDEREÇO
/**
* @swagger
* /api/v1/enderecos/{id}:
* put:
* summary: Atualiza um endereço existente
* tags: [Endereços]
* parameters:
* - in: path
* name: id
* required: true
* schema:
* type: integer
* description: ID do endereço
* requestBody:
* required: true
* content:
* application/json:
* schema:
* type: object
* properties:
* Cep:
* type: string
* Rua:
* type: string
* Numero:
* type: string
* responses:
* 200:
* description: Endereço atualizado com sucesso
* 404:
* description: Endereço não encontrado
*/
router.put('/:id', enderecosController.update);


// DELETE - EXCLUIR ENDEREÇO
/**
* @swagger
* /api/v1/enderecos/{id}:
* delete:
* summary: Remove um endereço
* tags: [Endereços]
* parameters:
* - in: path
* name: id
* required: true
* schema:
* type: integer
* description: ID do endereço
* responses:
* 200:
* description: Endereço removido com sucesso
* 404:
* description: Endereço não encontrado
*/
router.delete('/:id', enderecosController.delete);

module.exports = router;