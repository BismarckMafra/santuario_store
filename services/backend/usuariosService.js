/**
 * Serviço Backend - Usuários
 * Gerencia todas as operações relacionadas a usuários
 */

const API_URL = 'http://localhost:3001';

export const usuariosService = {
  /**
   * Buscar todos os usuários
   * @returns {Promise<Array>} Lista de usuários
   */
  listar: async () => {
    try {
      const response = await fetch(`${API_URL}/usuarios`);
      if (!response.ok) throw new Error('Erro ao buscar usuários');
      return await response.json();
    } catch (error) {
      console.error('❌ Erro ao listar usuários:', error.message);
      throw error;
    }
  },

  /**
   * Buscar usuário por ID
   * @param {number} id - ID do usuário
   * @returns {Promise<Object>} Dados do usuário
   */
  obterPorId: async (id) => {
    try {
      const response = await fetch(`${API_URL}/usuarios/${id}`);
      if (!response.ok) throw new Error('Usuário não encontrado');
      return await response.json();
    } catch (error) {
      console.error(`❌ Erro ao buscar usuário ${id}:`, error.message);
      throw error;
    }
  },

  /**
   * Criar novo usuário
   * @param {Object} usuario - Dados do usuário
   * @returns {Promise<Object>} Usuário criado
   */
  criar: async (usuario) => {
    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...usuario,
          data: new Date().toISOString().split('T')[0],
        }),
      });
      if (!response.ok) throw new Error('Erro ao criar usuário');
      const data = await response.json();
      console.log('✅ Usuário criado com sucesso:', data);
      return data;
    } catch (error) {
      console.error('❌ Erro ao criar usuário:', error.message);
      throw error;
    }
  },

  /**
   * Atualizar usuário
   * @param {number} id - ID do usuário
   * @param {Object} usuario - Dados atualizados
   * @returns {Promise<Object>} Usuário atualizado
   */
  atualizar: async (id, usuario) => {
    try {
      const response = await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
      });
      if (!response.ok) throw new Error('Erro ao atualizar usuário');
      const data = await response.json();
      console.log('✅ Usuário atualizado com sucesso:', data);
      return data;
    } catch (error) {
      console.error(`❌ Erro ao atualizar usuário ${id}:`, error.message);
      throw error;
    }
  },

  /**
   * Deletar usuário
   * @param {number} id - ID do usuário
   * @returns {Promise<Object>} Resposta do servidor
   */
  deletar: async (id) => {
    try {
      const response = await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar usuário');
      console.log('✅ Usuário deletado com sucesso');
      return await response.json();
    } catch (error) {
      console.error(`❌ Erro ao deletar usuário ${id}:`, error.message);
      throw error;
    }
  },
};
