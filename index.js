let lista = document.querySelector(".cont-nav");
let nav = document.querySelector(".nav");
let sombra = document.querySelector(".sombra");
let menuFechado = document.querySelector(".menu-fechado");
let menuHeader = document.querySelector(".menu-header");

let itemNav = document.querySelector(".item-nav-prod");
let hover = document.querySelector(".item-desktop-hover");
let quantidadeCarrinho = document.querySelector('.quantidade-carrinho');

let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

adicionaProdutosECategorias(adicionaEventorColocarCarrinho);
atualizQuantidadeCarrinho()

function atualizQuantidadeCarrinho(){
    let quantidadeTotal = 0
    produtos.forEach(produtoArray => {
        quantidadeTotal += parseInt(produtoArray.quantidade)
    })
    quantidadeCarrinho.textContent = quantidadeTotal;
}

function adicionaEventorColocarCarrinho(){
    let buttonColocaCarrinho = document.querySelectorAll('.button-prod')
    buttonColocaCarrinho.forEach(button => {
        button.addEventListener('click', ()=>{
            let imagem;
            if(button.classList.contains('button-prod-maior')){
                imagem = button.parentNode.parentNode.querySelector('.img-prod-maior')
            } else {
                imagem = button.parentNode.querySelector('.img-prod')
            }
            console.log(imagem.getAttribute('src'))
            const produto = {
                nome: button.parentNode.querySelector('.nome-prod').textContent,
                preco: button.parentNode.querySelector('.preco-prod').textContent, 
                src: `${imagem.getAttribute('src')}`,
                quantidade: 1
            }
            verificaProduto(produto)
        })
    })
}


function verificaProduto(produto){
    let aux = false;
    produtos.forEach(produtoArray => {
        if(produtoArray.nome === produto.nome)
        {
            produtoArray.quantidade ++;
            aux = true;
        }
    })
    if(!aux){
        produtos.push(produto)
    } 

    atualizQuantidadeCarrinho()

    localStorage.setItem('produtos', JSON.stringify(produtos));
}

function verificaOpen(){
    if(lista.classList.contains('open')){
        lista.classList.remove('open');
        sombra.classList.remove('open');
        menuFechado.style.display="none";
        menuHeader.style.display="block";
        nav.style.display = "none";
    }
    else
    {
        lista.classList.add('open');
        sombra.classList.add('open');
        menuHeader.style.display="none";
        menuFechado.style.display="block";
        nav.style.display = "block";
    }
}
menuHeader.addEventListener('click', verificaOpen);
menuFechado.addEventListener('click', verificaOpen);
itemNav.addEventListener("mouseover", () => {
    hover.style.display = "block"
})
itemNav.addEventListener("mouseout", () => {
    hover.style.display = "none"
})

const swiper = new Swiper('.swiper', {
    slidesPerView: 4,
    spaceBetween: 100,
});
