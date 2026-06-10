import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from "react-native";
import styles from "../estilos/estilos";
import { useEffect, useState } from "react";
import { firebaseUsuariosService } from "../services/firebase/firebaseUsuariosService";

export default function Cadastro() {
    const [user, setUser] = useState({ nome: '', email: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!user.nome.trim()) newErrors.nome = 'Nome é obrigatório';
        if (!user.email.trim()) newErrors.email = 'Email é obrigatório';
        if (user.email.trim() && !user.email.includes('@')) newErrors.email = 'Email inválido';
        if (!user.senha.trim()) newErrors.senha = 'Senha é obrigatória';
        if (user.senha.trim() && user.senha.length < 6) newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
        if (user.senha.trim() && !user.senha.match(/[!@#$%^&*()-+]/)) newErrors.senha = 'Senha deve ter caractere especial';
        return newErrors;
    };

    const adicionarUsuario = async () => {
        const newErrors = validateForm();
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length > 0) return;

        setLoading(true);
        try {
            console.log('� Enviando usuário para Firebase:', { nome: user.nome, email: user.email });
            const resultado = await firebaseUsuariosService.criar({ nome: user.nome, email: user.email });
            console.log('✅ Usuário criado no Firebase:', resultado);
            Alert.alert('✓ Sucesso', 'Usuário cadastrado com sucesso no Firebase!', [
                { text: 'OK', onPress: () => setUser({ nome: '', email: '' }) }
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
            <Text style={styles.formTitle}>📝 Novo Usuário</Text>

            <Text style={styles.cardLabel}>Nome</Text>
            <TextInput
                style={[styles.input, errors.nome && styles.inputError]}
                placeholder="Digite seu nome completo"
                value={user.nome}
                onChangeText={(text) => {
                    setUser({ ...user, nome: text });
                    if (errors.nome) setErrors({ ...errors, nome: '' });
                }}
                editable={!loading}
            />
            {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

            <Text style={styles.cardLabel}>Email</Text>
            <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="seu.email@exemplo.com"
                value={user.email}
                onChangeText={(text) => {
                    setUser({ ...user, email: text });
                    if (errors.email) setErrors({ ...errors, email: '' });
                }}
                keyboardType="email-address"
                editable={!loading}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.6 }]}
                onPress={adicionarUsuario}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.buttonText}>✓ Gravar Usuário</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}