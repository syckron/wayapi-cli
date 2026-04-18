# 🚀 WayAPI CLI

WayAPI CLI é um cliente de API minimalista e eficiente que roda diretamente no seu terminal. Construído com **React** e **Ink**, ele oferece uma interface interativa para realizar requisições HTTP sem precisar sair da linha de comando.

---

## 📸 Preview

![Demo](https://raw.githubusercontent.com/syckron/wayapi-cli/main/screenshots/demo.png)

---

## ✨ Funcionalidades

- 🎯 **Interface Interativa**  
  Interface interativa baseada em React renderizado no terminal via Ink.

- 🌐 **Suporte a Métodos HTTP**  
  GET, POST, PUT, PATCH e DELETE com seleção rápida.

- 📝 **Editor de Body**  
  Campo dedicado para envio de JSON em métodos de escrita.

- ⚡ **Auto-Preenchimento Inteligente**  
  Ao selecionar PUT ou PATCH e inserir uma URL, o CLI tenta buscar automaticamente os dados atuais para facilitar a edição.

- 📊 **Feedback em Tempo Real**  
  Visualização imediata de:
  - Status Code
  - Tempo de resposta (ms)
  - Headers
  - Corpo da resposta

- ✅ **Validação de JSON em Tempo Real**  
  O editor valida automaticamente o JSON digitado após alguns segundos de inatividade:
  - Indicação visual (borda verde/vermelha)
  - Mensagem de status (`ok` ou erro)
  - Feedback imediato para correção de sintaxe

---

## 📦 Instalação

### Via NPM / PNPM (Recomendado)

Instale globalmente e use direto no terminal:

```bash
pnpm add -g @syckron/wayapi-cli
```

ou com npm:

```bash
npm install -g @syckron/wayapi-cli
```

---

## ▶️ Uso

Após instalar, basta rodar:

```bash
wayapi
```

---

## ⌨️ Comandos e Atalhos

| Tecla | Ação |
|------|------|
| `Tab` | Alterna entre os campos |
| `Esc` | Fecha a aplicação |
| `1` | Visualiza o Body da resposta |
| `2` | Visualiza os Headers |
| `G` | Seleciona método GET |
| `P` | Seleciona método POST |
| `U` | Seleciona método PUT |
| `A` | Seleciona método PATCH |
| `D` | Seleciona método DELETE |
| `Enter` | Executa requisição (no campo URL) |

---

## 🛠️ Tecnologias Utilizadas

- **React & Ink** → Interface de terminal
- **Axios** → Requisições HTTP
- **TypeScript** → Tipagem estática

---

## 📁 Estrutura do Projeto

```
wayapi-cli/
├── src/
│   ├── components/
│   │   ├── Content.tsx        # Exibição dos resultados (Body/Headers)
│   │   ├── EditForm.tsx       # Campo de entrada para JSON/Body
│   │   ├── JsonViewer.tsx     # Cores do JSON
│   │   ├── Infos.tsx          # Display de Status e Performance
│   │   ├── MethodSelector.tsx # Seletor de verbos HTTP
│   │   └── RequestForm.tsx    # Campo de input da URL
│   ├── services/
│   │   └── api.ts             # Configuração do Axios
│   ├── utils/
│   │   └── typeGuards.ts      # Validadores de tipos e JSON
│   ├── types/
│   │   └── types.ts           # Interfaces globais
│   └── app.tsx                # Orquestrador principal
```

---

## 🧪 Desenvolvimento

```bash
git clone https://github.com/syckron/wayapi-cli.git
cd wayapi-cli
pnpm install
pnpm dev
```

---

## 🏗️ Build

```bash
pnpm build
```

---

## 📝 Notas de Implementação

- Debounce no input da URL para pré-carregamento em PUT/PATCH
- Validação de JSON em tempo real com feedback visual
- Tratamento de erros de rede e parsing

---

## 💡 Ideia do Projeto

O WayAPI CLI foi pensado para desenvolvedores que querem testar APIs de forma rápida, sem sair do terminal — com uma UX fluida e sem depender de ferramentas pesadas.

---

## 🔗 Links

- [GitHub](https://github.com/syckron/wayapi-cli)
- [NPM Package](https://www.npmjs.com/package/@syckron/wayapi-cli)

---

## 📌 Licença

Apache-2.0
