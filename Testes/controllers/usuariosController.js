const usuariosService = require("../services/usuariosService");

async function listarUsuarios(req, res) {

    const usuarios = await usuariosService.listarUsuarios();

    res.json(usuarios);

}

async function buscarUsuario(req, res) {
    
    try {
        const id = Number(req.params.id);

        const usuarios = await usuariosService.buscarUsuarioPorId(id);

        if (usuarios.length === 0) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            });
        }

        res.json(usuarios[0]);

    } catch (erro) {
        console.error("ERRO REAL:", erro);
        res.status(500).json({
            erro: "Erro interno do servidor"
        });
    }
}

async function buscarUsuarioPorIdade(req, res) {
    const idade = Number(req.params.idade);

    if (isNaN(idade) || idade < 0) {
        return res.status(400).json({
            erro: "Idade inválida"
        });
    }

    const usuarios = await usuariosService.buscarUsuarioPorIdade(idade);

    if (usuarios.length === 0) {
        return res.status(404).json({
            erro: "Nenhum usuário encontrado"
        });
    }

    res.json(usuarios);
}

  async function ordenarUsuariosAlfabeto(req,res) {
    try {

        const usuarios = await usuariosService.ordenarUsuariosAlfabeto();

        res.status(200).json([
            usuarios
        ]);

    }catch (erro){
        res.status(500).json({
            erro:"Não foi possível ordenar os usuários alfabeticamente"
        });
    }
  }


async function contarUsuarios(req, res) {

    try {

        const total = await usuariosService.contarUsuarios(req.app.get("db"));

        res.status(200).json({
            total
        });

    }catch (erro) {
        res.status(500).json ({
            erro: "Não foi possívl contar os usuários"
        });
    }
}

async function criarUsuario(req, res) {

    try {

        const { nome, idade, email } = req.body;

        const usuario = await usuariosService.criarUsuario(nome, idade, email);

        res.status(201).json({
            mensagem: "Usuário criado com sucesso",
            usuario
        });

    } catch (erro) {

        res.status(400).json({
            erro: erro.message
        });

    }

}

async function atualizarUsuario(req, res) {

    const id = Number(req.params.id);
    const { nome, idade, email } = req.body;

    const usuario = await usuariosService.atualizarUsuario(id, nome, idade, email);

    if (!usuario) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    res.json(usuario);

}

async function deletarUsuario(req, res) {

    const id = Number(req.params.id);

    const removido = await usuariosService.deletarUsuario(id);

    if (!removido) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    res.status(204).send();

}


module.exports = {
    listarUsuarios,
    buscarUsuario,
    buscarUsuarioPorIdade,
    ordenarUsuariosAlfabeto,
    contarUsuarios,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};
