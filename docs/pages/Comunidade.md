# Página de Comunidade

## Descrição
A página de Comunidade é um hub central para interação e informação da igreja, contendo seções para ministérios, comunicados, galeria de fotos e contatos importantes.

## Funcionalidades
- Visualização de ministérios e suas informações
- Sistema de comunicados e anúncios
- Galeria de fotos de eventos
- Lista de contatos importantes
- Filtros para navegação entre seções
- Animações e efeitos visuais
- Upload de fotos (para administradores)
- Criação de comunicados (para administradores)

## Componentes Utilizados
- `Card`: Containers de informações
- `Badge`: Indicadores de status
- `Button`: Botões de ação
- `Input`: Campos de entrada
- `Textarea`: Campos de texto longo
- `Switch`: Toggles para opções
- `FloatingParticles`: Efeito visual de fundo

## Estados
- `activeFilter`: Controla a seção ativa
- `newComunicadoTitulo`: Título do novo comunicado
- `newComunicadoConteudo`: Conteúdo do novo comunicado
- `newComunicadoUrgente`: Status de urgência do comunicado
- `newFotoTitulo`: Título da nova foto
- `newFotoFile`: Arquivo da nova foto

## Seções Principais
1. Ministérios:
   - Lista de ministérios ativos
   - Informações de liderança
   - Cronograma de atividades
   - Contatos específicos

2. Comunicados:
   - Anúncios importantes
   - Eventos futuros
   - Notícias da igreja
   - Indicador de urgência

3. Galeria:
   - Fotos de eventos
   - Upload de novas fotos
   - Organização por data
   - Visualização em grid

4. Contatos:
   - Lista de contatos importantes
   - Informações de contato
   - Cargos e responsabilidades

## Acessibilidade
- Navegação por teclado
- Textos alternativos para imagens
- Estrutura semântica
- Contraste adequado
- Feedback visual de interações

## Estilização
- Design moderno com gradientes
- Animações suaves
- Efeitos de hover
- Layout responsivo
- Tema escuro com elementos translúcidos
- Partículas animadas no fundo

## Integrações
- Framer Motion para animações
- Sistema de upload de arquivos
- Gerenciamento de estado com Context API
- Sistema de notificações

## Segurança
- Controle de acesso por função
- Validação de uploads
- Sanitização de inputs
- Proteção contra XSS
- Verificação de permissões 