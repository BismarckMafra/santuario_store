import { View, TouchableOpacity, Text, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import styles from '../estilos/estilos';
import { firebaseTestService } from '../services/firebase/firebaseTestService';

/**
 * Componente de Teste Firebase
 * Testa a conexão e funcionalidade básica do Firebase
 */

export default function TestFirebase() {
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    const results = [];

    try {
      // Teste 1: Importar módulo Firebase
      try {
        if (!firebaseTestService) {
          throw new Error('Módulo firebaseTestService não encontrado');
        }
        results.push({
          teste: 'Importação do Firebase',
          status: '✅ Sucesso',
        });
      } catch (importError) {
        results.push({
          teste: 'Importação do Firebase',
          status: '❌ Falha',
          erro: importError.message,
        });
      }

      // Teste 2: Tentar inicializar Firebase
      try {
        const conexaoResult = await firebaseTestService.testarConexao();
        
        results.push({
          teste: 'Conexão com Firebase',
          status: conexaoResult.conectado ? '✅ Sucesso' : '❌ Falha',
          detalhes: conexaoResult,
        });

        // Teste 3: Verificar informações do Firebase
        const info = firebaseTestService.obterInfoFirebase();
        results.push({
          teste: 'Informações do Firebase',
          status: info ? '✅ Sucesso' : '❌ Falha',
          detalhes: info,
        });

        // Teste 4: Verificar Firestore
        const firestoreResult = await firebaseTestService.verificarFirestore();
        results.push({
          teste: 'Firestore',
          status: firestoreResult.status === 'operacional' ? '✅ Sucesso' : '❌ Falha',
          detalhes: firestoreResult,
        });
      } catch (firebaseError) {
        results.push({
          teste: 'Teste Firebase',
          status: '❌ Falha',
          erro: firebaseError.message,
        });
      }

      // Teste 5: Testar conexão com Backend (JSON Server)
      try {
        const backendResponse = await fetch('http://localhost:3001/usuarios');
        results.push({
          teste: 'Backend (JSON Server)',
          status: backendResponse.ok ? '✅ Sucesso' : '❌ Falha',
          detalhes: `Status: ${backendResponse.status}`,
        });
      } catch (backendError) {
        results.push({
          teste: 'Backend (JSON Server)',
          status: '❌ Falha',
          erro: backendError.message,
        });
      }

      setTestResults(results);
      Alert.alert('Testes Completos', `${results.length} testes executados`);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao executar testes: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}>
      <Text style={[styles.formTitle, { marginBottom: 20 }]}>🧪 Teste de Conexão</Text>

      <TouchableOpacity
        style={[styles.button, { marginBottom: 20 }]}
        onPress={runTests}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Executar Testes</Text>
        )}
      </TouchableOpacity>

      {testResults && (
        <View>
          <Text style={[styles.formTitle, { fontSize: 16, marginBottom: 12 }]}>Resultados:</Text>
          {testResults.map((result, index) => (
            <View
              key={index}
              style={[
                styles.card,
                { marginBottom: 12, borderLeftColor: result.status.includes('✅') ? '#10B981' : '#EF4444' },
              ]}
            >
              <Text style={{ fontWeight: '600', marginBottom: 4 }}>{result.teste}</Text>
              <Text style={{ color: result.status.includes('✅') ? '#10B981' : '#EF4444', fontWeight: '700' }}>
                {result.status}
              </Text>
              {result.detalhes && (
                <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 8 }}>
                  {typeof result.detalhes === 'string' ? result.detalhes : JSON.stringify(result.detalhes, null, 2)}
                </Text>
              )}
              {result.erro && (
                <Text style={{ fontSize: 12, color: '#EF4444', marginTop: 8 }}>
                  Erro: {result.erro}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
