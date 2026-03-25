const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const info = document.getElementById("info");

async function carregarUsuario() {

    if (!id) {
        info.textContent = "ID não informado na URL";
        return;
    }

    try {
        const resposta = await fetch(`/usuarios/${id}`);

        if (!resposta.ok) {
            throw new Error("Usuário não encontrado");
        }

        const usuario = await resposta.json();

        console.log("Resposta da API:", usuario); 

        info.textContent = `Nome: ${usuario.nome} | Idade: ${usuario.idade} | Email: ${usuario.email}`;

    } catch (erro) {
        info.textContent = erro.message;
    }
}

carregarUsuario();