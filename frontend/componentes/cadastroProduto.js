import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from "react-native";
import styles from "../estilos/estilos";
import { useState } from "react";
import { firebaseProdutosService } from "../../services/firebase/firebaseProdutosService.js";
import { useAuth } from '../context/AuthContext';
import { toastCreateSuccess, toastError, toastPermissionDenied } from '../utils/toastService';

export default function CadastroProduto() {
    const { isGerente } = useAuth();
    const [produto, setProduto] = useState({ nome: '', preco: '', descricao: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!produto.nome.trim()) newErrors.nome = 'Nome é obrigatório';
        if (!produto.preco.trim()) newErrors.preco = 'Preço é obrigatório';
        if (!produto.descricao.trim()) newErrors.descricao = 'Descrição é obrigatória';
        return newErrors;
    };

    const adicionarProduto = async () => {
        if (!isGerente()) {
            toastPermissionDenied();
            return;
        }

        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        setLoading(true);
        try {
            const response = await firebaseProdutosService.criar({ nome: produto.nome, preco: produto.preco, descricao: produto.descricao });
            toastCreateSuccess(`Produto "${produto.nome}"`);
            setProduto({ nome: '', preco: '', descricao: '' });
        } catch (error) {
            toastError('Falha ao cadastrar produto', error.message || 'Verifique sua conexão');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.formTitle}>📝 Novo Produto</Text>

            <Text style={styles.cardLabel}>Nome</Text>
            <TextInput
                style={[styles.input, errors.nome && styles.inputError]}
                placeholder="Digite o nome do produto"
                value={produto.nome}
                onChangeText={(text) => {
                    setProduto({ ...produto, nome: text });
                    if (errors.nome) setErrors({ ...errors, nome: '' });
                }}
                editable={!loading}
            />
            {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

            <Text style={styles.cardLabel}>Preço</Text>
            <TextInput
                style={[styles.input, errors.preco && styles.inputError]}
                placeholder="Digite o preço do produto"
                value={produto.preco}
                onChangeText={(text) => {
                    setProduto({ ...produto, preco: text });
                    if (errors.preco) setErrors({ ...errors, preco: '' });
                }}
                keyboardType="numeric"
                editable={!loading}
            />
            {errors.preco && <Text style={styles.errorText}>{errors.preco}</Text>}

            <Text style={styles.cardLabel}>Descrição</Text>
            <TextInput
                style={[styles.input, errors.descricao && styles.inputError]}
                placeholder="Digite a descrição do produto"
                value={produto.descricao}
                onChangeText={(text) => {
                    setProduto({ ...produto, descricao: text });
                    if (errors.descricao) setErrors({ ...errors, descricao: '' });
                }}
                editable={!loading}
            />
            {errors.descricao && <Text style={styles.errorText}>{errors.descricao}</Text>}

            <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.6 }]}
                onPress={adicionarProduto}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.buttonText}>✓ Gravar Produto</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}
 