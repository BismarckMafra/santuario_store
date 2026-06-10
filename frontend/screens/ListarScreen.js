import { View, ScrollView, RefreshControl, TouchableOpacity, Text } from 'react-native';
import { useEffect, useState } from 'react';
import ListarUsuarios from '../componentes/listarUsuarios';
import styles from '../estilos/estilos';
import Header from '../componentes/header';
import { firebaseUsuariosService as usuariosService } from '../../services/firebase/firebaseUsuariosService';

export default function ListarScreen({ navigation }) {
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
    fetchUsuarios();
    const unsubscribe = navigation.addListener('focus', fetchUsuarios);
    return unsubscribe;
  }, [navigation]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsuarios();
  };

  const handleDelete = async (id) => {
    try {
      await usuariosService.deletar(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
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