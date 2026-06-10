import { View, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { useEffect } from 'react';
import Cadastro from '../componentes/cadastro';
import CadastroFuncionario from '../componentes/cadastroFuncionario';
import styles from '../estilos/estilos';
import Header from '../componentes/header';
import { useAuth } from '../context/AuthContext';


export default function CadastroScreen({ navigation }) {
  const { usuarioLogado, isFuncionario, isGerente } = useAuth();

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

    // Se for funcionário, redirecionar para cadastro de funcionário
    if (isFuncionario()) {
      navigation.replace('CadastroFuncionario');
    }
  }, [usuarioLogado, isFuncionario, navigation]);

  // Se não for gerente, mostrar mensagem de acesso negado
  if (!isGerente()) {
    return (
      <View style={styles.screenWrapper}>
        <Header title="Cadastro de Usuário" subtitle="Adicione um novo usuário" />
        <View style={[styles.container, { paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={styles.formTitle}>❌ Acesso Negado</Text>
          <Text style={[styles.cardLabel, { marginTop: 16, textAlign: 'center' }]}>
            Apenas gerentes podem cadastrar novos usuários.
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, { marginHorizontal: 16, marginBottom: 16 }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>← Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.screenWrapper}>
      <Header title="Cadastro de Usuário" subtitle="Adicione um novo usuário" />
      <ScrollView style={[styles.container, { paddingHorizontal: 16 }]} contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
        <Cadastro />
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