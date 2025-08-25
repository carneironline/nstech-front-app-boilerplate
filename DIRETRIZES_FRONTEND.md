# Diretrizes para Desenvolvimento Frontend - NS-Tech

Este documento estabelece as diretrizes e padrões para desenvolvimento frontend na NS-Tech, baseado no boilerplate `nstech-front-app-boilerplate` e no ecossistema de pacotes do [`nstech-front-monorepo`](https://github.com/carneironline/nstech-front-monorepo).

## 📋 Índice

1. [Stack Tecnológica](#-stack-tecnológica)
2. [Estrutura de Projeto](#-estrutura-de-projeto)
3. [Configuração e Setup](#-configuração-e-setup)
4. [Padrões de Código](#-padrões-de-código)
5. [Componentes e Reutilização](#-componentes-e-reutilização)
6. [Gerenciamento de Estado](#-gerenciamento-de-estado)
7. [Roteamento e Navegação](#-roteamento-e-navegação)
8. [Internacionalização](#-internacionalização)
9. [Estilização](#-estilização)
10. [Testes](#-testes)
11. [Performance e Otimização](#-performance-e-otimização)
12. [Workflow de Desenvolvimento](#-workflow-de-desenvolvimento)
13. [Configuração do Editor](#-configuração-do-editor)

## 🚀 Stack Tecnológica

### Core Technologies

| Tecnologia          | Versão | Propósito               |
| ------------------- | ------ | ----------------------- |
| **React**           | 19+    | Framework principal     |
| **TypeScript**      | 5.7+   | Tipagem estática        |
| **Vite**            | 6+     | Build tool e dev server |
| **TanStack Router** | 1.130+ | File-based routing      |
| **TanStack Query**  | 5.66+  | Data fetching e cache   |
| **TailwindCSS**     | 4+     | Framework CSS           |
| **Vitest**          | 3+     | Testing framework       |

### NS-Tech Packages

Sempre utilize os pacotes padronizados do monorepo NS-Tech:

```bash
# Configurações de desenvolvimento
pnpm add @ns-tech/config-eslint @ns-tech/config-prettier @ns-tech/config-tsconfig --save-dev

# Pacotes de produção
pnpm add @ns-tech/react-base @ns-tech/config-i18n
```

**Pacotes Disponíveis:**

- `@ns-tech/config-eslint`: Configuração padronizada ESLint
- `@ns-tech/config-prettier`: Configuração Prettier
- `@ns-tech/config-tsconfig`: TypeScript base config
- `@ns-tech/config-i18n`: Sistema i18n com i18next
- `@ns-tech/react-base`: Hooks utilitários
- `@ns-tech/ui-design-system`: Sistema de design (em desenvolvimento)

## 🏗️ Estrutura de Projeto

### Estrutura Padrão

```bash
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes de UI base
│   └── feature/        # Componentes específicos de feature
├── hooks/              # Custom hooks
├── integrations/       # Integrações com bibliotecas externas
│   ├── tanstack-query/ # Setup TanStack Query
│   └── api/           # Configurações de API
├── lib/               # Utilitários e helpers
├── locales/          # Arquivos de tradução
│   ├── en/
│   └── pt-BR/
├── routes/           # Rotas file-based (TanStack Router)
│   ├── __root.tsx    # Layout raiz
│   └── index.tsx     # Página inicial
├── types/            # Definições de tipos TypeScript
├── env.ts            # Configuração de ambiente (T3Env)
├── i18n.ts           # Setup internacionalização
├── main.tsx          # Entry point
└── styles.css        # Estilos globais
```

### Convenções de Nomenclatura

- **Componentes**: PascalCase (`Header.tsx`, `UserProfile.tsx`)
- **Hooks**: camelCase com prefixo `use` (`useAuth.ts`, `useDebounce.ts`)
- **Utilitários**: camelCase (`formatDate.ts`, `apiClient.ts`)
- **Tipos**: PascalCase (`User.ts`, `ApiResponse.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

## ⚙️ Configuração e Setup

### Inicialização de Projeto

1. **Clone o boilerplate:**

```bash
git clone [boilerplate-repo] meu-projeto
cd meu-projeto
pnpm install
```

2. **Configure variáveis de ambiente:**

```bash
# .env.local
VITE_APP_TITLE="Minha Aplicação"
VITE_API_URL="https://api.exemplo.com"
```

3. **Personalize configurações:**
   - Atualize `package.json` (nome, versão, descrição)
   - Configure `src/env.ts` com suas variáveis
   - Ajuste `public/manifest.json` para PWA

### Configurações Obrigatórias

#### ESLint (`eslint.config.js`)

```javascript
import { tanstackConfig } from '@tanstack/eslint-config'

export default [...tanstackConfig]
```

#### Prettier (`prettier.config.js`)

```javascript
const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
}

export default config
```

#### TypeScript (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "jsx": "react-jsx",
    "module": "ESNext",
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 📝 Padrões de Código

### TypeScript

**✅ Sempre faça:**

- Use tipos explícitos em props de componentes
- Defina interfaces para objetos complexos
- Use `const` assertions quando apropriado
- Implemente tratamento de erros tipado

```tsx
// ✅ Bom
interface UserProps {
  user: User
  onUserUpdate: (user: User) => Promise<void>
}

const UserComponent: React.FC<UserProps> = ({ user, onUserUpdate }) => {
  // implementation
}

// ❌ Evite
const UserComponent = ({ user, onUserUpdate }) => {
  // implementation sem tipos
}
```

### Componentes React

**✅ Padrões recomendados:**

```tsx
// Componente funcional com tipos explícitos
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
}) => {
  return (
    <button className={`btn btn-${variant} btn-${size}`} onClick={onClick}>
      {children}
    </button>
  )
}
```

### Hooks Customizados

Use hooks do `@ns-tech/react-base` quando disponíveis:

```tsx
import { useDebounce, useLocalStorage } from '@ns-tech/react-base'

function SearchComponent() {
  const [query, setQuery] = useLocalStorage('searchQuery', '')
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery) {
      // Executar busca
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

## 🧱 Componentes e Reutilização

### Hierarquia de Componentes

1. **Componentes Base (`src/components/ui/`)**: Botões, inputs, modals
2. **Componentes de Feature (`src/components/feature/`)**: Específicos de domínio
3. **Layouts**: Estruturas de página reutilizáveis
4. **Pages**: Componentes de página específicos

### Padrão de Composição

```tsx
// Componente base reutilizável
export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className='bg-white rounded-lg shadow-md p-4'>{children}</div>
)

// Composição específica
export const UserCard: React.FC<{ user: User }> = ({ user }) => (
  <Card>
    <h3>{user.name}</h3>
    <p>{user.email}</p>
  </Card>
)
```

## 🔄 Gerenciamento de Estado

### TanStack Query (Estado Servidor)

**✅ Padrão recomendado:**

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Query
const { data, isLoading, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => fetchUser(userId),
  enabled: !!userId,
})

// Mutation
const queryClient = useQueryClient()
const updateUserMutation = useMutation({
  mutationFn: updateUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})
```

### Estado Local

Para estado local simples, use `useState`. Para estado complexo, considere:

```tsx
// Estado simples
const [isOpen, setIsOpen] = useState(false)

// Estado persistente
const [settings, setSettings] = useLocalStorage('userSettings', defaultSettings)

// Estado complexo
const [state, dispatch] = useReducer(reducer, initialState)
```

## 🧭 Roteamento e Navegação

### TanStack Router - File-based

**Estrutura de rotas:**

```bash
src/routes/
├── __root.tsx          # Layout principal
├── index.tsx           # /
├── about.tsx           # /about
├── users/
│   ├── index.tsx       # /users
│   └── $userId.tsx     # /users/:userId
└── dashboard/
    ├── _layout.tsx     # Layout do dashboard
    └── index.tsx       # /dashboard
```

**Exemplo de rota:**

```tsx
// src/routes/users/$userId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$userId')({
  component: UserDetail,
  loader: ({ params }) => fetchUser(params.userId),
})

function UserDetail() {
  const { userId } = Route.useParams()
  const user = Route.useLoaderData()

  return <div>User: {user.name}</div>
}
```

**Navegação:**

```tsx
import { Link, useNavigate } from '@tanstack/react-router'

// Link declarativo
;<Link to='/users/$userId' params={{ userId: '123' }}>
  Ver usuário
</Link>

// Navegação programática
const navigate = useNavigate()
navigate({ to: '/dashboard' })
```

## 🌍 Internacionalização

### Configuração com @ns-tech/config-i18n

```tsx
// src/i18n.ts
import { initI18n } from '@ns-tech/config-i18n'
import pt from './locales/pt-BR/common.json'
import en from './locales/en/common.json'

export const i18nInstance = initI18n(
  {
    'pt-BR': { translation: pt },
    en: { translation: en },
  },
  'pt-BR', // idioma padrão
)

// src/main.tsx
import { I18nProvider } from '@ns-tech/config-i18n'
import { i18nInstance } from './i18n'

root.render(
  <I18nProvider i18nInstance={i18nInstance}>
    <App />
  </I18nProvider>,
)
```

### Uso em Componentes

```tsx
import { useTranslation } from '@ns-tech/config-i18n'

function WelcomeMessage() {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('greeting', { name: 'João' })}</p>
    </div>
  )
}

// Componente de troca de idioma
function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <select value={i18n.language} onChange={e => i18n.changeLanguage(e.target.value)}>
      <option value='pt-BR'>Português</option>
      <option value='en'>English</option>
    </select>
  )
}
```

### Estrutura de Arquivos de Tradução

```json
// src/locales/pt-BR/common.json
{
  "welcome": "Bem-vindo",
  "greeting": "Olá, {{name}}!",
  "buttons": {
    "save": "Salvar",
    "cancel": "Cancelar"
  }
}
```

## 🎨 Estilização

### TailwindCSS 4

**Configuração base (`src/styles.css`):**

```css
@import 'tailwindcss';

/* Custom utilities */
@layer utilities {
  .btn {
    @apply px-4 py-2 rounded font-medium transition-colors;
  }

  .btn-primary {
    @apply bg-blue-600 text-white hover:bg-blue-700;
  }
}
```

### Padrões de Classes

**✅ Recomendado:**

```tsx
// Classes ordenadas: layout → visual → interação
<button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2">
  Botão
</button>

// Use utilitários customizados
<button className="btn btn-primary">
  Botão
</button>
```

**❌ Evite:**

```tsx
// Classes misturadas sem ordem
<button className='text-white bg-blue-600 hover:bg-blue-700 px-4 rounded py-2'>Botão</button>
```

### Responsividade

```tsx
// Mobile-first approach
<div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
  Content
</div>

// Grid responsivo
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Item key={item.id} />)}
</div>
```

## 🧪 Testes

### Configuração Vitest

```typescript
// vite.config.ts
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
  },
})
```

### Padrões de Teste

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('deve renderizar com o texto correto', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('deve chamar onClick quando clicado', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Testes de Hooks

```tsx
import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('deve incrementar o valor', () => {
    const { result } = renderHook(() => useCounter(0))

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })
})
```

## ⚡ Performance e Otimização

### Code Splitting

```tsx
// Lazy loading de componentes
const Dashboard = lazy(() => import('./pages/Dashboard'))

function App() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Dashboard />
    </Suspense>
  )
}
```

### Memoização

```tsx
import { memo, useMemo, useCallback } from 'react'

// Componente memoizado
const ExpensiveComponent = memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({ ...item, processed: true }))
  }, [data])

  return <div>{/* render */}</div>
})

// Hook com useCallback
function useApiCall() {
  const fetchData = useCallback(async (id: string) => {
    const response = await fetch(`/api/data/${id}`)
    return response.json()
  }, [])

  return { fetchData }
}
```

### Otimização de Imagens

```tsx
// Lazy loading nativo
<img
  src="image.jpg"
  alt="Descrição"
  loading="lazy"
  className="w-full h-auto"
/>

// Responsive images
<picture>
  <source media="(min-width: 768px)" srcSet="image-large.jpg" />
  <img src="image-small.jpg" alt="Descrição" />
</picture>
```

## 🔄 Workflow de Desenvolvimento

### Scripts Padronizados

```json
{
  "scripts": {
    "dev": "vite --port 3000",
    "build": "vite build && tsc",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint src --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write .",
    "check": "prettier --write . && eslint --fix"
  }
}
```

### Git Workflow

1. **Commits semânticos:**

```bash
feat: adiciona componente de busca
fix: corrige validação de formulário
docs: atualiza documentação da API
style: ajusta formatação do código
refactor: reorganiza estrutura de pastas
test: adiciona testes para hook useAuth
```

2. **Pre-commit hooks:**

```bash
# Instalar husky
pnpm add --save-dev husky lint-staged

# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm run check && pnpm run test
```

### Processo de Code Review

1. ✅ **Verificar antes do PR:**
   - Testes passando
   - Lint sem erros
   - Build funcionando
   - Documentação atualizada

2. ✅ **Critérios de revisão:**
   - Código segue padrões estabelecidos
   - Componentes são reutilizáveis
   - Performance adequada
   - Acessibilidade considerada

## 🛠️ Configuração do Editor

### VS Code (Recomendado)

**Extensões obrigatórias:**

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

**Configurações (`.vscode/settings.json`):**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.includePackageJsonAutoImports": "auto",
  "tailwindCSS.experimental.classRegex": [["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]]
}
```

### Snippets Úteis

```json
// .vscode/snippets.json
{
  "React Component": {
    "prefix": "rfc",
    "body": [
      "interface ${1:Component}Props {",
      "  ${2:prop}: ${3:string}",
      "}",
      "",
      "export const ${1:Component}: React.FC<${1:Component}Props> = ({ ${2:prop} }) => {",
      "  return (",
      "    <div>",
      "      ${4:// content}",
      "    </div>",
      "  )",
      "}"
    ]
  }
}
```

## 📚 Recursos e Referências

### Documentação Oficial

- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
- [TailwindCSS](https://tailwindcss.com)
- [Vitest](https://vitest.dev)
- [T3 Env](https://env.t3.gg)

### NS-Tech Resources

- [Monorepo NS-Tech](https://github.com/carneironline/nstech-front-monorepo)
- [Guia de Instalação](https://github.com/carneironline/nstech-front-monorepo/blob/main/INSTALLATION_GUIDE.md)

### Ferramentas de Desenvolvimento

- [React DevTools](https://react.dev/learn/react-developer-tools)
- [TanStack Query DevTools](https://tanstack.com/query/latest/docs/react/devtools)
- [TanStack Router DevTools](https://tanstack.com/router/latest/docs/framework/react/devtools)

---

## 🎯 Conclusão

Estas diretrizes garantem:

- **Consistência** entre projetos
- **Qualidade** de código padronizada
- **Produtividade** com ferramentas otimizadas
- **Manutenibilidade** a longo prazo
- **Escalabilidade** para equipes

Para dúvidas ou sugestões de melhorias nestas diretrizes, abra uma issue no repositório do monorepo NS-Tech.
