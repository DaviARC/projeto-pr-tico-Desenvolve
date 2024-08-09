const main = document.querySelector('main');

const listarProdutos = async () => {
    const responseProdutos = await axios({
        url: "http://localhost:3000/produtos",
        method: 'get',
    })
    const data =  responseProdutos.data;
    const categorias = await listarCategorias();
 
    return data.map((produto) => {
        let produtoReturn;
        categorias.forEach(categoria => {
            if(produto.categoria === categoria._id){
                produtoReturn = {
                    ...produto,
                    categoria: categoria.nome
                }
            }
        })
        return produtoReturn; 
    })
}
const listarCategorias = async () => {
    const responseCategorias = await axios({
        url: "http://localhost:3000/categorias",
        method: 'get',
    })

    return await responseCategorias.data;
}

const criarProduto = (produto, cinza) => {
    const contProduto1 = document.createElement('div');
    contProduto1.classList.add('cont-prod');
    cinza ? contProduto1.classList.add('cinza-prod') : ''

    const nomeProduto1 = document.createElement('p');
    nomeProduto1.classList.add('nome-prod');
    nomeProduto1.innerHTML = produto.nome

    const imgProd1 = document.createElement('img');
    imgProd1.classList.add('img-prod');
    imgProd1.setAttribute('src', produto.img);

    const precoProd1 = document.createElement('p');
    cinza ? precoProd1.classList.add('preco-prod') : precoProd1.classList.add('preco-prod'); precoProd1.classList.add('preco-cinza');
    precoProd1.innerHTML = produto.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})

    const buttonProd1 = document.createElement('button');
    buttonProd1.classList.add('button-prod');
    buttonProd1.innerHTML = 'Adicionar ao carrinho'

    contProduto1.append(imgProd1);
    contProduto1.append(nomeProduto1);
    contProduto1.append(precoProd1);
    contProduto1.append(buttonProd1);

    return contProduto1;
}

const adicionaProdutosECategorias = async (eButtons) => {
    const categorias = await listarCategorias();
    const produtos = await listarProdutos();

    categorias.forEach((categoria, i) => {
        let cinza = i % 2 !== 0

        console.log(categoria)
        const produtosPorCategoria = produtos.filter(produto => produto.categoria === categoria.nome);
        
        const contTipo = document.createElement('div');
        contTipo.classList.add('cont-tipo');
        const tipoProd = document.createElement('div');
        tipoProd.classList.add('tipo-prod')
        cinza ? tipoProd.classList.add('right') : ''
        tipoProd.innerHTML = categoria.nome;
        contTipo.append(tipoProd);

        const contSection = document.createElement('div');
        contSection.classList.add('cont-section');

        const flexDesktop = document.createElement('div');
        flexDesktop.classList.add('flex-desktop');
        cinza ? flexDesktop.classList.add('right-desktop') : '';

        const contProdMaior = document.createElement('section');
        contProdMaior.classList.add('cont-prod-maior');
        cinza ? contProdMaior.classList.add('right-cont') : ''

        const contImagem = document.createElement('cont-img');
        contImagem.classList.add('cont-img');

        const quadrado = document.createElement('div');
        quadrado.classList.add('quadrado');
        cinza ? quadrado.classList.add('cinza-prod') : ''

        const imgProdMaior = document.createElement('img');
        imgProdMaior.classList.add('img-prod-maior')
        imgProdMaior.setAttribute('src', produtosPorCategoria[0].img);

        contImagem.append(quadrado);
        contImagem.append(imgProdMaior);
        contProdMaior.append(contImagem);

        const contTexto = document.createElement('div');
        contTexto.classList.add('cont-texto')

        const nomeProdMaior = document.createElement('p');
        nomeProdMaior.classList.add('nome-prod');
        nomeProdMaior.classList.add('nome-prod-maior');
        nomeProdMaior.innerHTML = produtosPorCategoria[0].nome;

        const divAux = document.createElement('div');
        
        const precoProdMaior = document.createElement('p');
        precoProdMaior.classList.add('preco-prod')
        precoProdMaior.classList.add('preco-prod-maior')
        precoProdMaior.innerHTML = produtosPorCategoria[0].preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        
        divAux.append(precoProdMaior)
        
        const buttonProdMaior = document.createElement('button');
        buttonProdMaior.classList.add('button-prod');
        buttonProdMaior.classList.add('button-prod-maior');
        cinza ? buttonProdMaior.classList.add('button-cinza') : '';
        buttonProdMaior.innerHTML = 'Adicionar ao carrinho'

        contTexto.append(nomeProdMaior);
        contTexto.append(divAux);
        contTexto.append(buttonProdMaior);

        contProdMaior.append(contTexto);
        flexDesktop.append(contProdMaior)

        const sectionProdutos = document.createElement('section');
        sectionProdutos.classList.add('cont-produtos')

        const contProduto1 = criarProduto(produtosPorCategoria[1], cinza);
        const contProduto2 = criarProduto(produtosPorCategoria[2], cinza);

        sectionProdutos.append(contProduto1);
        sectionProdutos.append(contProduto2);

        flexDesktop.append(sectionProdutos);

        const sectionCarrosel = document.createElement('section');
        sectionCarrosel.classList.add('carrosel');
        const swiperElement = document.createElement('div');
        swiperElement.classList.add('swiper');
        const swiperWrapper = document.createElement('div');
        swiperWrapper.classList.add('swiper-wrapper');

        produtosPorCategoria.forEach((produto, i) => {
            if(i !== 0 && i !== 1 && i !== 2){
                const swiperSlide = document.createElement('div');
                swiperSlide.classList.add('swiper-slide');

                swiperSlide.append(criarProduto(produto, cinza));
                swiperWrapper.append(swiperSlide);
            }
        })

        swiperElement.append(swiperWrapper)
        sectionCarrosel.append(swiperElement);

        contSection.append(flexDesktop);
        contSection.append(sectionCarrosel);
        if(cinza){
            let divCinza = document.createElement('div');
            divCinza.classList.add('cinza');

            divCinza.append(contTipo)
            divCinza.append(contSection);
            main.append(divCinza)
        } else {
            main.append(contTipo)
            main.append(contSection);
        }
    })

    const swiper = new Swiper('.swiper', {
        slidesPerView: 4,
        spaceBetween: 100,
    });

    eButtons();
}

