# Frontend App Template

Este projeto é um **boilerplate completo para aplicações frontend modernas** usando React 19, TanStack Router, TanStack Query, TailwindCSS, ESLint, Prettier, T3Env e Vitest. Desenvolvido especificamente para servir como base para projetos frontend da NS-Tech.

## 🚀 Principais Features

- ⚛️ **React 19** com JSX moderno e funcionalidades mais recentes
- 🔄 **TanStack Router**: File-based routing, devtools, layouts e navegação SPA
- 🔍 **TanStack Query**: Data fetching, cache inteligente, devtools e gerenciamento de estado servidor
- 🎨 **TailwindCSS v4**: Framework CSS utilitário para estilização rápida e responsiva
- 🛡️ **T3Env + Zod**: Variáveis de ambiente tipadas e validadas
- 📏 **ESLint/Prettier**: Padronização de código usando configurações do TanStack
- 🧪 **Vitest**: Testes unitários rápidos com ambiente jsdom
- 📱 **PWA Ready**: Manifest, ícones e configurações para Progressive Web App
- 🔧 **TypeScript**: Configuração moderna com strict mode e linting avançado

## 📦 Integração com NS-Tech Monorepo

Este template foi projetado para trabalhar perfeitamente com os pacotes do [nstech-front-monorepo](https://github.com/carneironline/nstech-front-monorepo). Você pode facilmente instalar qualquer um dos seguintes pacotes:

- **@ns-tech/config-eslint**: Configuração padronizada do ESLint
- **@ns-tech/config-prettier**: Configuração padronizada do Prettier
- **@ns-tech/config-tsconfig**: Configuração base do TypeScript
- **@ns-tech/config-i18n**: Sistema de internacionalização com i18next
- **@ns-tech/react-base**: Hooks React utilitários (useDebounce, useLocalStorage)
- **@ns-tech/ui**: Sistema de design de componentes UI (em desenvolvimento)

Para instruções detalhadas de instalação, consulte o [Guia de Instalação](https://github.com/carneironline/nstech-front-monorepo/blob/main/INSTALLATION_GUIDE.md).

### Exemplo de instalação de pacotes NS-Tech

```bash
# Configurações de desenvolvimento
pnpm add @ns-tech/config-eslint @ns-tech/config-prettier @ns-tech/config-tsconfig --save-dev

# Pacotes de produção
pnpm add @ns-tech/react-base @ns-tech/config-i18n

# Dependências peer necessárias
pnpm add react eslint eslint-plugin-react prettier typescript --save-dev
```

## 🏃‍♂️ Começando

### Instalação

```bash
pnpm install
```

### Desenvolvimento

```bash
pnpm run dev
```

A aplicação estará disponível em `http://localhost:3000`

### Build de Produção

```bash
pnpm run build
```

### Testes

Este projeto usa [Vitest](https://vitest.dev/) para testes unitários:

```bash
pnpm run test
```

## 📝 Scripts Disponíveis

- `pnpm run dev`: Inicia o servidor de desenvolvimento na porta 3000
- `pnpm run build`: Build de produção com verificação de tipos TypeScript
- `pnpm run serve`: Serve a versão de produção localmente
- `pnpm run test`: Executa testes com Vitest
- `pnpm run lint`: Verificação de lint com ESLint
- `pnpm run format`: Formatação com Prettier
- `pnpm run check`: Executa format + lint fix automaticamente

## 🏗️ Estrutura do Projeto

```bash
src/
├── components/          # Componentes reutilizáveis
│   └── Header.tsx      # Componente de navegação
├── integrations/       # Integrações com bibliotecas externas
│   └── tanstack-query/ # Setup do TanStack Query
├── routes/            # Rotas file-based do TanStack Router
│   ├── __root.tsx     # Layout raiz da aplicação
│   ├── index.tsx      # Página inicial
│   └── demo.tanstack-query.tsx # Demo do TanStack Query
├── env.ts             # Configuração de variáveis de ambiente
├── main.tsx           # Ponto de entrada da aplicação
├── routeTree.gen.ts   # Árvore de rotas gerada automaticamente
└── styles.css         # Estilos globais com TailwindCSS
```

## 🌍 Configuração de Ambiente

Este projeto usa **T3Env** para validação e tipagem das variáveis de ambiente:

- Variáveis de **cliente** devem começar com `VITE_`
- Variáveis de **servidor** não têm prefixo específico
- Configure em `.env` e acesse via `src/env.ts`

### Exemplo de uso

```typescript
import { env } from '@/env'

console.log(env.VITE_APP_TITLE) // Tipado e validado
```

## 🧭 Sistema de Roteamento

Este projeto utiliza **TanStack Router** com roteamento baseado em arquivos.

### Adicionando uma Nova Rota

Para adicionar uma nova rota, crie um arquivo em `./src/routes/`. O TanStack Router gerará automaticamente o conteúdo da rota.

### Navegação entre Rotas

Para navegação SPA, importe o componente `Link` do `@tanstack/react-router`:

```tsx
import { Link } from '@tanstack/react-router'

// Uso em componentes
;<Link to='/nova-rota'>Ir para Nova Rota</Link>
```

### Layout da Aplicação

O layout principal está localizado em `src/routes/__root.tsx`. Qualquer conteúdo adicionado aqui aparecerá em todas as rotas. O conteúdo específico da rota aparece onde o componente `<Outlet />` é usado.

## 📊 Gerenciamento de Estado e Data Fetching

### TanStack Query

O projeto inclui configuração completa do TanStack Query para gerenciamento de estado servidor:

```tsx
import { useQuery } from '@tanstack/react-query'

function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(res => res.json()),
    initialData: [],
  })

  if (isLoading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error.message}</div>

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### Hooks Utilitários (com pacotes NS-Tech)

Exemplo usando hooks do `@ns-tech/react-base`:

```tsx
import { useDebounce, useLocalStorage } from '@ns-tech/react-base'

function SearchComponent() {
  const [query, setQuery] = useLocalStorage('searchQuery', '')
  const debouncedQuery = useDebounce(query, 300)

  // A busca só executa após 300ms de inatividade
  useEffect(() => {
    if (debouncedQuery) {
      console.log('Buscando por:', debouncedQuery)
    }
  }, [debouncedQuery])

  return (
    <input
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder='Digite para buscar...'
    />
  )
}
```

## 🎨 Estilização

Este projeto usa [TailwindCSS v4](https://tailwindcss.com/) para estilização, já configurado e pronto para uso. Os estilos estão aplicados globalmente através do `src/styles.css`.

### Exemplo de uso do Tailwind

```tsx
function Button({ children }) {
  return (
    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
      {children}
    </button>
  )
}
```

## 🧪 Testes

O projeto usa **Vitest** para testes unitários com configuração otimizada para React:

- Ambiente: jsdom
- Globals: true (não precisa importar `describe`, `it`, `expect`)
- Configuração em `vite.config.ts`

### Exemplo de teste

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('deve renderizar corretamente', () => {
    render(<App />)
    expect(screen.getByText('Learn React')).toBeInTheDocument()
  })
})
```

## 📱 PWA (Progressive Web App)

O projeto inclui configuração básica para PWA:

- **Manifest**: `public/manifest.json` com ícones e configurações
- **Ícones**: Logo em múltiplos tamanhos (192px, 512px)
- **Service Worker**: Configuração básica via Vite

## 🔧 Configurações de Desenvolvimento

### ESLint

Configuração baseada no `@tanstack/eslint-config` em `eslint.config.js`.

### Prettier

Configuração personalizada em `prettier.config.js`:

- `semi: false` - Sem ponto e vírgula
- `singleQuote: true` - Aspas simples
- `trailingComma: 'all'` - Vírgula final

### TypeScript

Configuração moderna em `tsconfig.json`:

- Target: ES2022
- Module: ESNext
- JSX: react-jsx
- Strict mode habilitado
- Path mapping: `@/*` → `./src/*`

## 📖 Arquivos de Demonstração

O projeto inclui arquivos prefixados com `demo` que podem ser removidos com segurança. Eles servem como ponto de partida para explorar as funcionalidades instaladas:

- `src/routes/demo.tanstack-query.tsx`: Exemplo de uso do TanStack Query

## 🚀 Próximos Passos

1. **Personalize** as variáveis de ambiente em `src/env.ts`
2. **Adicione** rotas específicas do seu projeto em `src/routes/`
3. **Instale** pacotes adicionais do NS-Tech conforme necessário
4. **Configure** integração com backend/APIs
5. **Implemente** testes para seus componentes
6. **Customize** o manifest PWA com informações do seu projeto

## 📚 Recursos e Documentação

- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
- [TailwindCSS](https://tailwindcss.com)
- [Vitest](https://vitest.dev)
- [T3 Env](https://env.t3.gg)
- [Guia NS-Tech Monorepo](https://github.com/carneironline/nstech-front-monorepo/blob/main/INSTALLATION_GUIDE.md)
- **[Diretrizes Frontend NS-Tech](./DIRETRIZES_FRONTEND.md)**: Padrões e boas práticas completas

## 🤝 Contribuição

Este é um template base da NS-Tech. Para melhorias ou correções, abra uma issue ou pull request no repositório oficial.
