import express from 'express'
import categorias from './categoriasRoutes.js'
import produtos from './produtoRoutes.js'
import login from './loginRoutes.js'
import usuarios from './usuarioRoutes.js';

const routes = (app) => {
    app.use(
        express.json(),
        categorias, 
        produtos,
        usuarios,
        login
    )
}

export default routes;