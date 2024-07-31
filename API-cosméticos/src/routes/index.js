import express from {express}
import categorias from './categoriasRoutes.js'
import produtos from './produtoRoutes.js'

const routes = (app) => {
    app.use(
        express.json(),
        categorias, 
        produtos
    )
}

export default routes;