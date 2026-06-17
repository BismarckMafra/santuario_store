import { View, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import AlterarProduto from '../componentes/alterarProduto.js';
import styles from '../estilos/estilos';
import Header from '../componentes/header';
import { useAuth } from '../context/AuthContext';

export default function AlterarProdutoScreen({ navigation }) {
  const { usuarioLogado, isFuncionario, isGerente } = useAuth();
  const route = useRoute();
  const { id } = route.params || {};

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
        'Você não tem permissão para alterar produtos.',
        [{ text: 'OK', onPress: () => navigation.canGoBack() ? navigation.goBack() : navigation.replace('Home') }]
      );
    }
  }, [usuarioLogado, isFuncionario, isGerente, navigation]);

  const safeGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.replace('Home');
    }
  };

  if (!usuarioLogado || (!isFuncionario() && !isGerente())) {
    return null;
  }

  return (
    <View style={styles.screenWrapper}>
      <Header title="Alterar Produto" subtitle="Edite os dados de um produto" />
      <ScrollView
        style={[styles.container, { paddingHorizontal: 16 }]}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        <AlterarProduto initialId={id} />
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, { marginHorizontal: 16, marginBottom: 16 }]}
        onPress={safeGoBack}
      >
        <Text style={styles.buttonText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}