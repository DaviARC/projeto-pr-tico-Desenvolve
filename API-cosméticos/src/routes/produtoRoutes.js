import ProdutoController from "../controllers/produtoController.js";
import express from 'express'

const router = express.Router();

router
    .get("/produtos", ProdutoController.listarProduto)
    .get("/produtos/:id", ProdutoController.listarProdutoPorId)
    .post("/produtos", ProdutoController.cadastrarProduto)
    .put("/produtos/:id", ProdutoController.atualizarProduto)
    .delete("/produtos/:id", ProdutoController.excluirProduto)

export default router;