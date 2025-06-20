# Página de Oração

## Descrição
A página de Oração é um espaço dedicado para compartilhar pedidos de oração, testemunhos e gerenciar a agenda de orações da igreja.

## Funcionalidades
- Envio de pedidos de oração
- Compartilhamento de testemunhos
- Agenda de orações
- Moderação de conteúdo (para administradores)
- Contador de orações
- Animações e efeitos visuais
- Sistema de navegação por abas

## Componentes Utilizados
- `Card`: Containers de conteúdo
- `Button`: Botões de ação
- `Input`: Campos de entrada
- `Textarea`: Campo de pedido de oração
- `FloatingParticles`: Efeito visual de fundo
- `ModernNavigation`: Navegação por abas
- `PrayerCounter`: Contador de orações

## Estados
- `activeTab`: Aba ativa (pedidos/testemunhos/agenda)
- `nome`: Nome do solicitante
- `pedido`: Conteúdo do pedido
- `isSubmitting`: Estado de envio
- `showConfirmation`: Confirmação de envio

## Estrutura de Dados
1. Pedidos de Oração:
   ```typescript
   interface PedidoOracao {
     id: number;
     nome: string;
     pedido: string;
     oracoes: number;
     data: string;
   }
   ```

2. Testemunhos:
   ```typescript
   interface Testemunho {
     id: number;
     nome: string;
     testemunho: string;
     data: string;
   }
   ```

## Funcionalidades Principais
1. Pedidos de Oração:
   - Formulário de envio
   - Lista de pedidos ativos
   - Contador de orações
   - Feedback visual

2. Testemunhos:
   - Compartilhamento de experiências
   - Lista de testemunhos
   - Data de publicação

3. Agenda:
   - Programação de orações
   - Lembretes
   - Participantes

4. Moderação (Admin):
   - Aprovação de pedidos
   - Gerenciamento de conteúdo
   - Controle de acesso

## Acessibilidade
- Navegação por teclado
- Labels semânticos
- Contraste adequado
- Textos alternativos
- Estrutura semântica

## Estilização
- Design moderno com gradientes
- Animações suaves
- Efeitos de hover
- Layout responsivo
- Tema escuro com elementos translúcidos
- Partículas animadas no fundo

## Integrações
- Framer Motion para animações
- Context API para estado global
- Sistema de notificações
- Gerenciamento de datas

## Segurança
- Validação de dados
- Controle de acesso
- Sanitização de inputs
- Proteção contra XSS
- Verificação de permissões 