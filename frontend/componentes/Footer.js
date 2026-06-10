import { View, Text } from 'react-native';
import styles from '../estilos/estilos';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Santuário Store • Gestão simples de usuários e produtos</Text>
    </View>
  );
}
