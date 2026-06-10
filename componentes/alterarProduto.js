import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from "react-native";
import styles from "../estilos/estilos";
import { useState } from "react";
import { firebaseProdutosService } from "../services/firebase/firebaseProdutosService";

export default function AlterarProduto({ initialId }) {
    const [produtoId, setProdutoId] = useState(initialId ? initialId.toString() : '');
    const [produto, setProduto] = useState({ nome: '', categoria: '', preco: '' });
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState({});

    const carregarProduto = async () => {
        if (!produtoId.trim()) {
            setErrors({ produtoId: 'ID é obrigatório' });
            return;
        }

        setLoading(true);
        try {
            const foundProduto = await firebaseProdutosService.obterPorId(produtoId);
            setProduto({
                nome: foundProduto.nome,
                categoria: foundProduto.categoria,
                preco: foundProduto.preco.toString()
            });
            setLoaded(true);
            setErrors({});
        } catch (error) {
            Alert.alert('Erro', 'Produto não encontrado ou erro ao carregar');
            setLoaded(false);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!produto.nome.trim()) newErrors.nome = 'Nome é obrigatório';
        if (!produto.categoria.trim()) newErrors.categoria = 'Categoria é obrigatória';
        if (!produto.preco.trim()) {
            newErrors.preco = 'Preço é obrigatório';
        } else if (isNaN(parseFloat(produto.preco)) || parseFloat(produto.preco) <= 0) {
            newErrors.preco = 'Preço deve ser um número maior que zero';
        }
        return newErrors;
    };

    const alterarProduto = async () => {
        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        setLoading(true);
        try {
            await firebaseProdutosService.atualizar(produtoId, {
                nome: produto.nome,
                categoria: produto.categoria,
                preco: parseFloat(produto.preco)
            });
            Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
            setProdutoId('');
            setProduto({ nome: '', categoria: '', preco: '' });
            setLoaded(false);
        } catch (error) {
            Alert.alert('Erro', 'Falha ao atualizar produto');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.formTitle}>✏️ Alterar Produto</Text>
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

            {loaded && (
                <>
                    <Text style={[styles.cardLabel, { marginTop: 16 }]}>Nome do Produto</Text>
                    <TextInput
                        style={[styles.input, errors.nome && styles.inputError]}
                        placeholder="Digite o novo nome"
                        value={produto.nome}
                        onChangeText={(text) => {
                            setProduto({ ...produto, nome: text });
                            if (errors.nome) setErrors({ ...errors, nome: '' });
                        }}
                        editable={!loading}
                    />
                    {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

                    <Text style={styles.cardLabel}>Categoria</Text>
                    <TextInput
                        style={[styles.input, errors.categoria && styles.inputError]}
                        placeholder="Digite a nova categoria"
                        value={produto.categoria}
                        onChangeText={(text) => {
                            setProduto({ ...produto, categoria: text });
                            if (errors.categoria) setErrors({ ...errors, categoria: '' });
                        }}
                        editable={!loading}
                    />
                    {errors.categoria && <Text style={styles.errorText}>{errors.categoria}</Text>}

                    <Text style={styles.cardLabel}>Preço (R$)</Text>
                    <TextInput
                        style={[styles.input, errors.preco && styles.inputError]}
                        placeholder="0.00"
                        value={produto.preco}
                        onChangeText={(text) => {
                            setProduto({ ...produto, preco: text });
                            if (errors.preco) setErrors({ ...errors, preco: '' });
                        }}
                        editable={!loading}
                        keyboardType="decimal-pad"
                    />
                    {errors.preco && <Text style={styles.errorText}>{errors.preco}</Text>}

                    <TouchableOpacity
                        style={[styles.button, styles.buttonSuccess, loading && { opacity: 0.6 }]}
                        onPress={alterarProduto}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.buttonText}>✓ Salvar Alterações</Text>
                        )}
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}