import produtos from '../src/models/Produto.js';
import ProdutoController from '../src/controllers/produtoController.js';

jest.mock('../models/Produto.js');

describe('Testes do ProdutoController', () => {
        beforeEach(() => {
        jest.clearAllMocks();
    });

    test('listarProduto - deve retornar todos os produtos', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        const mockProdutos = [{ name: 'Produto 1' }, { name: 'Produto 2' }];
        produtos.find.mockResolvedValue(mockProdutos);

        await ProdutoController.listarProduto(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockProdutos);
    });

    test('listarProdutoPorId - deve retornar um produto pelo id', async () => {
        const req = {
            params: { id: '1' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        const mockProduto = { name: 'Produto 1' };
        produtos.findById.mockResolvedValue(mockProduto);

        await ProdutoController.listarProdutoPorId(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockProduto);
    });

    test('cadastrarProduto - deve criar um produto e retornar a mensagem de sucesso', async () => {
        const req = {
            body: { nome: 'Produto', preco: 10, categoria: "66ad4a1a3814bed1df010453", imagem: "a" }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        const product = { save: jest.fn() };
        produtos.mockImplementation(() => product); // Mock da implementação do modelo
        product.save.mockResolvedValue(req.body);   // Mock da função `save`

        await ProdutoController.cadastrarProduto(req, res, next);

        expect(produtos).toHaveBeenCalledWith(req.body);  // Verifica se o modelo foi chamado corretamente
        expect(product.save).toHaveBeenCalled();          // Verifica se o `save` foi chamado
        expect(res.status).toHaveBeenCalledWith(201);     // Verifica se o status retornado foi 201
        expect(res.json).toHaveBeenCalledWith({           // Verifica a mensagem de sucesso
            ...req.body,
        });
    });

    test('atualizarProduto - deve atualizar um produto existente', async () => {
        const req = {
            params: { id: '1' },
            body: { name: 'Produto 1 atualizado' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const next = jest.fn();

        produtos.findById.mockResolvedValue({ _id: '1', name: 'Produto 1' });
        produtos.findByIdAndUpdate.mockResolvedValue({});

        await ProdutoController.atualizarProduto(req, res, next);

        expect(produtos.findById).toHaveBeenCalledWith('1');
        expect(produtos.findByIdAndUpdate).toHaveBeenCalledWith('1', { $set: req.body });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ message: "Produto atualizado com sucesso" });
    });

    test('atualizarProduto - deve retornar 401 se o produto não for encontrado', async () => {
        const req = {
            params: { id: '1' },
            body: { name: 'Produto 1 atualizado' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const next = jest.fn();

        produtos.findById.mockResolvedValue(null);

        await ProdutoController.atualizarProduto(req, res, next);

        expect(produtos.findById).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ message: "O id do produto não localizado" });
    });

    test('excluirProduto - deve excluir um produto existente', async () => {
        const req = {
            params: { id: '1' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const next = jest.fn();

        produtos.findById.mockResolvedValue({ _id: '1', name: 'Produto 1' });
        produtos.findByIdAndDelete.mockResolvedValue({});

        await ProdutoController.excluirProduto(req, res, next);

        expect(produtos.findById).toHaveBeenCalledWith('1');
        expect(produtos.findByIdAndDelete).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ message: "Produto removida com sucesso" });
    });

});
