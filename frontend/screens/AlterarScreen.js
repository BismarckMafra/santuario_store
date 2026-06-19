import { View, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { useEffect } from 'react';
import Alterar from '../componentes/alterar';
import styles from '../estilos/estilos';
import Header from '../componentes/header';
import { useAuth } from '../context/AuthContext';

export default function AlterarScreen({ navigation }) {
  const { usuarioLogado, isGerente } = useAuth();

  useEffect(() => {
    if (!usuarioLogado) {
      navigation.replace('Login');
      return;
    }

    if (!isGerente()) {
      Alert.alert(
        '❌ Acesso Negado',
        'Apenas gerentes podem alterar usuários.',
        [{ text: 'OK', onPress: () => navigation.canGoBack() ? navigation.goBack() : navigation.replace('Home') }]
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
      <Header title="Alterar Usuário" subtitle="Edite os dados de um usuário" />
      <ScrollView
        style={[styles.container, styles.scrollArea, { paddingHorizontal: 16 }]}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={true}
        keyboardDismissMode="on-drag"
      >
        <Alterar />
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
