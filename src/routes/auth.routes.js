const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { findByEmail } = require("../repositories/usuario.repository");

const router = express.Router();
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tokenType:
 *                   type: string
 *                   example: Bearer
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 expiresIn:
 *                   type: string
 *                   example: 1h
 *       400:
 *         description: Requisição malformada, email ou password ausente
 *       401:
 *         description: Credenciais inválidas, email não encontrado ou password incorreto
 *       500:
 *         description: Erro interno do servidor, configuração JWT ausente
 *     security:
 *       - bearerAuth: []
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Informe email e password." });
  }

  const user = await findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas." });
  }

  const ok = bcrypt.compareSync(password, user.senha);
  if (!ok) {
    return res.status(401).json({ message: "Credenciais inválidas." });
  }

  const payload = {
    sub: String(user.id),
    username: user.username || user.nome || user.email,
    role: user.role,
  };

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      message: "Configuração ausente: JWT_SECRET não definido.",
    });
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });

  return res.json({
    tokenType: "Bearer",
    accessToken: token,
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
});

module.exports = router;