import { View, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { useEffect } from 'react';
import ExcluirProduto from '../componentes/excluirProduto';
import styles from '../estilos/estilos';
import Header from '../componentes/header';
import { useAuth } from '../context/AuthContext';


export default function ExcluirProdutoScreen({ navigation }) {
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
        'Apenas funcionários ou gerentes podem remover produtos.',
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
      <Header title="Excluir Produto" subtitle="Remove um produto do sistema" />
      <ScrollView
        style={[styles.container, styles.scrollArea, { paddingHorizontal: 16 }]}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={true}
        keyboardDismissMode="on-drag"
      >
        <ExcluirProduto />
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
