import { View, Text } from "react-native";
import styles from "../estilos/estilos";

export default function Header({ title = 'We Win', subtitle = 'Cadastre-se e Gerencie seus Produtos' }) {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            <Text style={styles.headerSubtitle}>{subtitle}</Text>
        </View>
    );
}