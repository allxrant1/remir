# Página de Perfil

## Descrição
A página de Perfil permite que usuários visualizem e editem suas informações pessoais, além de gerenciar sua conta.

## Funcionalidades
- Visualização de dados do perfil
- Edição de informações pessoais
- Logout da conta
- Validação de campos
- Feedback visual durante edições
- Proteção de rota (requer autenticação)

## Componentes Utilizados
- `Button`: Botões de ação e navegação
- `Input`: Campos de entrada de dados
- `Card`: Containers de informações
- `Label`: Labels para campos
- `Toast`: Notificações de feedback

## Estados
- `editando`: Controla o modo de edição
- `dadosUsuario`: Objeto contendo os dados do usuário
  - `nome`: Nome do usuário
  - `sobrenome`: Sobrenome do usuário
  - `email`: Email do usuário
  - `telefone`: Telefone do usuário
  - `dataNascimento`: Data de nascimento
  - `endereco`: Endereço completo

## Fluxo de Funcionamento
1. Carregamento inicial:
   - Verifica autenticação do usuário
   - Carrega dados do perfil
   - Redireciona para login se não autenticado
2. Modo de visualização:
   - Exibe dados do usuário
   - Permite ativar modo de edição
3. Modo de edição:
   - Permite modificar campos
   - Valida alterações
   - Salva ou cancela mudanças
4. Logout:
   - Confirma saída
   - Limpa dados da sessão
   - Redireciona para login

## Acessibilidade
- Labels semânticos para campos
- Estados de foco visíveis
- Suporte a navegação por teclado
- Indicadores de estado para leitores de tela
- Mensagens de feedback acessíveis

## Estilização
- Design moderno com gradientes
- Efeitos de hover e focus
- Feedback visual durante interações
- Layout responsivo
- Tema escuro com elementos translúcidos
- Ícones intuitivos

## Integrações
- Context API para gerenciamento de estado
- React Router para navegação
- Sistema de notificações Toast
- Supabase para dados do usuário

## Segurança
- Proteção de rota
- Validação de dados
- Sanitização de inputs
- Gerenciamento seguro de sessão
- Logout seguro 