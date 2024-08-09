import CategoriaController from "../controllers/categoriaController.js";
import express from 'express'

const router = express.Router();

router
    .get("/categorias", CategoriaController.listarCategorias)
    .get("/categorias/:id", CategoriaController.listarCategoriaPorId)
    .post("/categorias", CategoriaController.cadastrarCategoria)
    .put("/categorias/:id", CategoriaController.atualizarCategoria)
    .delete("/categorias/:id", CategoriaController.excluirCategoria)

export default router;