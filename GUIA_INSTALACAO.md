# Guia de Instalação e Utilização - Sistema de Autenticação

## ⚙️ Configuração Inicial

### 1. Instalar Dependência de Storage (se não instalada)
```bash
npm install @react-native-async-storage/async-storage
# ou
yarn add @react-native-async-storage/async-storage
```

### 2. Verificar package.json
Certifique-se que o `package.json` contém:
```json
{
  "dependencies": {
    "@react-native-async-storage/async-storage": "^1.x.x",
    "@react-navigation/native": "^6.x.x",
    "@react-navigation/stack": "^6.x.x",
    "react": "^18.x.x",
    "react-native": "^0.x.x"
  }
}
```

## 🚀 Iniciando a Aplicação

### Com Expo
```bash
cd aula2
npm start
# ou
expo start
```

### Com React Native CLI
```bash
cd aula2
npx react-native run-android
# ou
npx react-native run-ios
```

## 📱 Fluxo de Primeira Utilização

### 1. **Tela de Login**
- Aplicativo inicia na tela de login
- Digite email e senha de um usuário funcionário/gerente
- Clique em "Fazer Login"

### 2. **Credenciais de Teste**
Você precisará ter usuários criados no Firebase com os dados de teste:
- **Email**: usuario@teste.com
- **Senha**: (sua senha cadastrada)
- **Cargo**: "Gerente" ou "Funcionário"

> ⚠️ **Importante**: O cargo deve ser exatamente "Gerente" ou "Funcionário" para que as permissões funcionem corretamente.

### 3. **HomeScreen**
Após login, você verá:
- ✅ Menu de Usuários (se for Gerente)
- ✅ Menu de Produtos (se for Funcionário)
- ✅ Menu de Funcionários (se for Gerente)
- ✅ Informações do usuário logado
- ✅ Botão de Logout

## 🔐 Testando Permissões

### Teste 1: Acesso de Gerente
1. Faça login como **Gerente**
2. Verifique que você vê:
   - ✅ Seção de Usuários
   - ✅ Seção de Funcionários
   - ❌ Seção de Produtos (opcional, dependendo da regra)

### Teste 2: Acesso de Funcionário
1. Faça login como **Funcionário**
2. Verifique que você vê:
   - ❌ Seção de Usuários (mas pode listar)
   - ✅ Seção de Produtos
   - ❌ Seção de Funcionários

3. Tente acessar "Cadastro de Usuário" → deve redirecionar para "Cadastro de Funcionário"

### Teste 3: Acesso Negado
1. Faça logout
2. Tente acessar qualquer funcionalidade
3. Deve aparecer alerta: "Você precisa estar logado"

## 🔄 Ciclo de Autenticação

```
1. Usuário entra no app
   ↓
2. Verifica se há usuário em AsyncStorage
   ↓
3. Se sim → vai para HomeScreen
   Se não → vai para LoginScreen
   ↓
4. Na HomeScreen, usuário faz logout
   ↓
5. AsyncStorage é limpo
   ↓
6. Volta para LoginScreen
```

## 📋 Estrutura de Dados do Usuário

Quando o usuário faz login com sucesso, é armazenado no contexto:

```javascript
{
  id: "id_do_usuario",
  nome: "Nome do Usuário",
  email: "email@exemplo.com",
  cargo: "Gerente", // ou "Funcionário"
  // ... outras propriedades retornadas pelo servidor
}
```

## 🆘 Troubleshooting

### Problema: "useAuth deve ser usado dentro de um AuthProvider"
**Solução**: Certifique-se que o `App.js` tem o `AuthProvider` envolvendo o `NavigationContainer`

### Problema: Usuário não persiste após fechar app
**Solução**: Verifique se o `@react-native-async-storage/async-storage` está instalado

### Problema: "Acesso Negado" mesmo sendo Gerente
**Solução**: Verifique se o cargo está exatamente como "Gerente" (maiúscula no G)

### Problema: Redirecionamento infinito entre Login e Home
**Solução**: Certifique-se que o serviço de login retorna um objeto com a propriedade `cargo`

## 🎯 Verificar Implementação

Para garantir que tudo está funcionando:

1. ✅ Abra o projeto no VS Code
2. ✅ Verifique se a pasta `frontend/contexto/` existe com `AuthContext.js` e `useAuth.js`
3. ✅ Verifique se `frontend/screens/LoginScreen.js` existe
4. ✅ Verifique se `App.js` tem `<AuthProvider>` envolvendo o `NavigationContainer`
5. ✅ Execute o app e teste os fluxos de autenticação

## 📚 Documentação Completa

Para mais detalhes sobre o sistema de autenticação, consulte:
- [AUTENTICACAO.md](./AUTENTICACAO.md) - Documentação técnica
- [RESUMO_IMPLEMENTACOES.md](./RESUMO_IMPLEMENTACOES.md) - Resumo de mudanças

## 🎓 Exemplo de Uso em Componente

```javascript
import { useAuth } from '../contexto/useAuth';
import { View, Text } from 'react-native';

export default function MeuComponente() {
  const { usuarioLogado, isGerente, isFuncionario } = useAuth();

  if (!usuarioLogado) {
    return <Text>Você precisa estar logado</Text>;
  }

  return (
    <View>
      <Text>Bem-vindo, {usuarioLogado.nome}</Text>
      {isGerente() && <Text>Você é um gerente</Text>}
      {isFuncionario() && <Text>Você é um funcionário</Text>}
    </View>
  );
}
```

## 🚨 Checklist de Verificação

- [ ] AsyncStorage instalado
- [ ] AuthProvider envolve NavigationContainer no App.js
- [ ] LoginScreen definida como rota inicial
- [ ] Serviço de login retorna objeto com `cargo`
- [ ] Cargo é "Gerente" ou "Funcionário" (exato)
- [ ] HomeScreen redireciona para Login se não logado
- [ ] Telas protegidas verificam `usuarioLogado`
- [ ] Menus são condicionais baseado em `isGerente()` e `isFuncionario()`

## ✨ Funcionalidades Prontas

- ✅ Autenticação com persistência
- ✅ Controle de acesso por cargo
- ✅ Redirecionamentos inteligentes
- ✅ Logout com confirmação
- ✅ Mensagens de erro claras
- ✅ Interface responsiva

Tudo pronto para começar a usar! 🎉
