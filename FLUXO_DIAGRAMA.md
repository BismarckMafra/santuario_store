# Diagrama de Fluxo - Sistema de Autenticação e Autorização

## 📊 Fluxo Geral da Aplicação

```
┌─────────────────────────────────────────────────────────────┐
│                     INICIAR APLICATIVO                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│         Verificar AsyncStorage para Usuário Logado          │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
         ▼                               ▼
    ┌─────────────┐              ┌──────────────┐
    │ Usuário     │              │ Sem Usuário  │
    │ Encontrado  │              │ em Storage   │
    └──────┬──────┘              └──────┬───────┘
           │                            │
           ▼                            ▼
    ┌──────────────────┐        ┌─────────────────┐
    │ Ir para          │        │ Ir para Tela    │
    │ HomeScreen       │        │ de Login        │
    └──────────────────┘        └────────┬────────┘
                                         │
                                         ▼
                                ┌─────────────────────┐
                                │  LoginScreen        │
                                │  - Email input      │
                                │  - Senha input      │
                                │  - Validação        │
                                └────────┬────────────┘
                                         │
                                         ▼
                        ┌────────────────────────────────┐
                        │  Chamar usuariosService.login  │
                        │  (Firebase/Backend)            │
                        └────────┬──────────────┬────────┘
                                 │              │
                    ┌────────────┘              └────────────┐
                    │ Sucesso                         Erro   │
                    ▼                                         ▼
            ┌──────────────────┐                    ┌──────────────────┐
            │ Armazenar em     │                    │ Exibir Alerta    │
            │ AsyncStorage     │                    │ de Erro          │
            └────────┬─────────┘                    └──────────────────┘
                     │
                     ▼
            ┌──────────────────┐
            │ Atualizar        │
            │ AuthContext      │
            └────────┬─────────┘
                     │
                     ▼
        ┌─────────────────────────────┐
        │   Verificar Permissões      │
        │   (isGerente/isFuncionario) │
        └────────────┬────────────────┘
                     │
         ┌───────────┴────────────┐
         │                        │
    Gerente                   Funcionário
         │                        │
         ▼                        ▼
    ┌─────────┐            ┌──────────────┐
    │ Menu:   │            │ Menu:        │
    │ - Users │            │ - Produtos   │
    │ - Prods │            │ - Info       │
    │ - Staff │            └──────────────┘
    └─────────┘
```

---

## 🔐 Fluxo de Autenticação Detalhado

```
                          USUÁRIO INSERE CREDENCIAIS
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │  Validar Email            │
                    │  - Não vazio              │
                    │  - Contém @               │
                    └──────────┬───────────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                 Válido              Inválido
                    │                     │
                    ▼                     ▼
            ┌────────────────┐   ┌──────────────┐
            │ Validar Senha  │   │ Exibir Erro  │
            │ - Não vazio    │   │ "Email       │
            │ - Min 6 chars  │   │  inválido"   │
            └────────┬───────┘   └──────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
     Válido                    Inválido
        │                         │
        ▼                         ▼
   ┌─────────────────┐    ┌──────────────┐
   │ Chamar Login    │    │ Exibir Erro  │
   │ (Firebase)      │    │ "Senha       │
   └────────┬────────┘    │  obrigatória"│
            │             └──────────────┘
            ▼
    ┌──────────────────┐
    │ Firebase/Backend │
    │ Valida Credenciais
    └────────┬─────────┘
             │
    ┌────────┴────────┐
    │                 │
 Sucesso          Falha
    │                 │
    ▼                 ▼
┌──────────────┐  ┌────────────────────┐
│ Retorna      │  │ Retorna erro       │
│ {            │  │ "Credenciais       │
│  id: "...",  │  │  inválidas"        │
│  nome: "...",│  │                    │
│  cargo: "..."│  │ Usuário volta para │
│ }            │  │ tela de login      │
└──────┬───────┘  └────────────────────┘
       │
       ▼
┌──────────────────────┐
│ Armazenar no         │
│ AsyncStorage +       │
│ AuthContext          │
└──────────┬───────────┘
           │
           ▼
    ┌─────────────────┐
    │ HomeScreen      │
    │ (com menu       │
    │  condicional)   │
    └─────────────────┘
```

---

## 👥 Fluxo de Autorização

```
                    USUÁRIO TENTA ACESSAR FUNCIONALIDADE
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │ Verificar se está      │
                    │ autenticado            │
                    └────────┬───────────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
                 Sim              Não
                    │                 │
                    ▼                 ▼
            ┌──────────────┐   ┌──────────────┐
            │ Verificar    │   │ Alert:       │
            │ Permissão    │   │ "Acesso      │
            │ (cargo)      │   │  Negado"     │
            └────────┬─────┘   │ (Voltar para │
                     │         │  Login)      │
            ┌────────┴────────┐ └──────────────┘
            │                 │
        Permitido         Negado
            │                 │
            ▼                 ▼
        ┌────────┐   ┌───────────────┐
        │ Renderizar │   │ Alert:        │
        │ Conteúdo   │   │ "Apenas [role]│
        │            │   │ pode acessar" │
        └────────┘   │ (Voltar)       │
                     └───────────────┘
```

---

## 📋 Fluxo por Funcionalidade

### Cadastro de Usuário
```
Usuário Clica em "Cadastrar" (Usuários)
              │
              ▼
┌────────────────────────────┐
│ Verificar isGerente()      │
└────────┬──────────┬────────┘
         │          │
      Sim           Não (Funcionário)
         │          │
         ▼          ▼
    ┌────────┐  ┌──────────────────────┐
    │ Mostrar│  │ Redirecionar para:   │
    │Cadastro│  │ CadastroFuncionario  │
    │ Usuário│  └──────────────────────┘
    └────────┘
```

### Cadastro de Produto
```
Usuário Clica em "Cadastrar" (Produtos)
              │
              ▼
┌────────────────────────────┐
│ Verificar isFuncionario()  │
└────────┬──────────┬────────┘
         │          │
      Sim          Não
         │          │
         ▼          ▼
    ┌────────┐  ┌──────────────┐
    │ Mostrar│  │ Alert:       │
    │Cadastro│  │ "Acesso      │
    │Produto │  │  Negado"     │
    └────────┘  └──────────────┘
```

### Exclusão de Produto
```
Usuário Clica em "Excluir" (Produtos)
              │
              ▼
┌────────────────────────────┐
│ Verificar isFuncionario()  │
└────────┬──────────┬────────┘
         │          │
      Sim          Não
         │          │
         ▼          ▼
    ┌────────┐  ┌──────────────┐
    │ Mostrar│  │ Alert:       │
    │ Lista  │  │ "Acesso      │
    │ para   │  │  Negado"     │
    │Excluir │  └──────────────┘
    └────────┘
```

---

## 🔄 Fluxo de Logout

```
Usuário Clica em "Logout"
         │
         ▼
┌─────────────────────┐
│ Exibir Dialog de    │
│ Confirmação         │
└────────┬────────────┘
         │
    ┌────┴────┐
    │          │
  Sim         Não
    │          │
    ▼          ▼
┌────────────┐ ┌──────────┐
│ Chamar     │ │ Fechar   │
│ logout()   │ │ Dialog   │
└─────┬──────┘ └──────────┘
      │
      ▼
┌──────────────────┐
│ Limpar           │
│ AsyncStorage     │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Limpar           │
│ AuthContext      │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Ir para          │
│ LoginScreen      │
└──────────────────┘
```

---

## 🔑 Estrutura do Contexto

```
AuthContext
│
├── State
│   ├── usuarioLogado: {
│   │   id: string,
│   │   nome: string,
│   │   email: string,
│   │   cargo: "Gerente" | "Funcionário"
│   │ }
│   └── loading: boolean
│
├── Functions
│   ├── login(usuario)
│   ├── logout()
│   ├── isGerente() → boolean
│   ├── isFuncionario() → boolean
│   └── verificarUsuarioLogado()
│
└── Provider
    └── Envolve NavigationContainer
```

---

## 🚦 Matriz de Decisão de Acesso

```
┌──────────────────┬──────────────┬──────────────┬────────────────┐
│  Funcionalidade  │   Gerente    │ Funcionário  │   Não Logado   │
├──────────────────┼──────────────┼──────────────┼────────────────┤
│ Cadastro Usuário │      ✅      │ Redireciona  │   Acesso Negado│
│ Listar Usuário   │      ✅      │      ✅      │   Acesso Negado│
│ Alterar Usuário  │      ✅      │      ✅      │   Acesso Negado│
│ Excluir Usuário  │      ✅      │      ✅      │   Acesso Negado│
│ Cadastro Produto │ Acesso Negado│      ✅      │   Acesso Negado│
│ Listar Produto   │      ✅      │      ✅      │   Acesso Negado│
│ Alterar Produto  │      ✅      │      ✅      │   Acesso Negado│
│ Excluir Produto  │ Acesso Negado│      ✅      │   Acesso Negado│
│Cadastro Funcio.  │      ✅      │ Acesso Negado│   Acesso Negado│
└──────────────────┴──────────────┴──────────────┴────────────────┘
```

---

## 📱 Navegação entre Telas

```
                    LoginScreen
                         │
              (após login com sucesso)
                         │
                         ▼
    ┌────────────────────────────────────────────┐
    │            HomeScreen                       │
    │  ┌──────────────┐  ┌──────────────────┐   │
    │  │ Gerente vê:  │  │ Funcionário vê:  │   │
    │  ├──────────────┤  ├──────────────────┤   │
    │  │ Usuários     │  │ Produtos         │   │
    │  │ Produtos     │  │ Info Usuário     │   │
    │  │ Funcionários │  │ Logout           │   │
    │  │ Info Usuário │  └──────────────────┘   │
    │  │ Logout       │                         │
    │  └──────────────┘                         │
    └─────────────────┬──────────────────────────┘
                      │
    ┌─────────────────┼──────────────────┐
    │                 │                  │
    ▼                 ▼                  ▼
Cadastro         Listar            Alterar
(Gerente)        (Ambos)           (Ambos)
    │                 │                  │
    └─────────────────┼──────────────────┘
                      │
                      ▼
              (após operação)
              Voltar para HomeScreen
```

---

## 💾 Persistência com AsyncStorage

```
┌────────────────────────────────────┐
│      Ao fazer Login (Sucesso)       │
└────────────┬───────────────────────┘
             │
             ▼
    ┌────────────────────┐
    │ AsyncStorage       │
    │ .setItem(          │
    │  'usuarioLogado',  │
    │  JSON.stringify({  │
    │    id: "...",      │
    │    nome: "...",    │
    │    cargo: "..."    │
    │  })                │
    │ )                  │
    └────────┬───────────┘
             │
             ▼
    ┌────────────────────┐
    │ Ao abrir app       │
    │ (próxima vez)      │
    └────────┬───────────┘
             │
             ▼
    ┌────────────────────┐
    │ AsyncStorage       │
    │ .getItem(          │
    │  'usuarioLogado'   │
    │ )                  │
    └────────┬───────────┘
             │
    ┌────────┴────────┐
    │                 │
  Existe         Não existe
    │                 │
    ▼                 ▼
HomeScreen      LoginScreen
```

---

## 🔒 Verificação de Permissões

```
Na renderização de cada tela:

┌─────────────────────────────────┐
│ if (!usuarioLogado)             │
│   → Alert + Voltar + goBack()   │
└─────────────────────────────────┘
              ↓
┌─────────────────────────────────┐
│ if (!isGerente())               │
│   → Alert + Acesso Negado       │
└─────────────────────────────────┘
              ↓
┌─────────────────────────────────┐
│ if (!isFuncionario())           │
│   → Alert + Acesso Negado       │
└─────────────────────────────────┘
              ↓
┌─────────────────────────────────┐
│ Renderizar Conteúdo da Tela     │
└─────────────────────────────────┘
```

---

Esta documentação visual ajuda a entender o fluxo completo do sistema de autenticação e autorização implementado.
