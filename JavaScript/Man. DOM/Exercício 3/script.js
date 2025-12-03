const btnMais = document.getElementById("btnMais");
const btnMenos = document.getElementById("btnMenos");
const valor = document.getElementById("valor");


let contador = 0;

btnMais.addEventListener("click", function () {

    contador++;
    valor.textContent = contador;

});


btnMenos.addEventListener("click", function () {

    contador--;
    valor.textContent = contador;

});