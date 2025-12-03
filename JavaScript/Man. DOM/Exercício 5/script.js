const btnAdicionar = document.getElementById("btnAdicionar");
const listaNomes = document.getElementById("listaNomes");
const input = document.getElementById("nomeInput");
const btnRemover = document.getElementById("btnRemover");


btnAdicionar.addEventListener("click", function (){
    const nomes = input.value;
    const ul = document.createElement("ul");
    ul.textContent = nomes;

    listaNomes.appendChild(ul);
});

btnRemover.addEventListener("click", function () {

    listaNomes.innerHTML = "";

});