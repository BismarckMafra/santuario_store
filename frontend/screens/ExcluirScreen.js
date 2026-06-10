import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import Excluir from '../componentes/excluir';
import styles from '../estilos/estilos';
import Header from '../componentes/header';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ExcluirScreen({ navigation }) {
  const { usuarioLogado } = useAuth();

  useEffect(() => {
    // Se não está logado, redirecionar para login
    if (!usuarioLogado) {
      navigation.replace('Login');
    }
  }, [usuarioLogado, navigation]);

  return (
    <View style={styles.screenWrapper}>
      <Header title="Excluir Usuário" subtitle="Remove um usuário do sistema" />
      <ScrollView style={[styles.container, { paddingHorizontal: 16 }]} contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
        <Excluir />
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
