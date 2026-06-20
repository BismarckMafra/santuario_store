import { View, ScrollView, Text } from 'react-native';
import LoginFuncionario from '../componentes/loginFuncionario';
import styles from '../estilos/estilos';
import Header from '../componentes/header';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Footer from '../componentes/footer.js';

export default function LoginScreen({ navigation }) {
  const { usuarioLogado } = useAuth();

  useEffect(() => {
    // Se já está logado, redirecionar para home
    if (usuarioLogado) {
      navigation.replace('Home');
    }
  }, [usuarioLogado, navigation]);

  return (
    <View style={styles.screenWrapper}>
      <Header title="Login de Funcionário" subtitle="Entre com suas credenciais para continuar" />
      <ScrollView
        style={[styles.container, styles.scrollArea]}
        contentContainerStyle={[styles.scrollContainer, { paddingHorizontal: 16, paddingTop: 20 }]}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={true}
        keyboardDismissMode="on-drag"
      >
        <View style={[styles.card, { marginBottom: 20 }]}> 
          <Text style={styles.formTitle}>Bem-vindo de volta</Text>
          <Text style={styles.formSubtitle}>
            Este acesso é exclusivo para funcionários. Se você não tem cadastro, peça ao gerente para criar seu usuário no sistema.
          </Text>
        </View>

        <LoginFuncionario />
        
      </ScrollView>
    </View>
  );
}
