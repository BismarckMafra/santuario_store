/**
 * Serviço Backend - Produtos
 * Gerencia todas as operações relacionadas a produtos
 */

const API_URL = 'http://localhost:3001';

export const produtosService = {
  /**
   * Buscar todos os produtos
   * @returns {Promise<Array>} Lista de produtos
   */
  listar: async () => {
    try {
      const response = await fetch(`${API_URL}/produtos`);
      if (!response.ok) throw new Error('Erro ao buscar produtos');
      return await response.json();
    } catch (error) {
      console.error('❌ Erro ao listar produtos:', error.message);
      throw error;
    }
  },

  /**
   * Buscar produto por ID
   * @param {number} id - ID do produto
   * @returns {Promise<Object>} Dados do produto
   */
  obterPorId: async (id) => {
    try {
      const response = await fetch(`${API_URL}/produtos/${id}`);
      if (!response.ok) throw new Error('Produto não encontrado');
      return await response.json();
    } catch (error) {
      console.error(`❌ Erro ao buscar produto ${id}:`, error.message);
      throw error;
    }
  },

  /**
   * Criar novo produto
   * @param {Object} produto - Dados do produto
   * @returns {Promise<Object>} Produto criado
   */
  criar: async (produto) => {
    try {
      const response = await fetch(`${API_URL}/produtos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...produto,
          data: new Date().toISOString().split('T')[0],
        }),
      });
      if (!response.ok) throw new Error('Erro ao criar produto');
      const data = await response.json();
      console.log('✅ Produto criado com sucesso:', data);
      return data;
    } catch (error) {
      console.error('❌ Erro ao criar produto:', error.message);
      throw error;
    }
  },

  /**
   * Atualizar produto
   * @param {number} id - ID do produto
   * @param {Object} produto - Dados atualizados
   * @returns {Promise<Object>} Produto atualizado
   */
  atualizar: async (id, produto) => {
    try {
      const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto),
      });
      if (!response.ok) throw new Error('Erro ao atualizar produto');
      const data = await response.json();
      console.log('✅ Produto atualizado com sucesso:', data);
      return data;
    } catch (error) {
      console.error(`❌ Erro ao atualizar produto ${id}:`, error.message);
      throw error;
    }
  },

  /**
   * Deletar produto
   * @param {number} id - ID do produto
   * @returns {Promise<Object>} Resposta do servidor
   */
  deletar: async (id) => {
    try {
      const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar produto');
      console.log('✅ Produto deletado com sucesso');
      return await response.json();
    } catch (error) {
      console.error(`❌ Erro ao deletar produto ${id}:`, error.message);
      throw error;
    }
  },
};

export const firebaseProdutosService = produtosService;
