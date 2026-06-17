import { View, ScrollView, RefreshControl, TouchableOpacity, Text, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import ListarUsuarios from '../componentes/listarUsuarios';
import styles from '../estilos/estilos';
import Header from '../componentes/header';
import { firebaseUsuariosService as usuariosService } from '../../services/firebase/firebaseUsuariosService';
import { useAuth } from '../context/AuthContext';

export default function ListarScreen({ navigation }) {
  const { usuarioLogado, isGerente } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUsuarios = async () => {
    try {
      const data = await usuariosService.listar();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!usuarioLogado) {
      navigation.replace('Login');
      return;
    }

    if (!isGerente()) {
      Alert.alert(
        '❌ Acesso Negado',
        'Apenas gerentes podem acessar essa área.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
      return;
    }

    fetchUsuarios();
    const unsubscribe = navigation.addListener('focus', fetchUsuarios);
    return unsubscribe;
  }, [usuarioLogado, isGerente, navigation]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsuarios();
  };

  if (!usuarioLogado || !isGerente()) {
    return null;
  }

  const handleDelete = async (id) => {
    Alert.alert(
      '⚠️ Confirmar Exclusão',
      'Tem certeza que deseja excluir este usuário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await usuariosService.deletar(id);
              setUsers(users.filter(user => user.id !== id));
              Alert.alert('✅ Sucesso', 'Usuário excluído com sucesso.');
            } catch (error) {
              Alert.alert('❌ Erro ao Excluir', `Motivo: ${error.message || 'Falha ao excluir usuário'}`);
            }
          },
        },
      ]
    );
  };

  const handleEdit = (id) => {
    navigation.navigate('Alterar', { userId: id });
  };

  return (
    <View style={styles.screenWrapper}>
      <Header title="Usuários" subtitle={`Total: ${users.length} registros`} />
      <ScrollView
        style={[styles.container, { paddingHorizontal: 16 }]}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={true}
        keyboardDismissMode="on-drag"
      >
        <ListarUsuarios
          db={users}
          loading={loading}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, { marginHorizontal: 16, marginBottom: 16 }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}