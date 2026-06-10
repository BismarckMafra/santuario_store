import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from "react-native";
import styles from "../estilos/estilos";
import { useEffect, useState } from "react";
import { firebaseProdutosService } from "../services/firebase/firebaseProdutosService";

export default function CadastroProduto() {
    const [produto, setProduto] = useState({ nome: '', descricao: '', preco: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!produto.nome.trim()) newErrors.nome = 'Nome é obrigatório';
        if (!produto.descricao.trim()) newErrors.descricao = 'Descrição é obrigatória';
        if (!produto.preco.trim()) {
            newErrors.preco = 'Preço é obrigatório';
        } else if (isNaN(parseFloat(produto.preco)) || parseFloat(produto.preco) <= 0) {
            newErrors.preco = 'Preço deve ser um número maior que zero';
        }
        return newErrors;
    };

    const adicionarProduto = async () => {
        const newErrors = validateForm();
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length > 0) return;

        setLoading(true);
        try {
            console.log(' Enviando produto para Firebase:', { nome: produto.nome, descricao: produto.descricao, preco: produto.preco });
            const resultado = await firebaseProdutosService.criar({ nome: produto.nome, descricao: produto.descricao, preco: parseFloat(produto.preco) });
            console.log('✅ Produto criado no Firebase:', resultado);
            Alert.alert('✓ Sucesso', 'Produto cadastrado com sucesso no Firebase!', [
                { text: 'OK', onPress: () => setProduto({ nome: '', descricao: '', preco: '' }) }
            ]);
        } catch (error) {
            console.error('❌ Erro detalhado:', error);
            Alert.alert(
                '❌ Erro ao Cadastrar',
                `Falha: ${error.message || 'Verifique a conexão com Firebase'}`,
                [{ text: 'OK' }]
            );
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

            <Text style={styles.cardLabel}>Preço</Text>
            <TextInput
                style={[styles.input, errors.preco && styles.inputError]}
                placeholder="Digite o preço do produto"
                value={produto.preco}
                onChangeText={(text) => {
                    setProduto({ ...produto, preco: text });
                    if (errors.preco) setErrors({ ...errors, preco: '' });
                }}
                editable={!loading}
                keyboardType="numeric"
            />
            {errors.preco && <Text style={styles.errorText}>{errors.preco}</Text>}
                value={user.email}
                onChangeText={(text) => {
                    setUser({ ...user, email: text });
                    if (errors.email) setErrors({ ...errors, email: '' });
                }}
                keyboardType="email-address"
                editable={!loading}

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