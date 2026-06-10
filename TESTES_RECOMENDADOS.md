# Testes Recomendados - Sistema de Autenticação

## 🧪 Casos de Teste

### Teste 1: Login com Credenciais Válidas (Gerente)
**Objetivo**: Verificar se login funciona para gerente

**Passos**:
1. Abrir app
2. Na tela de Login, inserir email e senha de um gerente
3. Clicar em "Fazer Login"

**Resultado Esperado**:
- ✅ Alerta de sucesso: "✅ Sucesso - Login realizado com sucesso!"
- ✅ Redirecionamento para HomeScreen
- ✅ Exibição de "Bem-vindo, [Nome do Gerente]"
- ✅ Seção de "Gerenciar Usuários" visível
- ✅ Seção de "Gerenciar Produtos" visível
- ✅ Seção de "Gerenciar Funcionários" visível

---

### Teste 2: Login com Credenciais Válidas (Funcionário)
**Objetivo**: Verificar se login funciona para funcionário

**Passos**:
1. Fazer logout (se logado)
2. Na tela de Login, inserir email e senha de um funcionário
3. Clicar em "Fazer Login"

**Resultado Esperado**:
- ✅ Alerta de sucesso: "✅ Sucesso - Login realizado com sucesso!"
- ✅ Redirecionamento para HomeScreen
- ✅ Exibição de "Bem-vindo, [Nome do Funcionário]"
- ✅ Seção de "Gerenciar Usuários" invisível (ou apenas leitura)
- ✅ Seção de "Gerenciar Produtos" visível
- ✅ Seção de "Gerenciar Funcionários" invisível

---

### Teste 3: Login com Credenciais Inválidas
**Objetivo**: Verificar se sistema rejeita credenciais incorretas

**Passos**:
1. Na tela de Login, inserir email inválido ou senha incorreta
2. Clicar em "Fazer Login"

**Resultado Esperado**:
- ✅ Alerta de erro: "❌ Erro - Falha ao fazer login..."
- ✅ Usuário permanece na tela de Login
- ✅ Campos de email/senha não são limpos

---

### Teste 4: Validação do Formulário de Login
**Objetivo**: Verificar validação dos campos

**Passos**:
1. Na tela de Login, deixar email em branco
2. Clicar em "Fazer Login"

**Resultado Esperado**:
- ✅ Mensagem de erro: "Email é obrigatório"
- ✅ Campo de email fica com fundo vermelho

**Passos**:
1. Na tela de Login, deixar senha em branco
2. Clicar em "Fazer Login"

**Resultado Esperado**:
- ✅ Mensagem de erro: "Senha é obrigatória"
- ✅ Campo de senha fica com fundo vermelho

---

### Teste 5: Acesso a Cadastro de Usuário (Gerente)
**Objetivo**: Verificar se gerente pode acessar cadastro de usuário

**Passos**:
1. Login como Gerente
2. Na HomeScreen, clicar em "Cadastrar" da seção "Gerenciar Usuários"

**Resultado Esperado**:
- ✅ Navegação para CadastroScreen
- ✅ Formulário de cadastro de usuário visível
- ✅ Campos: Nome e Email presentes

---

### Teste 6: Acesso a Cadastro de Usuário (Funcionário)
**Objetivo**: Verificar se funcionário é redirecionado

**Passos**:
1. Login como Funcionário
2. Tentar navegar para "Cadastro" (via URL direto ou se aparece)

**Resultado Esperado**:
- ✅ Redirecionamento automático para "CadastroFuncionario"
- ⚠️ Ou mensagem: "Apenas gerentes podem cadastrar novos usuários"

---

### Teste 7: Acesso a Cadastro de Produto (Funcionário)
**Objetivo**: Verificar se funcionário pode cadastrar produtos

**Passos**:
1. Login como Funcionário
2. Na HomeScreen, clicar em "Cadastrar" da seção "Gerenciar Produtos"

**Resultado Esperado**:
- ✅ Navegação para CadastroProdutoScreen
- ✅ Formulário de cadastro de produto visível
- ✅ Campos: Nome, Preço e Descrição presentes

---

### Teste 8: Acesso a Cadastro de Produto (Gerente)
**Objetivo**: Verificar se gerente é impedido

**Passos**:
1. Login como Gerente
2. Tentar navegar para "CadastroProduto" (via URL direto)

**Resultado Esperado**:
- ✅ Redirecionamento para HomeScreen
- ✅ Alerta: "❌ Acesso Negado - Apenas funcionários podem cadastrar produtos."

---

### Teste 9: Acesso a Exclusão de Produto (Funcionário)
**Objetivo**: Verificar se funcionário pode remover produtos

**Passos**:
1. Login como Funcionário
2. Na HomeScreen, clicar em "Excluir" da seção "Gerenciar Produtos"

**Resultado Esperado**:
- ✅ Navegação para ExcluirProdutoScreen
- ✅ Formulário/lista visível para exclusão

---

### Teste 10: Acesso a Exclusão de Produto (Gerente)
**Objetivo**: Verificar se gerente é impedido

**Passos**:
1. Login como Gerente
2. Tentar navegar para "ExcluirProduto" (via URL direto)

**Resultado Esperado**:
- ✅ Redirecionamento para HomeScreen
- ✅ Alerta: "❌ Acesso Negado - Apenas funcionários podem remover produtos."

---

### Teste 11: Logout
**Objetivo**: Verificar se logout funciona corretamente

**Passos**:
1. Login com qualquer usuário
2. Na HomeScreen, clicar em "🚪 Logout"
3. Confirmar logout

**Resultado Esperado**:
- ✅ Alerta de confirmação desaparece
- ✅ AsyncStorage é limpo
- ✅ Redirecionamento para LoginScreen
- ✅ Campos de login estão vazios

---

### Teste 12: Persistência de Sessão
**Objetivo**: Verificar se usuário permanece logado após fechar app

**Passos**:
1. Login com um usuário
2. Fechar o app completamente
3. Reabrir o app

**Resultado Esperado**:
- ✅ App vai diretamente para HomeScreen (sem passar por Login)
- ✅ Dados do usuário ainda visíveis
- ✅ Seções do menu ainda condicionais corretamente

---

### Teste 13: Acesso a Tela Não Autenticada
**Objetivo**: Verificar proteção de rotas

**Passos**:
1. Fazer logout
2. Tentar navegar para qualquer funcionalidade (ex: Listar Usuários)

**Resultado Esperado**:
- ✅ Alerta: "⚠️ Acesso Negado - Você precisa estar logado para acessar esta página."
- ✅ Redirecionamento para LoginScreen

---

### Teste 14: Visualização de Informações do Usuário
**Objetivo**: Verificar se dados do usuário são exibidos corretamente

**Passos**:
1. Login
2. Na HomeScreen, rolar para o final

**Resultado Esperado**:
- ✅ Seção "ℹ️ Informações do Usuário" visível
- ✅ Nome do usuário exibido corretamente
- ✅ Email do usuário exibido corretamente
- ✅ Cargo do usuário exibido corretamente

---

### Teste 15: Erro de Validação de Email
**Objetivo**: Verificar validação de formato de email

**Passos**:
1. Na tela de Login, inserir "emailinvalido" (sem @)
2. Clicar em "Fazer Login"

**Resultado Esperado**:
- ✅ Mensagem de erro: "Email inválido"
- ✅ Campo de email com fundo vermelho
- ✅ Botão de login desabilitado até corrigir

---

## 📊 Matriz de Testes

| Teste | Usuário | Ação | Resultado |
|-------|---------|------|-----------|
| 1 | Gerente | Login | Sucesso |
| 2 | Funcionário | Login | Sucesso |
| 3 | Qualquer | Login Inválido | Erro |
| 4 | Qualquer | Validação | Erros Exibidos |
| 5 | Gerente | Cadastro Usuário | Acesso |
| 6 | Funcionário | Cadastro Usuário | Redirecionado |
| 7 | Funcionário | Cadastro Produto | Acesso |
| 8 | Gerente | Cadastro Produto | Negado |
| 9 | Funcionário | Exclusão Produto | Acesso |
| 10 | Gerente | Exclusão Produto | Negado |
| 11 | Qualquer | Logout | Sucesso |
| 12 | Qualquer | Persistência | Mantém Session |
| 13 | Não Logado | Funcionalidade | Acesso Negado |
| 14 | Qualquer | Info Usuário | Exibido |
| 15 | Qualquer | Email Inválido | Erro |

---

## 🐛 Bugs Conhecidos / Verificações

- [ ] AsyncStorage pode não funcionar em alguns emuladores
- [ ] Verificar se cargo vem exatamente como "Gerente" ou "Funcionário"
- [ ] Em dispositivos iOS, pode haver delay na persistência
- [ ] Logout não funciona em navegação rápida

---

## 📝 Notas de Teste

**Data**: _______________  
**Testador**: _______________  
**Plataforma**: Android / iOS / Web  
**Versão do App**: _______________  

**Observações**:
_____________________________________________
_____________________________________________
_____________________________________________

---

## ✅ Checklist Final

- [ ] Todos os 15 testes foram executados
- [ ] Nenhum erro crítico encontrado
- [ ] Autenticação funcionando corretamente
- [ ] Autorização funcionando corretamente
- [ ] Persistência de sessão funcionando
- [ ] Redirecionamentos funcionando
- [ ] Mensagens de erro exibidas corretamente
- [ ] Interface responsiva em diferentes tamanhos
- [ ] Sem travamentos ou crashes
- [ ] Pronto para produção

---

## 📞 Suporte

Se encontrar algum problema durante os testes:

1. Verifique a documentação em [AUTENTICACAO.md](./AUTENTICACAO.md)
2. Consulte o guia de instalação em [GUIA_INSTALACAO.md](./GUIA_INSTALACAO.md)
3. Verifique o resumo de implementações em [RESUMO_IMPLEMENTACOES.md](./RESUMO_IMPLEMENTACOES.md)
