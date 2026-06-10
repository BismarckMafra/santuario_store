import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from "react-native";
import styles from "../estilos/estilos";
import { useState } from "react";
import { firebaseUsuariosService as usuariosService } from "../../services/firebase/firebaseUsuariosService";

export default function Alterar() {
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState({ nome: '', email: '' });
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState({});

    const carregarUsuario = async () => {
        if (!userId.trim()) {
            Alert.alert('❌ Erro', 'Por favor, informe o ID do usuário');
            setErrors({ userId: 'ID é obrigatório' });
            return;
        }

        setLoading(true);
        try {
            const response = await usuariosService.listar();
            const foundUser = response.find(u => u.id.toString() === userId);
            if (foundUser) {
                setUser({ nome: foundUser.nome, email: foundUser.email });
                setLoaded(true);
                setErrors({});
            } else {
                Alert.alert('❌ Não Encontrado', `Nenhum usuário encontrado com ID: ${userId}`);
                setLoaded(false);
            }
        } catch (error) {
            Alert.alert('❌ Erro ao Carregar', `Motivo: ${error.message || 'Falha ao carregar usuário'}`);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!user.nome.trim()) newErrors.nome = 'Nome é obrigatório';
        if (!user.email.trim()) newErrors.email = 'Email é obrigatório';
        if (user.email.trim() && !user.email.includes('@')) newErrors.email = 'Email inválido';
        return newErrors;
    };

    const alterarUsuario = async () => {
        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        setLoading(true);
        try {
            await usuariosService.atualizar(userId, { nome: user.nome, email: user.email });
            Alert.alert(
                '✅ Sucesso',
                `Usuário ID ${userId} atualizado com sucesso!`,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            setUserId('');
                            setUser({ nome: '', email: '' });
                            setLoaded(false);
                        }
                    }
                ]
            );
        } catch (error) {
            Alert.alert('❌ Erro ao Atualizar', `Motivo: ${error.message || 'Falha ao atualizar usuário'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.formTitle}>✏️ Alterar Usuário</Text>
            <Text style={styles.cardLabel}>ID do Usuário</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <TextInput
                    style={[styles.input, { flex: 1 }, errors.userId && styles.inputError]}
                    placeholder="Digite o ID"
                    value={userId}
                    onChangeText={(text) => {
                        setUserId(text);
                        if (errors.userId) setErrors({ ...errors, userId: '' });
                    }}
                    editable={!loading}
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    style={[styles.button, styles.buttonSmall, { justifyContent: 'center', width: 'auto', paddingHorizontal: 16 }]}
                    onPress={carregarUsuario}
                    disabled={loading}
                >
                    <Text style={[styles.buttonText, styles.buttonSmallText]}>🔍</Text>
                </TouchableOpacity>
            </View>
            {errors.userId && <Text style={styles.errorText}>{errors.userId}</Text>}

            {loaded && (
                <>
                    <Text style={[styles.cardLabel, { marginTop: 16 }]}>Nome</Text>
                    <TextInput
                        style={[styles.input, errors.nome && styles.inputError]}
                        placeholder="Digite o novo nome"
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
                        placeholder="Digite o novo email"
                        value={user.email}
                        onChangeText={(text) => {
                            setUser({ ...user, email: text });
                            if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        editable={!loading}
                        keyboardType="email-address"
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                    <TouchableOpacity
                        style={[styles.button, styles.buttonSuccess, loading && { opacity: 0.6 }]}
                        onPress={alterarUsuario}
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