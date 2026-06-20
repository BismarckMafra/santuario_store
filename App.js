import { View } from 'react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './frontend/screens/LoginScreen';
import HomeScreen from './frontend/screens/HomeScreen';
import CadastroScreen from './frontend/screens/CadastroScreen';
import ListarScreen from './frontend/screens/ListarScreen';
import AlterarScreen from './frontend/screens/AlterarScreen';
import ExcluirScreen from './frontend/screens/ExcluirScreen';
import CadastroProdutoScreen from './frontend/screens/CadastroProdutoScreen';
import ListarProdutoScreen from './frontend/screens/ListarProdutoScreen';
import AlterarProdutoScreen from './frontend/screens/AlterarProdutoScreen';
import ExcluirProdutoScreen from './frontend/screens/ExcluirProdutoScreen';
import TestFirebaseScreen from './frontend/screens/TestFirebaseScreen';
import CadastroFuncionarioScreen from './frontend/screens/cadastroFuncionario';
import NavBar from './frontend/componentes/NavBar';
import Footer from './frontend/componentes/footer';
import { ToastContainer } from './frontend/componentes/ToastContainer';
import { AuthProvider, useAuth } from './frontend/context/AuthContext';
import { colors } from './frontend/estilos/estilos';

const Stack = createStackNavigator();
const navigationRef = createNavigationContainerRef();

function AppNavigator() {
  const { usuarioLogado } = useAuth();

  return (
    <NavigationContainer ref={navigationRef}>
      <View style={{ flex: 1 }}>
        <Stack.Navigator
          initialRouteName={usuarioLogado ? 'Home' : 'ListarProduto'}
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.white,
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 18,
            },
            headerShown: false,
            cardStyle: {
              backgroundColor: colors.background,
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login' }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Home' }}
          />
          <Stack.Screen
            name="Cadastro"
            component={CadastroScreen}
            options={{ title: 'Cadastro de Usuário' }}
          />
          <Stack.Screen
            name="Listar"
            component={ListarScreen}
            options={{ title: 'Listar Usuários' }}
          />
          <Stack.Screen
            name="Alterar"
            component={AlterarScreen}
            options={{ title: 'Alterar Usuário' }}
          />
          <Stack.Screen
            name="Excluir"
            component={ExcluirScreen}
            options={{ title: 'Excluir Usuário' }}
          />
          <Stack.Screen
            name="CadastroProduto"
            component={CadastroProdutoScreen}
            options={{ title: 'Cadastro de Produto' }}
          />
          <Stack.Screen
            name="ListarProduto"
            component={ListarProdutoScreen}
            options={{ title: 'Listar Produtos' }}
          />
          <Stack.Screen
            name="AlterarProduto"
            component={AlterarProdutoScreen}
            options={{ title: 'Alterar Produto' }}
          />
          <Stack.Screen
            name="ExcluirProduto"
            component={ExcluirProdutoScreen}
            options={{ title: 'Excluir Produto' }}
          />
          <Stack.Screen
            name="TestFirebase"
            component={TestFirebaseScreen}
            options={{ title: 'Teste Firebase' }}
          />
          <Stack.Screen
            name="CadastroFuncionario"
            component={CadastroFuncionarioScreen}
            options={{ title: 'Cadastro de Funcionário' }}
          />
        </Stack.Navigator>
        <NavBar navigationRef={navigationRef} />
      </View>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
      <ToastContainer />
    </AuthProvider>
  );
}


