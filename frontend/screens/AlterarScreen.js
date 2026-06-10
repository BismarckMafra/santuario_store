import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import Alterar from '../componentes/alterar';
import styles from '../estilos/estilos';
import Header from '../componentes/header';

export default function AlterarScreen({ navigation }) {
  return (
    <View style={styles.screenWrapper}>
      <Header title="Alterar Usuário" subtitle="Edite os dados de um usuário" />
      <ScrollView style={[styles.container, { paddingHorizontal: 16 }]} contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
        <Alterar />
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