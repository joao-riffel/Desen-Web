const titulo = document.getElementById("titulo");
const btnTrocarTexto = document.getElementById("btnTrocarTexto");

btnTrocarTexto.addEventListener("click", function{} {
    titulo.textContent = "O título foi alterado via DOM";
} );