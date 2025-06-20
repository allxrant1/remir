# Página de Mensagens

## Descrição
A página de Mensagens é uma biblioteca digital de pregações e estudos, permitindo que os usuários acessem, pesquisem e organizem o conteúdo de forma eficiente.

## Funcionalidades
- Visualização de mensagens em cards
- Sistema de busca por título e pastor
- Filtros por categoria e status
- Reprodução de áudio
- Compartilhamento de mensagens
- Favoritar mensagens
- Animações e efeitos visuais

## Componentes Utilizados
- `Card`: Containers de mensagens
- `Button`: Botões de ação
- `Input`: Campo de busca
- `FloatingParticles`: Efeito visual de fundo
- `MessageFilters`: Navegação por filtros
- `AnimatePresence`: Animações de transição

## Estados
- `activeFilter`: Filtro ativo
- `searchTerm`: Termo de busca
- `mensagens`: Lista de mensagens disponíveis

## Estrutura de Mensagem
```typescript
interface Mensagem {
  id: number;
  titulo: string;
  pastor: string;
  data: string;
  duracao: string;
  visualizacoes: string;
  favorito: boolean;
  thumbnail: string;
}
```

## Funcionalidades Principais
1. Busca e Filtros:
   - Busca por texto
   - Filtro por categoria
   - Filtro por data
   - Filtro por favoritos

2. Visualização:
   - Cards com thumbnails
   - Informações detalhadas
   - Estatísticas de visualização
   - Duração da mensagem

3. Interação:
   - Reprodução de áudio
   - Compartilhamento
   - Favoritar mensagens
   - Feedback visual

4. Organização:
   - Categorização por temas
   - Ordenação por data
   - Agrupamento por séries
   - Filtros personalizados

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
- Sistema de áudio
- Compartilhamento social
- Gerenciamento de favoritos

## Segurança
- Validação de dados
- Controle de acesso
- Sanitização de inputs
- Proteção contra XSS
- Verificação de permissões 