import { View, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { useEffect } from 'react';
import CadastroProduto from '../componentes/cadastroProduto';
import styles from '../estilos/estilos';
import Header from '../componentes/header';
import { useAuth } from '../context/AuthContext';


export default function CadastroProdutoScreen({ navigation }) {
  const { usuarioLogado, isFuncionario } = useAuth();

  useEffect(() => {
    // Verificar se usuário está logado
    if (!usuarioLogado) {
      Alert.alert(
        '⚠️ Acesso Negado',
        'Você precisa estar logado para acessar esta página.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
      return;
    }

    // Apenas gerente ou funcionário podem cadastrar produtos
    if (!isFuncionario() && !isGerente()) {
      navigation.goBack();
      Alert.alert(
        '❌ Acesso Negado',
        'Você não tem permissão para cadastrar produtos.'
      );
    }
  }, [usuarioLogado, isFuncionario, isGerente, navigation]);

  // Se não for funcionário nem gerente, não renderizar nada
  if (!isFuncionario() && !isGerente()) {
    return null;
  }

  return (
    <View style={styles.screenWrapper}>
      <Header title="Cadastro de Produto" subtitle="Adicione um novo produto" />
      <ScrollView style={[styles.container, { paddingHorizontal: 16 }]} contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
        <CadastroProduto />
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, { marginHorizontal: 16, marginBottom: 16 }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}