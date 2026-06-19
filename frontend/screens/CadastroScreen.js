import { View, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { useEffect } from 'react';
import CadastroFuncionario from '../componentes/cadastroFuncionario';
import styles from '../estilos/estilos';
import Header from '../componentes/header';
import { useAuth } from '../context/AuthContext';

export default function CadastroScreen({ navigation }) {
  const { usuarioLogado, isGerente } = useAuth();

  useEffect(() => {
    if (!usuarioLogado) {
      Alert.alert(
        '⚠️ Acesso Negado',
        'Você precisa estar logado para acessar esta página.',
        [{ text: 'OK', onPress: () => navigation.replace('Login') }]
      );
      return;
    }

    if (!isGerente()) {
      Alert.alert(
        '❌ Acesso Negado',
        'Apenas gerentes podem cadastrar funcionários.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }
  }, [usuarioLogado, isGerente, navigation]);

  const voltarParaHome = () => {
    navigation.replace('Home');
  };

  if (!usuarioLogado || !isGerente()) {
    return null;
  }

  return (
    <View style={styles.screenWrapper}>
      <Header title="Cadastro de Funcionário" subtitle="Adicione um novo colaborador ao sistema" />
      <ScrollView
        style={[styles.container, styles.scrollArea, { paddingHorizontal: 16 }]}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        <CadastroFuncionario />
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
