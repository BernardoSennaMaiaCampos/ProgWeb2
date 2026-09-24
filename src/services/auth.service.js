const usuarioRepository = require("../repositories/usuario.repository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "secret";

async function login(email, password) {   
    const user = await usuarioRepository.findByEmail(email);
    if (!user) {
        throw new Error("Email ou senha inválidos");
    }
    const valid = await bcrypt.compare(password, user.senha);
    if (!valid) {
        throw new Error("Email ou senha inválidos");
    }   
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
    return { token };
}