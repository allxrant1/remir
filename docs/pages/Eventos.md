# Página de Eventos

## Descrição
A página de Eventos gerencia e exibe todos os eventos da igreja, permitindo visualização, filtragem e gerenciamento de eventos programados.

## Funcionalidades
- Visualização de eventos em grid ou lista
- Filtros por categoria, data e pesquisa
- Estatísticas de eventos
- Criação de novos eventos
- Detalhes completos de cada evento
- Contagem de participantes
- Visualização responsiva

## Componentes Utilizados
- `Card`: Containers de eventos
- `Button`: Botões de ação
- `Input`: Campos de pesquisa
- `Select`: Filtros de categoria
- `Table`: Visualização em lista
- `Grid`: Visualização em grid
- `Modal`: Criação de eventos

## Estados
- `eventos`: Lista de eventos
- `viewMode`: Modo de visualização (grid/list)
- `filtros`: Objeto com filtros ativos
  - `categoria`: Filtro por categoria
  - `data`: Filtro por data
  - `pesquisa`: Termo de busca
- `showModal`: Controle do modal de criação
- `novoEvento`: Dados do evento sendo criado

## Estrutura de Evento
```typescript
interface Evento {
  id: string;
  titulo: string;
  categoria: 'workshop' | 'palestra' | 'curso' | 'hackathon' | 'mentoria';
  data: string;
  local: string;
  participantes: number;
  descricao: string;
}
```

## Funcionalidades Principais
1. Filtragem:
   - Por categoria
   - Por data
   - Por termo de pesquisa
   - Filtros rápidos

2. Visualização:
   - Modo grid com cards
   - Modo lista com tabela
   - Detalhes expandidos
   - Informações resumidas

3. Estatísticas:
   - Total de eventos
   - Eventos do dia
   - Próximos 7 dias
   - Total de participantes

4. Gerenciamento:
   - Criação de eventos
   - Edição de eventos
   - Exclusão de eventos
   - Controle de participantes

## Acessibilidade
- Navegação por teclado
- Labels semânticos
- Contraste adequado
- Textos alternativos
- Estrutura semântica

## Estilização
- Design moderno e limpo
- Cards com sombras
- Indicadores visuais de status
- Layout responsivo
- Animações suaves
- Cores temáticas por categoria

## Integrações
- Context API para estado global
- Sistema de notificações
- Gerenciamento de datas
- Validação de formulários

## Segurança
- Validação de dados
- Controle de acesso
- Sanitização de inputs
- Proteção contra XSS
- Verificação de permissões 