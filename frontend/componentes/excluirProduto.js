import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import styles from "../estilos/estilos";
import { useState } from "react";
import { firebaseProdutosService } from "../../services/firebase/firebaseProdutosService";
import { useAuth } from '../context/AuthContext';
import { toastDeleteSuccess, toastError, toastPermissionDenied } from '../utils/toastService';
import { confirmAction } from '../utils/confirmAction';

export default function ExcluirProduto() {
    const { isFuncionario, isGerente } = useAuth();
    const [produtoId, setProdutoId] = useState('');
    const [produto, setProduto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const carregarProduto = async () => {
        if (!produtoId.trim()) {
            toastError('ID do produto é obrigatório');
            setErrors({ produtoId: 'ID é obrigatório' });
            return;
        }

        setLoading(true);
        try {
            const foundProduto = await firebaseProdutosService.obterPorId(produtoId);
            setProduto(foundProduto);
            setErrors({});
        } catch (error) {
            toastError('Falha ao carregar produto', error.message || 'Produto não encontrado');
            setProduto(null);
        } finally {
            setLoading(false);
        }
    };

    const excluirProduto = async () => {
        if (!isGerente() && !isFuncionario()) {
            toastPermissionDenied();
            return;
        }

        confirmAction({
            title: 'Confirmar exclusão',
            message: `Tem certeza que deseja excluir o produto "${produto.nome}" (ID: ${produto.id})?\n\nEsta ação não pode ser desfeita.`,
            confirmText: 'Excluir',
            destructive: true,
            onConfirm: async () => {
                setLoading(true);
                try {
                    await firebaseProdutosService.deletar(produtoId);
                    toastDeleteSuccess(`Produto "${produto.nome}"`);
                    setProdutoId('');
                    setProduto(null);
                } catch (error) {
                    toastError('Falha ao excluir produto', error.message);
                } finally {
                    setLoading(false);
                }
            },
        });
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
