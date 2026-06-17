import { View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import styles, { colors } from '../estilos/estilos.js';
import Header from '../componentes/header';
import ListarProdutos from '../componentes/listarProduto';
import { firebaseProdutosService } from '../../services/firebase/firebaseProdutosService.js';
import { useAuth } from '../context/AuthContext';


export default function HomeScreen({ navigation }) {
  const { usuarioLogado, isFuncionario, isGerente, logout } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const [produtosLoading, setProdutosLoading] = useState(true);

  useEffect(() => {
    // Se não está logado, redirecionar para login
    if (!usuarioLogado) {
      navigation.replace('Login');
      return;
    }

    const fetchProdutos = async () => {
      setProdutosLoading(true);
      try {
        const data = await firebaseProdutosService.listar();
        setProdutos(data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setProdutosLoading(false);
      }
    };

    fetchProdutos();
  }, [usuarioLogado, navigation]);

  const handleLogout = () => {
    Alert.alert(
      'Confirmar Logout',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'Sair',
          onPress: async () => {
            await logout();
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  const usuarioOptions = [
    { title: 'Cadastrar', screen: 'CadastroFuncionario', icon: '➕' },
    { title: 'Listar', screen: 'Listar', icon: '📋' },
    { title: 'Alterar', screen: 'Alterar', icon: '✏️' },
    { title: 'Excluir', screen: 'Excluir', icon: '🗑️' },
  ];

  const produtoOptionsGerente = [
    { title: 'Cadastrar', screen: 'CadastroProduto', icon: '➕' },
    { title: 'Listar', screen: 'ListarProduto', icon: '📋' },
    { title: 'Alterar', screen: 'AlterarProduto', icon: '✏️' },
    { title: 'Excluir', screen: 'ExcluirProduto', icon: '🗑️' },
  ];

  const produtoOptionsFuncionario = [
    { title: 'Cadastrar', screen: 'CadastroProduto', icon: '➕' },
    { title: 'Listar', screen: 'ListarProduto', icon: '📋' },
    { title: 'Alterar', screen: 'AlterarProduto', icon: '✏️' },
    { title: 'Excluir', screen: 'ExcluirProduto', icon: '🗑️' },
  ];

  const handleProdutoDelete = async (id) => {
    Alert.alert(
      '⚠️ Confirmar Exclusão',
      'Tem certeza que deseja excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await firebaseProdutosService.deletar(id);
              setProdutos((prev) => prev.filter((produto) => produto.id !== id));
              Alert.alert('✅ Sucesso', 'Produto excluído com sucesso.');
            } catch (error) {
              Alert.alert('❌ Erro ao Excluir', `Motivo: ${error.message || 'Falha ao excluir produto'}`);
            }
          },
        },
      ]
    );
  };

  const handleProdutoEdit = (id) => {
    navigation.navigate('AlterarProduto', { id });
  };

  const renderMenuGrid = (options) => (
    <View style={styles.navGrid}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.navCard, { backgroundColor: colors.white }]}
          onPress={() => navigation.navigate(option.screen)}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 32, marginBottom: 8 }}>{option.icon}</Text>
          <Text style={styles.navCardText}>{option.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  if (!usuarioLogado) {
    return null;
  }

  return (
    <View style={styles.screenWrapper}>
      <Header title="Gestão de Dados" subtitle={`Bem-vindo, ${usuarioLogado.nome}!`} />
      
      <ScrollView
        style={[styles.container, { paddingHorizontal: 16 }]}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Seção de Usuários */}
        {isGerente() && (
          <View style={[styles.formContainer, { marginTop: 8 }]}>
            <Text style={styles.formTitle}>👥 Gerenciar Usuários</Text>
            {renderMenuGrid(usuarioOptions)}
          </View>
        )}

        {/* Seção de Produtos */}
        {(isFuncionario() || isGerente()) && (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>🛍️ Gerenciar Produtos</Text>
            {renderMenuGrid(isGerente() ? produtoOptionsGerente : produtoOptionsFuncionario)}
          </View>
        )}

        {/* Lista de produtos na Home */}
        <View style={[styles.formContainer, { marginTop: 8 }]}> 
          <Text style={styles.formTitle}>📦 Produtos</Text>
          <ListarProdutos
            db={produtos}
            loading={produtosLoading}
            onDelete={handleProdutoDelete}
            onEdit={handleProdutoEdit}
          />
        </View>

        {/* Seção de Teste */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>🧪 Teste de Conexão</Text>
          <TouchableOpacity
            style={[styles.button, { marginBottom: 20 }]}
            onPress={() => navigation.navigate('TestFirebase')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Testar Firebase e Backend</Text>
          </TouchableOpacity>
        </View>

        {/* Informações do Usuário */}
        <View style={[styles.formContainer, { backgroundColor: '#f0f0f0', marginBottom: 80 }]}>
          <Text style={styles.formTitle}>ℹ️ Informações do Usuário</Text>
          <View style={{ marginTop: 12 }}>
            <Text style={styles.cardLabel}>Nome:</Text>
            <Text style={{ fontSize: 14, marginBottom: 12, color: '#333' }}>{usuarioLogado.nome}</Text>
            <Text style={styles.cardLabel}>Email:</Text>
            <Text style={{ fontSize: 14, marginBottom: 12, color: '#333' }}>{usuarioLogado.email}</Text>
            <Text style={styles.cardLabel}>Cargo:</Text>
            <Text style={{ fontSize: 14, marginBottom: 12, color: '#333' }}>{usuarioLogado.cargo}</Text>
          </View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#d32f2f', marginTop: 16 }]}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>🚪 Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}