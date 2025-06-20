# Página de Login

## Descrição
A página de Login é responsável por autenticar os usuários no sistema, permitindo que eles acessem suas contas através de email e senha.

## Funcionalidades
- Autenticação de usuários com email e senha
- Visualização/ocultação da senha
- Recuperação de senha
- Redirecionamento para cadastro de novos usuários
- Feedback visual durante o processo de login
- Tratamento de erros de autenticação

## Componentes Utilizados
- `Button`: Botões de ação e navegação
- `Input`: Campos de entrada de texto
- `Card`: Container principal do formulário
- `Alert`: Exibição de mensagens de erro
- `Toast`: Notificações de feedback

## Estados
- `email`: Armazena o email do usuário
- `password`: Armazena a senha do usuário
- `showPassword`: Controla a visibilidade da senha
- `isLoading`: Indica se o processo de login está em andamento
- `error`: Armazena mensagens de erro

## Fluxo de Autenticação
1. Usuário preenche email e senha
2. Sistema valida as credenciais com o Supabase
3. Em caso de sucesso:
   - Usuário é redirecionado para a página inicial
   - Uma notificação de sucesso é exibida
4. Em caso de erro:
   - Uma mensagem de erro é exibida
   - O usuário pode tentar novamente

## Acessibilidade
- Labels semânticos para todos os campos
- Mensagens de erro acessíveis
- Suporte a navegação por teclado
- Indicadores de estado para leitores de tela

## Estilização
- Design moderno com gradientes
- Efeitos de hover e focus
- Feedback visual durante interações
- Layout responsivo
- Tema escuro com elementos translúcidos

## Integrações
- Supabase Auth para autenticação
- React Router para navegação
- Context API para gerenciamento de estado de autenticação 