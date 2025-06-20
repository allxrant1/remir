# REMIR - Sistema de Gestão de Ministérios

## Visão Geral
O REMIR é um sistema moderno de gestão de ministérios desenvolvido para a Igreja REMIR. Oferece uma plataforma completa para gerenciamento de membros, escalas, eventos e ministérios, com foco em usabilidade e experiência do usuário.

## Funcionalidades Principais

### Autenticação e Perfil
- Login seguro
- Cadastro de novos membros
- Recuperação de senha
- Gerenciamento de perfil
- Proteção de rotas

### Gestão de Escalas
- Visualização de compromissos
- Confirmação de presença
- Gerenciamento de ministérios
- Notificações de escala
- Histórico de participação

### Interface Moderna
- Design responsivo
- Tema escuro elegante
- Animações suaves
- Feedback visual claro
- Acessibilidade

## Tecnologias Utilizadas

### Frontend
- React com TypeScript
- Tailwind CSS
- Lucide Icons
- Componentes UI personalizados
- Sistema de toast
- Contexto de autenticação

### Backend
- Supabase
- Autenticação segura
- Banco de dados PostgreSQL
- API RESTful
- Armazenamento em nuvem

## Estrutura do Projeto

### Páginas
- Login
- Cadastro
- Recuperação de Senha
- Meu Perfil
- Minha Escala

### Componentes
- UI Components
- Layout Components
- Form Components
- Feedback Components

### Contextos
- AuthContext
- ThemeContext
- NotificationContext

## Documentação

### Páginas
- [Login](docs/Login.md)
- [Cadastro](docs/Cadastro.md)
- [Recuperação de Senha](docs/RecuperarSenha.md)
- [Meu Perfil](docs/MeuPerfil.md)
- [Minha Escala](docs/MinhaEscala.md)

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/remir-lovable-design-system.git
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Contribuição
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Segurança
- Autenticação segura
- Proteção de rotas
- Validação de dados
- Criptografia
- Sanitização de inputs

## Acessibilidade
- ARIA labels
- Roles semânticos
- Navegação por teclado
- Textos alternativos
- Contraste adequado

## Roadmap
- [ ] Sistema de notificações
- [ ] Calendário integrado
- [ ] Relatórios avançados
- [ ] App mobile
- [ ] Integração com WhatsApp
- [ ] Sistema de feedback
- [ ] Gestão de eventos
- [ ] Portal do líder

## Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato
Igreja REMIR - [contato@remir.com.br](mailto:contato@remir.com.br)

## Agradecimentos
- Equipe de desenvolvimento
- Comunidade REMIR
- Contribuidores
- Suporte técnico
