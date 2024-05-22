const carrinhoCont = document.querySelector('.cont-itens-carrinho');
let totalPreco = document.querySelector('.total-preco')
carrinhoCont.innerHTML = ""

quantidadeCarrinho.innerHTML = ""

produtos.forEach(produto => {
    criaProdutoCarrinho(produto)
})

function criaProdutoCarrinho(produto){
    carrinhoCont.innerHTML += `<div class="cont-item-carinho">
    <img class="img-prod-carrinho" src="${produto.src}">
    <div class="cont-texto-carrinho">
        <div class="titulo-item-carrinho">${produto.nome}</div>
        <div class="preco-carrinho">${produto.preco}</div>
        <input class="input-carrinho" type="number" value="${produto.quantidade}">
    </div>
    <img class="lixo-carrinho" src="assets/lixo.png">
</div>`
}

adicionaValorTotal()
adicionaEventoLixo();
adicionaEventoInput();

function adicionaEventoLixo(){
    const botaoApagar = document.querySelectorAll('.lixo-carrinho');
    botaoApagar.forEach((botao, i) => {
        botao.addEventListener('click', () => {
            const aux = confirm('Deseja retirar o produto do carrinho?');
            if(aux){
                produtos.splice(i, 1);
            }
            atualizaTela()
            localStorage.setItem('produtos', JSON.stringify(produtos));
        })
    })
    
}
function adicionaEventoInput(){
    const inputQuantidadeProduto = document.querySelectorAll('.input-carrinho')
    inputQuantidadeProduto.forEach((input, i) => {
        input.addEventListener('input', event => {
            let value = event.target.value;
            produtos[i].quantidade = value
            console.log(value, value === "0")
            if(value === "0"){
                produtos.splice(i, 1);
            }
            localStorage.setItem('produtos', JSON.stringify(produtos));
            atualizaTela()
        })
    })
}

function atualizaTela(){
        carrinhoCont.innerHTML = ""
        produtos.forEach(produto => {
            criaProdutoCarrinho(produto)
        })
        adicionaEventoLixo();
        adicionaEventoInput();
        adicionaValorTotal()
}


function adicionaValorTotal(){
    let valorTotal = 0
    produtos.forEach(produto => {
        let valor = produto.preco.substring(1);
        let valorSemSimbolo = valor.replace(",", ".")
        let valorNumerico = parseFloat(valorSemSimbolo)
        valorTotal += valorNumerico * produto.quantidade
    })
    console.log(valorTotal)
    totalPreco.innerHTML = `$${valorTotal}`;
}