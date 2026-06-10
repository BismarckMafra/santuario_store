import { View, Text, TouchableOpacity } from "react-native";
import styles from "../estilos/estilos";

export default function CardUsuario({ props, onDelete, onEdit }) {
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardId}>ID: {props.id}</Text>
            </View>

            <Text style={styles.cardLabel}>👤 Nome</Text>
            <Text style={styles.cardValue}>{props.nome}</Text>

            <Text style={styles.cardLabel}>📧 Email</Text>
            <Text style={styles.cardValue}>{props.email}</Text>

            {(onEdit || onDelete) && (
                <View style={styles.cardActions}>
                    {onEdit && (
                        <TouchableOpacity
                            style={[styles.button, styles.buttonSmall, { flex: 1 }]}
                            onPress={() => onEdit(props.id)}
                        >
                            <Text style={[styles.buttonText, styles.buttonSmallText]}>✏️ Alterar</Text>
                        </TouchableOpacity>
                    )}
                    {onDelete && (
                        <TouchableOpacity
                            style={[styles.button, styles.buttonSmall, styles.buttonDanger, { flex: 1 }]}
                            onPress={() => onDelete(props.id)}
                        >
                            <Text style={[styles.buttonText, styles.buttonSmallText]}>🗑️ Excluir</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
}