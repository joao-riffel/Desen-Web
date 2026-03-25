const pool = require("../database/db");

async function listarUsuarios() {

    const resultado = await pool.query(
        "SELECT * FROM usuarios ORDER BY id"
    );

    return resultado.rows;

}

async function buscarUsuarioPorId(id) {

    const resultado = await pool.query(
        "SELECT * FROM usuarios WHERE id = $1",
        [id]
    );

    return resultado.rows;

}

async function buscarUsuarioPorIdade(idade) {

    const resultado = await pool.query(
        "SELECT * FROM usuarios WHERE idade >= $1", 
        [idade]
    );

    return resultado.rows;

}

async function ordenarUsuariosAlfabeto(){
    const resultado = await pool.query(
        "SELECT * FROM usuarios ORDER BY nome ASC"
    );

    return resultado.rows;
}

async function contarUsuarios() {
    const total = await pool.query (
        "SELECT COUNT (*) FROM usuarios"
    );

    return Number(total.rows[0].count);

}

async function criarUsuario(nome, idade, email) {

    if (!nome || nome.trim() === "") {
        throw new Error("Nome é obrigatório");
    }

    const resultado = await pool.query(
        `
        INSERT INTO usuarios (nome, idade, email)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [nome, idade, email]
    );

    return resultado.rows[0];

}

async function atualizarUsuario(id, nome, idade) {

    const resultado = await pool.query(
        `
        UPDATE usuarios
        SET nome = COALESCE($1, nome),
            idade = COALESCE($2, idade),
            email = COALESCE($3, email)
        WHERE id = $3
        RETURNING *
        `,
        [nome, idade, id]
    );

    return resultado.rows[0];

}

async function deletarUsuario(id) {

    const resultado = await pool.query(
        "DELETE * FROM usuarios WHERE id = $1",
        [id]
    );

    return resultado.rowCount > 0;

}

module.exports = {
    listarUsuarios,
    buscarUsuarioPorId,
    buscarUsuarioPorIdade,
    ordenarUsuariosAlfabeto,
    contarUsuarios,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};