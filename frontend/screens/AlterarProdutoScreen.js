import { View, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AlterarProduto from '../componentes/alterarProduto.js';
import styles from '../estilos/estilos';
import Header from '../componentes/header';
import { useAuth } from '../context/AuthContext';

export default function AlterarProdutoScreen({ navigation }) {
  const { usuarioLogado } = useAuth();
  const route = useRoute();
  const { id } = route.params || {};

  // Verificar se usuário está logado
  if (!usuarioLogado) {
    Alert.alert(
      '⚠️ Acesso Negado',
      'Você precisa estar logado para acessar esta página.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
    return null;
  }

  return (
    <View style={styles.screenWrapper}>
      <Header title="Alterar Produto" subtitle="Edite os dados de um produto" />
      <ScrollView style={[styles.container, { paddingHorizontal: 16 }]} contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
        <AlterarProduto initialId={id} />
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