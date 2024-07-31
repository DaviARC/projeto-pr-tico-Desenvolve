import produtos from "../models/Produto";
import { v4 as uuidv4 } from 'uuid';

class ProdutoController {
    static listarCProduto = async (req, res, next) => {
        try{
            const produtosResultado = produtos.find();
            
            res.status(200).send(produtosResultado.toJSON());
        } catch (e) {
            console.log(e)
        }
    }

    static listarProdutoPorId = async (req, res, next) => {
        try {
            const id = req.params.id;
            const produtoResultado = produtos.findById(id);

            res.status(200).send(produtoResultado.toJSON());
        } catch (error) {
            console.log(error)
        }
    }

    static cadastrarProduto = async (req, res, next) => {
        let produto = new produtos({...req.body, id: uuidv4()});

        const produtoResultado = await produto.save();
        res.status(201).send(produtoResultado.toJSON())
    }

    static atualizarProduto = async (req, res, next) => {
        try {
            const id = req.params.id;
            const produtoResultado = await produtos.findById(id);

            if(produtoResultado){
                await produtos.findByIdAndUpdate(id, {$set: req.body});
                res.status(200).send({message: "Produto atualizado com sucesso"});
            } else {
                res.status(401).send({message: "O id do produto não localizado"})
            }

        } catch (error) {
            console.log(error)
        }
    }
    static excluirProduto = async (req, res, next) => {
        try {
            const id = req.params.id;
            const produtoResultado = await produtos.findById(id);

            if(produtoResultado){
                await produtos.findByIdAndDelete(id);
                res.status(200).send({message: "Produto removida com sucesso"});
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export default ProdutoController;