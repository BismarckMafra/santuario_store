const API_URL = 'http://localhost:3001';

export const apiService = {
  // USUÁRIOS
  getUsuarios: async () => {
    try {
      const response = await fetch(`${API_URL}/usuarios`);
      if (!response.ok) throw new Error('Erro ao buscar usuários');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  criarUsuario: async (usuario) => {
    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
      });
      if (!response.ok) throw new Error('Erro ao criar usuário');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  atualizarUsuario: async (id, usuario) => {
    try {
      const response = await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
      });
      if (!response.ok) throw new Error('Erro ao atualizar usuário');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deletarUsuario: async (id) => {
    try {
      const response = await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar usuário');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // PRODUTOS
  getProdutos: async () => {
    try {
      const response = await fetch(`${API_URL}/produtos`);
      if (!response.ok) throw new Error('Erro ao buscar produtos');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  criarProduto: async (produto) => {
    try {
      const response = await fetch(`${API_URL}/produtos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto),
      });
      if (!response.ok) throw new Error('Erro ao criar produto');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  atualizarProduto: async (id, produto) => {
    try {
      const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto),
      });
      if (!response.ok) throw new Error('Erro ao atualizar produto');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deletarProduto: async (id) => {
    try {
      const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar produto');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
