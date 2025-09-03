# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

# Memória Coder — Naruto (React + Vite)

Um jogo da memória em React 18 com tema Naruto, seguindo o PRD incluso neste repositório.

Recursos:
- Componentes modulares (Header, GameBoard, Card, ScorePanel)
- Hooks modernos (useState, useEffect)
- Lógica extraída para utils (embaralhar e geração de cartas)
- Animação 3D de flip via CSS
- Layout responsivo

Como executar:
1. Instale as dependências.
2. Inicie o servidor de desenvolvimento.

Estrutura principal (src/):
- components/ — UI do jogo
- utils/ — lógica pura (shuffle, generateCards)
- assets/naruto — ícones simples SVG para as cartas

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
