import { View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import styles from '../estilos/estilos.js';
import Header from '../componentes/header';
import ListarProdutos from '../componentes/listarProduto';
import { firebaseProdutosService } from '../../services/firebase/firebaseProdutosService.js';
import { useAuth } from '../context/AuthContext';
import { toastDeleteSuccess } from '../utils/toastService';
import { confirmAction } from '../utils/confirmAction';

export default function HomeScreen({ navigation }) {
  const { usuarioLogado, isFuncionario, isGerente, logout } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const [produtosLoading, setProdutosLoading] = useState(true);

  const canManagePeople = isGerente();
  const canManageProducts = isGerente() || isFuncionario();

  useEffect(() => {
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
    Alert.alert('Confirmar saída', 'Deseja sair do sistema?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        onPress: async () => {
          await logout();
          navigation.replace('Login');
        },
      },
    ]);
  };

  const usuarioOptions = [
    { title: 'Cadastrar', screen: 'CadastroFuncionario', icon: '+' },
    { title: 'Listar', screen: 'Listar', icon: '≡' },
    { title: 'Alterar', screen: 'Alterar', icon: '✎' },
    { title: 'Excluir', screen: 'Excluir', icon: '×' },
  ];

  const produtoOptions = [
    { title: 'Cadastrar', screen: 'CadastroProduto', icon: '+' },
    { title: 'Listar', screen: 'ListarProduto', icon: '≡' },
    { title: 'Alterar', screen: 'AlterarProduto', icon: '✎' },
    { title: 'Excluir', screen: 'ExcluirProduto', icon: '×' },
  ];

  const handleProdutoDelete = async (id) => {
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
          setProdutos((prev) => prev.filter((produto) => produto.id !== id));
          toastDeleteSuccess('Produto');
        } catch (error) {
          Alert.alert('Erro ao excluir', `Motivo: ${error.message || 'Falha ao excluir produto'}`);
        }
      },
    });
  };

  const handleProdutoEdit = (id) => {
    if (canManageProducts) {
      navigation.navigate('AlterarProduto', { id });
    }
  };

  const renderMenuGrid = (options) => (
    <View style={styles.navGrid}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.screen}
          style={styles.navCard}
          onPress={() => navigation.navigate(option.screen)}
          activeOpacity={0.75}
        >
          <Text style={styles.navCardIcon}>{option.icon}</Text>
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
      <Header title="Santuário Store" subtitle={`Bem-vindo, ${usuarioLogado.nome}`} />

      <ScrollView
        style={[styles.container, styles.scrollArea]}
        contentContainerStyle={styles.homeContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {canManagePeople && (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Gerenciar pessoas</Text>
            {renderMenuGrid(usuarioOptions)}
          </View>
        )}

        {canManageProducts && (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Gerenciar produtos</Text>
            {renderMenuGrid(produtoOptions)}
          </View>
        )}

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Produtos</Text>
          <ListarProdutos
            db={produtos}
            loading={produtosLoading}
            onDelete={canManageProducts ? handleProdutoDelete : undefined}
            onEdit={canManageProducts ? handleProdutoEdit : undefined}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Conexão</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('TestFirebase')}
            activeOpacity={0.75}
          >
            <Text style={styles.buttonText}>Testar Firebase e backend</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Sessão</Text>
          <Text style={styles.cardLabel}>Nome</Text>
          <Text style={styles.cardValue}>{usuarioLogado.nome}</Text>
          <Text style={styles.cardLabel}>Email</Text>
          <Text style={styles.cardValue}>{usuarioLogado.email}</Text>
          <Text style={styles.cardLabel}>Cargo</Text>
          <Text style={styles.cardValue}>{usuarioLogado.cargo}</Text>

          <TouchableOpacity
            style={[styles.button, styles.buttonDanger, { marginTop: 16 }]}
            onPress={handleLogout}
            activeOpacity={0.75}
          >
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
