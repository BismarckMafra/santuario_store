/**
 * Serviço Firebase - Usuários
 * Gerencia todas as operações de usuários no Firestore
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
  where,
  orderBy,
} from 'firebase/firestore/lite';

export const firebaseUsuariosService = {
  /**
   * Listar todos os usuários
   * @returns {Promise<Array>} Lista de usuários
   */
  listar: async () => {
    try {
      console.log('📋 Buscando usuários do Firestore...');
      const usuariosRef = collection(db, 'usuarios');
      const q = query(usuariosRef, orderBy('dataCriacao', 'desc'));
      const snapshot = await getDocs(q);
      
      const usuarios = [];
      snapshot.forEach((doc) => {
        usuarios.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      
      console.log(`✅ ${usuarios.length} usuários encontrados`);
      return usuarios;
    } catch (error) {
      console.error('❌ Erro ao listar usuários:', error.message);
      throw error;
    }
  },

  /**
   * Buscar usuário por ID
   * @param {string} id - ID do usuário
   * @returns {Promise<Object>} Dados do usuário
   */
  obterPorId: async (id) => {
    try {
      console.log(`📍 Buscando usuário ${id}...`);
      const usuarioRef = doc(db, 'usuarios', id);
      const snapshot = await getDoc(usuarioRef);
      
      if (!snapshot.exists()) {
        throw new Error('Usuário não encontrado');
      }
      
      const usuario = {
        id: snapshot.id,
        ...snapshot.data(),
      };
      
      console.log('✅ Usuário encontrado:', usuario);
      return usuario;
    } catch (error) {
      console.error(`❌ Erro ao buscar usuário ${id}:`, error.message);
      throw error;
    }
  },

  /**
   * Criar novo usuário
   * @param {Object} usuario - Dados do usuário (nome, email, telefone)
   * @returns {Promise<Object>} Usuário criado com ID
   */
  criar: async (usuario) => {
    try {
      console.log('📝 Criando novo usuário no Firestore...');
      
      // Validações básicas
      if (!usuario.nome || !usuario.email) {
        throw new Error('Nome e email são obrigatórios');
      }

      const novoUsuario = {
        nome: usuario.nome.trim(),
        email: usuario.email.trim().toLowerCase(),
        telefone: usuario.telefone || '',
        senha: usuario.senha || '',
        cargo: usuario.cargo || '',
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString(),
      };

      const usuariosRef = collection(db, 'usuarios');
      const docRef = await addDoc(usuariosRef, novoUsuario);

      const usuarioCriado = {
        id: docRef.id,
        ...novoUsuario,
      };

      console.log('✅ Usuário criado com sucesso:', usuarioCriado);
      return usuarioCriado;
    } catch (error) {
      console.error('❌ Erro ao criar usuário:', error.message);
      throw error;
    }
  },

  login: async (email, senha) => {
    try {
      console.log('🔐 Autenticando usuário...');
      const normalizedEmail = email.trim().toLowerCase();
      const usuario = await firebaseUsuariosService.buscarPorEmail(normalizedEmail);
      if (!usuario || !usuario.senha) {
        throw new Error('Credenciais inválidas');
      }
      if (usuario.senha !== senha) {
        throw new Error('Credenciais inválidas');
      }
      console.log('✅ Login bem-sucedido:', usuario);
      return usuario;
    } catch (error) {
      console.error('❌ Erro ao autenticar usuário:', error.message);
      throw error;
    }
  },

  /**
   * Atualizar usuário
   * @param {string} id - ID do usuário
   * @param {Object} usuario - Dados atualizados
   * @returns {Promise<Object>} Usuário atualizado
   */
  atualizar: async (id, usuario) => {
    try {
      console.log(`✏️ Atualizando usuário ${id}...`);
      
      const usuarioRef = doc(db, 'usuarios', id);
      
      const dadosAtualizacao = {
        ...usuario,
        dataAtualizacao: new Date().toISOString(),
      };

      await updateDoc(usuarioRef, dadosAtualizacao);

      const usuarioAtualizado = await firebaseUsuariosService.obterPorId(id);
      console.log('✅ Usuário atualizado com sucesso:', usuarioAtualizado);
      return usuarioAtualizado;
    } catch (error) {
      console.error(`❌ Erro ao atualizar usuário ${id}:`, error.message);
      throw error;
    }
  },

  /**
   * Deletar usuário
   * @param {string} id - ID do usuário
   * @returns {Promise<void>}
   */
  deletar: async (id) => {
    try {
      console.log(`🗑️ Deletando usuário ${id}...`);
      
      const usuarioRef = doc(db, 'usuarios', id);
      await deleteDoc(usuarioRef);

      console.log('✅ Usuário deletado com sucesso');
    } catch (error) {
      console.error(`❌ Erro ao deletar usuário ${id}:`, error.message);
      throw error;
    }
  },

  /**
   * Buscar usuário por email
   * @param {string} email - Email do usuário
   * @returns {Promise<Object|null>} Usuário encontrado ou null
   */
  buscarPorEmail: async (email) => {
    try {
      console.log(`🔍 Buscando usuário com email ${email}...`);
      
      const usuariosRef = collection(db, 'usuarios');
      const q = query(usuariosRef, where('email', '==', email.trim().toLowerCase()));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        console.log('ℹ️ Nenhum usuário encontrado com esse email');
        return null;
      }

      const usuario = {
        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data(),
      };

      console.log('✅ Usuário encontrado:', usuario);
      return usuario;
    } catch (error) {
      console.error('❌ Erro ao buscar usuário por email:', error.message);
      throw error;
    }
  },
};
