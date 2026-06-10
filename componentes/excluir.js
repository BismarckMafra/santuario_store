import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from "react-native";
import styles from "../estilos/estilos";
import { useState } from "react";
import { firebaseUsuariosService } from "../services/firebase/firebaseUsuariosService";

export default function Excluir() {
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const carregarUsuario = async () => {
        if (!userId.trim()) {
            setErrors({ userId: 'ID é obrigatório' });
            return;
        }

        setLoading(true);
        try {
            const foundUser = await firebaseUsuariosService.obterPorId(userId);
            setUser(foundUser);
            setErrors({});
        } catch (error) {
            Alert.alert('Erro', 'Usuário não encontrado ou erro ao carregar');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const excluirUsuario = async () => {
        Alert.alert(
            'Confirmar exclusão',
            `Tem certeza que deseja excluir ${user.nome}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        setLoading(true);
                        try {
                            await firebaseUsuariosService.deletar(userId);
                            Alert.alert('Sucesso', 'Usuário excluído com sucesso!');
                            setUserId('');
                            setUser(null);
                        } catch (error) {
                            Alert.alert('Erro', 'Falha ao excluir usuário');
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
            <Text style={styles.formTitle}>🗑️ Excluir Usuário</Text>

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

            {user && (
                <>
                    <View style={[styles.card, { marginTop: 16, borderLeftColor: '#EF4444' }]}>
                        <Text style={styles.cardLabel}>👤 Nome</Text>
                        <Text style={styles.cardValue}>{user.nome}</Text>

                        <Text style={styles.cardLabel}>📧 Email</Text>
                        <Text style={styles.cardValue}>{user.email}</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, styles.buttonDanger, loading && { opacity: 0.6 }]}
                        onPress={excluirUsuario}
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
