import { View, TouchableOpacity, Text } from 'react-native';
import TestFirebase from '../componentes/testFirebase';
import styles from '../estilos/estilos';
import Header from '../componentes/header';

export default function TestFirebaseScreen({ navigation }) {
  return (
    <View style={styles.screenWrapper}>
      <Header title="Teste de Conexão" subtitle="Verifique Firebase e Backend" />
      <TestFirebase />
      <TouchableOpacity
        style={[styles.button, { marginHorizontal: 16, marginBottom: 16 }]}
        onPress={() => navigation.replace('Home')}
      >
        <Text style={styles.buttonText}>Voltar para Home</Text>
      </TouchableOpacity>
    </View>
  );
}
