import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from "react-native";
import styles from "../estilos/estilos";
import { useState } from "react";
import { firebaseProdutosService } from "../services/firebase/firebaseProdutosService";

export default function ExcluirProduto() {
    const [produtoId, setProdutoId] = useState('');
    const [produto, setProduto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const carregarProduto = async () => {
        if (!produtoId.trim()) {
            setErrors({ produtoId: 'ID é obrigatório' });
            return;
        }

            setLoading(true);
        try {
            const foundProduto = await firebaseProdutosService.obterPorId(produtoId);
            setProduto(foundProduto);
            setErrors({});
        } catch (error) {
            Alert.alert('Erro', 'Produto não encontrado ou erro ao carregar');
            setProduto(null);
        } finally {
            setLoading(false);
        }
    };

    const excluirProduto = async () => {
        Alert.alert(
            'Confirmar exclusão',
            `Tem certeza que deseja excluir ${produto.nome}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        setLoading(true);
                        try {
                            await firebaseProdutosService.deletar(produtoId);
                            Alert.alert('Sucesso', 'Produto excluído com sucesso!');
                            setProdutoId('');
                            setProduto(null);
                        } catch (error) {
                            Alert.alert('Erro', 'Falha ao excluir produto');
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.formTitle}>🗑️ Excluir Produto</Text>

            <Text style={styles.cardLabel}>ID do Produto</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <TextInput
                    style={[styles.input, { flex: 1 }, errors.produtoId && styles.inputError]}
                    placeholder="Digite o ID"
                    value={produtoId}
                    onChangeText={(text) => {
                        setProdutoId(text);
                        if (errors.produtoId) setErrors({ ...errors, produtoId: '' });
                    }}
                    editable={!loading}
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    style={[styles.button, styles.buttonSmall, { justifyContent: 'center', width: 'auto', paddingHorizontal: 16 }]}
                    onPress={carregarProduto}
                    disabled={loading}
                >
                    <Text style={[styles.buttonText, styles.buttonSmallText]}>🔍</Text>
                </TouchableOpacity>
            </View>
            {errors.produtoId && <Text style={styles.errorText}>{errors.produtoId}</Text>}

            {produto && (
                <>
                    <View style={[styles.card, { marginTop: 16, borderLeftColor: '#EF4444' }]}>
                        <Text style={styles.cardLabel}>📦 Produto</Text>
                        <Text style={styles.cardValue}>{produto.nome}</Text>

                        <Text style={styles.cardLabel}>🏷️ Categoria</Text>
                        <Text style={styles.cardValue}>{produto.categoria}</Text>

                        <Text style={styles.cardLabel}>💰 Preço</Text>
                        <Text style={styles.price}>R$ {parseFloat(produto.preco).toFixed(2)}</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, styles.buttonDanger, loading && { opacity: 0.6 }]}
                        onPress={excluirProduto}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.buttonText}>🗑️ Confirmar Exclusão</Text>
                        )}
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}