# Sistema de Autenticação e Autorização - Documentação

## Visão Geral
Este projeto implementa um sistema de controle de acesso baseado em papéis (Role-Based Access Control - RBAC) utilizando um contexto React (AuthContext) para gerenciar autenticação e permissões.

## Estrutura de Autenticação

### 1. AuthContext (`frontend/contexto/AuthContext.js`)
O contexto que armazena as informações do usuário logado e fornece funções para:
- **Login**: Armazena o usuário logado no AsyncStorage
- **Logout**: Remove o usuário do AsyncStorage
- **isGerente()**: Verifica se o usuário é gerente
- **isFuncionario()**: Verifica se o usuário é funcionário

### 2. Hook useAuth (`frontend/contexto/useAuth.js`)
Hook que facilita o acesso ao contexto de autenticação em qualquer componente.

## Regras de Acesso Implementadas

### Cadastro de Usuários
- ✅ **Apenas Gerentes** podem cadastrar novos usuários
- ⚠️ Se um funcionário tentar acessar, será redirecionado para a página de cadastro de funcionário
- ❌ Usuários não logados recebem mensagem de acesso negado

### Cadastro de Produtos
- ✅ **Apenas Funcionários** podem cadastrar produtos
- ❌ Gerentes e outros usuários recebem mensagem de acesso negado
- ❌ Usuários não logados recebem mensagem de acesso negado

### Exclusão de Produtos
- ✅ **Apenas Funcionários** podem remover produtos
- ❌ Gerentes e outros usuários recebem mensagem de acesso negado
- ❌ Usuários não logados recebem mensagem de acesso negado

## Como Usar

### 1. Envolver a aplicação com o AuthProvider
No arquivo `App.js`, o NavigationContainer está envolvido pelo `AuthProvider`:

```javascript
<AuthProvider>
  <NavigationContainer>
    {/* Navigation */}
  </NavigationContainer>
</AuthProvider>
```

### 2. Usar o hook useAuth em componentes
```javascript
import { useAuth } from '../contexto/useAuth';

export default function MeuComponente() {
  const { usuarioLogado, isGerente, isFuncionario, login, logout } = useAuth();
  
  // Usar as funções conforme necessário
}
```

### 3. Fazer login
O componente `LoginFuncionario` realiza o login:
```javascript
const { login } = useAuth();

const response = await usuariosService.login(email, senha);
await login(response); // Armazena o usuário no contexto
```

### 4. Verificar permissões
```javascript
if (isGerente()) {
  // Renderizar conteúdo apenas para gerentes
}

if (isFuncionario()) {
  // Renderizar conteúdo apenas para funcionários
}
```

## Dados do Usuário Armazenados

O usuário logado contém pelo menos as seguintes propriedades:
```javascript
{
  id: string,
  nome: string,
  email: string,
  cargo: string, // 'Gerente', 'Funcionário', etc.
  // ... outras propriedades
}
```

## Persistência
O usuário logado é armazenado no `AsyncStorage`, o que significa que:
- ✅ O usuário permanece logado após fechar e reabrir o app
- ✅ O logout remove a sessão
- ⚠️ Verificar se o `@react-native-async-storage/async-storage` está instalado no projeto

## Estrutura de Pastas
```
frontend/
├── contexto/
│   ├── AuthContext.js      # Contexto de autenticação
│   └── useAuth.js          # Hook para usar o contexto
├── componentes/
│   ├── loginFuncionario.js # Componente de login
│   ├── cadastro.js         # Cadastro de usuários (apenas gerentes)
│   ├── cadastroProduto.js  # Cadastro de produtos (apenas funcionários)
│   └── ...
├── screens/
│   ├── CadastroScreen.js              # Tela com proteção para gerentes
│   ├── CadastroProdutoScreen.js       # Tela com proteção para funcionários
│   ├── ExcluirProdutoScreen.js        # Tela com proteção para funcionários
│   └── ...
└── App.js                  # Envolvido com AuthProvider
```

## Fluxo de Autenticação

```
1. Usuário faz login via LoginFuncionario
   ↓
2. Dados são validados no Firebase
   ↓
3. Se válido, usuário é armazenado no contexto (AuthContext) e AsyncStorage
   ↓
4. Contexto é atualizado em toda a aplicação
   ↓
5. Componentes verificam permissões via isGerente() ou isFuncionario()
   ↓
6. Acesso é concedido ou negado conforme as regras
```

## Exemplo de Uso Completo

```javascript
import { useAuth } from '../contexto/useAuth';
import { Alert } from 'react-native';

export default function MinhaTelaProtegida({ navigation }) {
  const { usuarioLogado, isGerente, isFuncionario } = useAuth();

  useEffect(() => {
    if (!usuarioLogado) {
      Alert.alert('Acesso Negado', 'Você precisa estar logado');
      navigation.goBack();
      return;
    }

    if (!isGerente()) {
      Alert.alert('Acesso Negado', 'Apenas gerentes podem acessar');
      navigation.goBack();
      return;
    }
  }, [usuarioLogado, isGerente, navigation]);

  return (
    <View>
      <Text>Bem-vindo, {usuarioLogado?.nome}!</Text>
    </View>
  );
}
```

## Próximos Passos (Recomendações)

1. ✅ Implementar tela de login dedicada
2. ✅ Adicionar logout na HomeScreen
3. ✅ Implementar refresh de token (se usar JWT)
4. ✅ Adicionar verificações de autorização no backend
5. ✅ Implementar permissões mais granulares conforme necessário
