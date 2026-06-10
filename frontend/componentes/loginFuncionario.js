import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from "react-native";
import styles from "../estilos/estilos";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { firebaseUsuariosService as usuariosService } from "../../services/firebase/firebaseUsuariosService";
import { useAuth } from '../context/AuthContext';


export default function LoginFuncionario() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigation = useNavigation();
    const { login } = useAuth();

    const validateForm = () => {
        const newErrors = {};
        if (!email.trim()) newErrors.email = 'Email é obrigatório';
        if (email.trim() && !email.includes('@')) newErrors.email = 'Email inválido';
        if (!senha.trim()) newErrors.senha = 'Senha é obrigatória';
        if (senha.trim() && senha.length < 6) newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
        return newErrors;
    }

    const loginUsuario = async () => {
        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setLoading(true);
            try {
                const normalizedEmail = email.trim().toLowerCase();
                const response = await usuariosService.login(normalizedEmail, senha);
                if (response) {
                    await login(response);
                    setEmail('');
                    setSenha('');
                    navigation.replace('Home');
                    return;
                }
                throw new Error('Credenciais inválidas');
            } catch (error) {
                Alert.alert('❌ Erro', 'Falha ao fazer login. Por favor, verifique suas credenciais.');
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <View style={styles.formContainer}>
            <Text style={styles.formTitle}>🔐 Login Funcionário</Text>

            <Text style={styles.cardLabel}>Email</Text>
            <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="seu.email@exemplo.com"
                value={email}
                onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) setErrors({ ...errors, email: '' });
                }}
                keyboardType="email-address"
                editable={!loading}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <Text style={styles.cardLabel}>Senha</Text>
            <TextInput
                style={[styles.input, errors.senha && styles.inputError]}
                placeholder="Digite sua senha"
                value={senha}
                onChangeText={(text) => {
                    setSenha(text);
                    if (errors.senha) setErrors({ ...errors, senha: '' });
                }}
                secureTextEntry
                editable={!loading}
            />
            {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}

            <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.6 }]}
                onPress={loginUsuario}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.buttonText}>✓ Fazer Login</Text>
                )}
            </TouchableOpacity>
        </View>
    )
}