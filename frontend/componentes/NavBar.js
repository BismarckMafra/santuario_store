import { View, TouchableOpacity, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import styles from '../estilos/estilos';


export default function NavBar({ navigationRef }) {
  const { usuarioLogado, isFuncionario, isGerente, logout } = useAuth();
  const routeName = navigationRef?.isReady() ? navigationRef.getCurrentRoute()?.name : null;

  if (!usuarioLogado || routeName === 'Login') {
    return null;
  }

  const items = [
    { label: 'Home', route: 'Home' },
    { label: 'Usuários', route: 'Listar' },
    { label: 'Produtos', route: 'ListarProduto' },
  ];

  return (
    <View style={styles.navBar}>
      {items.map((item) => {
        if (item.route === 'Listar' && !isGerente()) {
          return null;
        }

        return (
          <TouchableOpacity
            key={item.route}
            style={[
              styles.navBarButton,
              routeName === item.route && styles.navBarButtonActive,
            ]}
            onPress={() => navigationRef?.navigate(item.route)}
            activeOpacity={0.7}
          >
            <Text style={routeName === item.route ? styles.navBarButtonTextActive : styles.navBarButtonText}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        style={styles.navBarButton}
        onPress={async () => {
          await logout();
          navigationRef?.replace('ListarProduto');
        }}
        activeOpacity={0.7}
      >
        <Text style={styles.navBarButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
