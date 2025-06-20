# Página de Cadastro

## Descrição
A página de Cadastro permite que novos usuários criem suas contas no sistema, fornecendo informações básicas como nome, email e senha.

## Funcionalidades
- Cadastro de novos usuários
- Validação de campos obrigatórios
- Confirmação de senha
- Visualização/ocultação de senha
- Feedback visual durante o processo de cadastro
- Tratamento de erros de validação
- Redirecionamento após cadastro bem-sucedido

## Componentes Utilizados
- `Button`: Botões de ação e navegação
- `Input`: Campos de entrada de texto
- `Card`: Container principal do formulário
- `Alert`: Exibição de mensagens de erro
- `Toast`: Notificações de feedback

## Estados
- `formData`: Objeto contendo os dados do formulário
  - `name`: Nome completo do usuário
  - `email`: Email do usuário
  - `password`: Senha do usuário
  - `confirmPassword`: Confirmação da senha
- `loading`: Indica se o processo de cadastro está em andamento
- `error`: Armazena mensagens de erro
- `showPassword`: Controla a visibilidade da senha
- `showConfirmPassword`: Controla a visibilidade da confirmação de senha

## Fluxo de Cadastro
1. Usuário preenche os campos do formulário
2. Sistema valida os dados:
   - Verifica se as senhas coincidem
   - Valida o formato do email
   - Verifica se a senha tem pelo menos 6 caracteres
3. Em caso de sucesso:
   - Cria o usuário no Supabase Auth
   - Envia email de confirmação
   - Redireciona para a página de login
4. Em caso de erro:
   - Exibe mensagem de erro apropriada
   - Permite que o usuário corrija os dados

## Acessibilidade
- Labels semânticos para todos os campos
- Mensagens de erro acessíveis
- Suporte a navegação por teclado
- Indicadores de estado para leitores de tela
- Textos alternativos para ícones

## Estilização
- Design moderno com gradientes
- Efeitos de hover e focus
- Feedback visual durante interações
- Layout responsivo
- Tema escuro com elementos translúcidos
- Ícones intuitivos para cada campo

## Integrações
- Supabase Auth para criação de usuários
- React Router para navegação
- Context API para gerenciamento de estado
- Sistema de notificações Toast 