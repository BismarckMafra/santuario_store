import { View, Text, Pressable } from "react-native";
import styles from "../estilos/estilos";

export default function CardProduto({ props, onDelete, onEdit }) {
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardId}>ID: {props.id}</Text>
            </View>

            <Text style={styles.cardLabel}>📦 Produto</Text>
            <Text style={styles.cardValue}>{props.nome}</Text>

            <Text style={styles.cardLabel}>🏷️ Descrição</Text>
            <Text style={styles.cardValue}>{props.descricao}</Text>

            <Text style={styles.cardLabel}>💰 Preço</Text>
            <Text style={styles.price}>R$ {parseFloat(props.preco).toFixed(2)}</Text>

            {(onEdit || onDelete) && (
                <View style={styles.cardActions}>
                    {onEdit && (
                        <Pressable
                            style={[styles.button, styles.buttonSmall, { flex: 1 }]}
                            onPress={() => onEdit(props.id)}
                            android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
                        >
                            <Text style={[styles.buttonText, styles.buttonSmallText]}>✏️ Alterar</Text>
                        </Pressable>
                    )}
                    {onDelete && (
                        <Pressable
                            style={[styles.button, styles.buttonSmall, styles.buttonDanger, { flex: 1 }]}
                            onPress={() => onDelete(props.id)}
                            android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
                        >
                            <Text style={[styles.buttonText, styles.buttonSmallText]}>🗑️ Excluir</Text>
                        </Pressable>
                    )}

                </View>
            )}
        </View >
    );
}
