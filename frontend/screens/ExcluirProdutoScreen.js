import { View, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { useEffect } from 'react';
import ExcluirProduto from '../componentes/excluirProduto';
import styles from '../estilos/estilos';
import Header from '../componentes/header';
import { useAuth } from '../context/AuthContext';


export default function ExcluirProdutoScreen({ navigation }) {
  const { usuarioLogado, isGerente } = useAuth();

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

    // Se não for gerente, mostrar mensagem de acesso negado
    if (!isGerente()) {
      navigation.goBack();
      Alert.alert(
        '❌ Acesso Negado',
        'Apenas gerentes podem remover produtos.'
      );
    }
  }, [usuarioLogado, isGerente, navigation]);

  // Se não for gerente, não renderizar nada
  if (!isGerente()) {
    return null;
  }

  return (
    <View style={styles.screenWrapper}>
      <Header title="Excluir Produto" subtitle="Remove um produto do sistema" />
      <ScrollView style={[styles.container, { paddingHorizontal: 16 }]} contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
        <ExcluirProduto />
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