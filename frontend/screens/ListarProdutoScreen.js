import { View, TouchableOpacity, Text } from 'react-native';
import { useEffect, useState } from 'react';
import ListarProdutos from '../componentes/listarProduto';
import styles from '../estilos/estilos';
import Header from '../componentes/header';
import { firebaseProdutosService } from '../../services/firebase/firebaseProdutosService.js';
import { useAuth } from '../context/AuthContext';

export default function ListarProdutoScreen({ navigation }) {
  const { usuarioLogado } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProdutos = async () => {
    try {
      const data = await firebaseProdutosService.listar();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
    const unsubscribe = navigation.addListener('focus', fetchProdutos);
    return unsubscribe;
  }, [navigation]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProdutos();
  };

  const excluirProduto = async (id) => {
    try {
      await firebaseProdutosService.deletar(id);
      setProdutos(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  };

  const editarProduto = (id) => {
    navigation.navigate('AlterarProduto', { id });
  };

  const canManageProducts = !!usuarioLogado;

  return (
    <View style={styles.screenWrapper}>
      <Header
        title="Produtos"
        subtitle={canManageProducts ? `Total: ${produtos.length} registros` : 'Visualização pública de produtos'}
      />

      <ListarProdutos
        db={produtos}
        onDelete={canManageProducts ? excluirProduto : undefined}
        onEdit={canManageProducts ? editarProduto : undefined}
        loading={loading}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />

      {!canManageProducts ? (
        <TouchableOpacity
          style={[styles.button, { marginHorizontal: 16, marginBottom: 16 }]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Entrar para gerenciar produtos</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.button, { marginHorizontal: 16, marginBottom: 16 }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>← Voltar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
