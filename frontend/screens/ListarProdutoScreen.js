import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import ListarProdutos from '../componentes/listarProduto';
import styles from '../estilos/estilos';
import Header from '../componentes/header';
import { firebaseProdutosService } from '../../services/firebase/firebaseProdutosService.js';
import { useAuth } from '../context/AuthContext';
import { confirmAction } from '../utils/confirmAction';

export default function ListarProdutoScreen({ navigation }) {
  const { usuarioLogado, isFuncionario, isGerente } = useAuth();
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

  const canManageProducts = !!usuarioLogado && (isFuncionario() || isGerente());

  const excluirProduto = async (id) => {
    if (!canManageProducts) {
      return;
    }

    confirmAction({
      title: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este produto?',
      confirmText: 'Excluir',
      destructive: true,
      onConfirm: async () => {
        try {
          await firebaseProdutosService.deletar(id);
          setProdutos(prev => prev.filter(p => p.id !== id));
          Alert.alert('Sucesso', 'Produto excluído com sucesso.');
        } catch (error) {
          Alert.alert('Erro ao excluir', `Motivo: ${error.message || 'Falha ao excluir produto'}`);
        }
      },
    });
  };

  const editarProduto = (id) => {
    if (canManageProducts) {
      navigation.navigate('AlterarProduto', { id });
    }
  };

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
          onPress={() => navigation.replace('Home')}
        >
          <Text style={styles.buttonText}>Voltar para Home</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
