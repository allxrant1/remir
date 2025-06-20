# Página de Recuperação de Senha

## Descrição
A página de Recuperação de Senha permite que usuários que esqueceram suas senhas possam solicitar um email com instruções para redefinição.

## Funcionalidades
- Solicitação de recuperação de senha via email
- Validação do email fornecido
- Feedback visual durante o processo
- Redirecionamento após envio do email
- Tratamento de erros de envio

## Componentes Utilizados
- `Button`: Botões de ação e navegação
- `Input`: Campo de entrada de email
- `Card`: Container principal do formulário
- `Alert`: Exibição de mensagens de sucesso
- `Toast`: Notificações de feedback

## Estados
- `email`: Armazena o email do usuário
- `loading`: Indica se o processo de envio está em andamento
- `success`: Indica se o email foi enviado com sucesso

## Fluxo de Recuperação
1. Usuário insere seu email
2. Sistema envia email de recuperação:
   - Valida o email fornecido
   - Envia email com link de redefinição
   - Configura redirecionamento após redefinição
3. Em caso de sucesso:
   - Exibe mensagem de confirmação
   - Mostra o email para onde foi enviado
4. Em caso de erro:
   - Exibe mensagem de erro apropriada
   - Permite nova tentativa

## Acessibilidade
- Labels semânticos para campos
- Mensagens de status acessíveis
- Suporte a navegação por teclado
- Indicadores de estado para leitores de tela
- Textos alternativos para ícones

## Estilização
- Design moderno com gradientes
- Efeitos de hover e focus
- Feedback visual durante interações
- Layout responsivo
- Tema escuro com elementos translúcidos
- Ícones intuitivos

## Integrações
- Supabase Auth para recuperação de senha
- React Router para navegação
- Sistema de notificações Toast
- Configuração de redirecionamento após redefinição

## Segurança
- Validação do email antes do envio
- Link de redefinição com tempo limitado
- Redirecionamento seguro após redefinição
- Proteção contra spam de emails 