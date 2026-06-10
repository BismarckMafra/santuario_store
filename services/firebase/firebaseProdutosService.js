/**
 * Serviço Firebase - Produtos
 * Gerencia todas as operações de produtos no Firestore
 */

import { db } from '../../lib/firebaseConf';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore/lite';

export const firebaseProdutosService = {
  /**
   * Listar todos os produtos
   * @returns {Promise<Array>} Lista de produtos
   */
  listar: async () => {
    try {
      console.log('📋 Buscando produtos do Firestore...');
      const produtosRef = collection(db, 'produtos');
      const q = query(produtosRef, orderBy('dataCriacao', 'desc'));
      const snapshot = await getDocs(q);

      const produtos = [];
      snapshot.forEach((docItem) => {
        produtos.push({
          id: docItem.id,
          ...docItem.data(),
        });
      });

      console.log(`✅ ${produtos.length} produtos encontrados`);
      return produtos;
    } catch (error) {
      console.error('❌ Erro ao listar produtos:', error.message);
      throw error;
    }
  },

  /**
   * Buscar produto por ID
   * @param {string} id - ID do produto
   * @returns {Promise<Object>} Dados do produto
   */
  obterPorId: async (id) => {
    try {
      console.log(`📍 Buscando produto ${id}...`);
      const produtoRef = doc(db, 'produtos', id);
      const snapshot = await getDoc(produtoRef);

      if (!snapshot.exists()) {
        throw new Error('Produto não encontrado');
      }

      const produto = {
        id: snapshot.id,
        ...snapshot.data(),
      };

      console.log('✅ Produto encontrado:', produto);
      return produto;
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
      console.log('📝 Criando novo produto no Firestore...');

      if (!produto.nome || !produto.preco) {
        throw new Error('Nome e preço são obrigatórios');
      }

      const novoProduto = {
        nome: produto.nome.trim(),
        categoria: produto.categoria ? produto.categoria.trim() : '',
        preco: Number(produto.preco) || 0,
        descricao: produto.descricao ? produto.descricao.trim() : '',
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString(),
      };

      const produtosRef = collection(db, 'produtos');
      const docRef = await addDoc(produtosRef, novoProduto);

      const produtoCriado = {
        id: docRef.id,
        ...novoProduto,
      };

      console.log('✅ Produto criado com sucesso:', produtoCriado);
      return produtoCriado;
    } catch (error) {
      console.error('❌ Erro ao criar produto:', error.message);
      throw error;
    }
  },

  /**
   * Atualizar produto
   * @param {string} id - ID do produto
   * @param {Object} produto - Dados atualizados
   * @returns {Promise<Object>} Produto atualizado
   */
  atualizar: async (id, produto) => {
    try {
      console.log(`✏️ Atualizando produto ${id}...`);

      const produtoRef = doc(db, 'produtos', id);
      const dadosAtualizacao = {
        ...produto,
        preco: produto.preco !== undefined ? Number(produto.preco) : produto.preco,
        dataAtualizacao: new Date().toISOString(),
      };

      await updateDoc(produtoRef, dadosAtualizacao);

      const produtoAtualizado = await firebaseProdutosService.obterPorId(id);
      console.log('✅ Produto atualizado com sucesso:', produtoAtualizado);
      return produtoAtualizado;
    } catch (error) {
      console.error(`❌ Erro ao atualizar produto ${id}:`, error.message);
      throw error;
    }
  },

  /**
   * Deletar produto
   * @param {string} id - ID do produto
   * @returns {Promise<void>}
   */
  deletar: async (id) => {
    try {
      console.log(`🗑️ Deletando produto ${id}...`);
      const produtoRef = doc(db, 'produtos', id);
      await deleteDoc(produtoRef);
      console.log('✅ Produto deletado com sucesso');
    } catch (error) {
      console.error(`❌ Erro ao deletar produto ${id}:`, error.message);
      throw error;
    }
  },
};
