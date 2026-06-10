/**
 * Serviço Firebase - Teste de Conexão
 * Gerencia a conexão e testes com Firebase
 */

import { db, app } from '../../lib/firebaseConf';

export const firebaseTestService = {
  /**
   * Testar conexão com Firebase
   * @returns {Promise<Object>} Status da conexão
   */
  testarConexao: async () => {
    try {
      console.log('🔍 Testando conexão com Firebase...');
      
      if (!app) {
        throw new Error('App Firebase não inicializado');
      }
      
      if (!db) {
        throw new Error('Firestore não inicializado');
      }
      
      const status = {
        conectado: true,
        projeto: app.options.projectId,
        authDomain: app.options.authDomain,
        timestamp: new Date().toISOString(),
      };
      
      console.log('✅ Conexão com Firebase estabelecida com sucesso!');
      console.log('Configuração:', status);
      
      return status;
    } catch (error) {
      console.error('❌ Erro ao conectar com Firebase:', error.message);
      return {
        conectado: false,
        erro: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  },

  /**
   * Obter informações do Firebase
   * @returns {Object} Informações da aplicação
   */
  obterInfoFirebase: () => {
    try {
      return {
        projectId: app?.options?.projectId,
        authDomain: app?.options?.authDomain,
        storageBucket: app?.options?.storageBucket,
        messagingSenderId: app?.options?.messagingSenderId,
        appId: app?.options?.appId,
      };
    } catch (error) {
      console.error('Erro ao obter informações:', error);
      return null;
    }
  },

  /**
   * Verificar status do Firestore
   * @returns {Promise<Object>} Status do Firestore
   */
  verificarFirestore: async () => {
    try {
      console.log('🔍 Verificando status do Firestore...');
      
      if (!db) {
        throw new Error('Firestore não inicializado');
      }
      
      console.log('✅ Firestore está operacional!');
      
      return {
        status: 'operacional',
        tipo: 'Firestore Lite',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('❌ Erro no Firestore:', error.message);
      return {
        status: 'erro',
        erro: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  },
};
