import { View, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { useEffect } from 'react';
import CadastroProduto from '../componentes/cadastroProduto';
import styles from '../estilos/estilos';
import Header from '../componentes/header';
import { useAuth } from '../context/AuthContext';


export default function CadastroProdutoScreen({ navigation }) {
  const { usuarioLogado, isFuncionario, isGerente } = useAuth();

  useEffect(() => {
    if (!usuarioLogado) {
      Alert.alert(
        '⚠️ Acesso Negado',
        'Você precisa estar logado para acessar esta página.',
        [{ text: 'OK', onPress: () => navigation.replace('Login') }]
      );
      return;
    }

    if (!isFuncionario() && !isGerente()) {
      Alert.alert(
        '❌ Acesso Negado',
        'Você não tem permissão para cadastrar produtos.',
        [{ text: 'OK', onPress: () => navigation.canGoBack() ? navigation.goBack() : navigation.replace('Home') }]
      );
    }
  }, [usuarioLogado, isFuncionario, isGerente, navigation]);

  const voltarParaHome = () => {
    navigation.replace('Home');
  };

  if (!usuarioLogado || (!isFuncionario() && !isGerente())) {
    return null;
  }

  return (
    <View style={styles.screenWrapper}>
      <Header title="Cadastro de Produto" subtitle="Adicione um novo produto" />
      <ScrollView
        style={[styles.container, styles.scrollArea, { paddingHorizontal: 16 }]}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        <CadastroProduto />
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, { marginHorizontal: 16, marginBottom: 16 }]}
        onPress={voltarParaHome}
      >
        <Text style={styles.buttonText}>Voltar para Home</Text>
      </TouchableOpacity>
    </View>
  );
}
