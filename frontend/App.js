import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CadastroScreen from './screens/CadastroScreen';
import ListarScreen from './screens/ListarScreen';
import AlterarScreen from './screens/AlterarScreen';
import ExcluirScreen from './screens/ExcluirScreen';
import CadastroProdutoScreen from './screens/CadastroProdutoScreen';
import ListarProdutoScreen from './screens/ListarProdutoScreen';
import AlterarProdutoScreen from './screens/AlterarProdutoScreen';
import ExcluirProdutoScreen from './screens/ExcluirProdutoScreen';
import TestFirebaseScreen from './screens/TestFirebaseScreen';
import { colors } from './estilos/estilos';

const Stack = createStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Home"
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
    </Stack.Navigator>
  </NavigationContainer>
  );
}
