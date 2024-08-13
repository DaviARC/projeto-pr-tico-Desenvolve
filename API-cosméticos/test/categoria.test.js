import CategoriaController from '../src/controllers/categoriaController.js';
import categorias from '../src/models/Categoria.js';

jest.mock('../models/Categoria'); // Mock do modelo `categorias`

describe('Testes do CategoriaController', () => {

    afterEach(() => {
        jest.clearAllMocks(); // Limpa todos os mocks após cada teste
    });

    test('listarCategorias - deve retornar todas as categorias', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        const mockCategorias = [{ name: 'Categoria 1' }, { name: 'Categoria 2' }];
        categorias.find.mockResolvedValue(mockCategorias);

        await CategoriaController.listarCategorias(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockCategorias);
    });

    test('listarCategoriaPorId - deve retornar uma categoria pelo id', async () => {
        const req = {
            params: { id: '1' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        const mockCategoria = { name: 'Categoria 1' };
        categorias.findById.mockResolvedValue(mockCategoria);

        await CategoriaController.listarCategoriaPorId(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockCategoria);
    });

    test('cadastrarCategoria - deve criar uma categoria e retornar a mensagem de sucesso', async () => {
        const req = {
            body: { nome: 'Categoria', descricao: 'Descrição' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        const categoria = { save: jest.fn() };
        categorias.mockImplementation(() => categoria); // Mock da implementação do modelo
        categoria.save.mockResolvedValue(req.body);     // Mock da função `save`

        await CategoriaController.cadastrarCategoria(req, res, next);

        expect(categorias).toHaveBeenCalledWith(req.body);  // Verifica se o modelo foi chamado corretamente
        expect(categoria.save).toHaveBeenCalled();          // Verifica se o `save` foi chamado
        expect(res.status).toHaveBeenCalledWith(201);       // Verifica se o status retornado foi 201
        expect(res.json).toHaveBeenCalledWith({             // Verifica a mensagem de sucesso
            ...req.body,
        });
    });

    test('atualizarCategoria - deve atualizar uma categoria existente', async () => {
        const req = {
            params: { id: '1' },
            body: { nome: 'Categoria 1 atualizada' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const next = jest.fn();

        categorias.findById.mockResolvedValue({ _id: '1', name: 'Categoria 1' });
        categorias.findByIdAndUpdate.mockResolvedValue({});

        await CategoriaController.atualizarCategoria(req, res, next);

        expect(categorias.findById).toHaveBeenCalledWith('1');
        expect(categorias.findByIdAndUpdate).toHaveBeenCalledWith('1', { $set: req.body });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ message: "Categoria atualizado com sucesso" });
    });

    test('atualizarCategoria - deve retornar 401 se a categoria não for encontrada', async () => {
        const req = {
            params: { id: '1' },
            body: { nome: 'Categoria 1 atualizada' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const next = jest.fn();

        categorias.findById.mockResolvedValue(null);

        await CategoriaController.atualizarCategoria(req, res, next);

        expect(categorias.findById).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ message: "O id do categoria não localizado" });
    });

    test('excluirCategoria - deve excluir uma categoria existente', async () => {
        const req = {
            params: { id: '1' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const next = jest.fn();

        categorias.findById.mockResolvedValue({ _id: '1', name: 'Categoria 1' });
        categorias.findByIdAndDelete.mockResolvedValue({});

        await CategoriaController.excluirCategoria(req, res, next);

        expect(categorias.findById).toHaveBeenCalledWith('1');
        expect(categorias.findByIdAndDelete).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ message: "Categoria removida com sucesso" });
    });

});
