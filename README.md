<div align="center">
	<img src="./src/assets/naruto/Banner.svg" alt="Banner – Memória Coder Naruto" width="100%"/>
	<br/>
	<a href="https://naruto-jogo-da-memoria.netlify.app">
		<img src="https://img.shields.io/badge/Live%20Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify" alt="Live Demo"/>
	</a>
</div>

## Memória Coder — Naruto (React + Vite)

Jogo da memória construído com React 18+ e Vite, tema Naruto, animação 3D nas cartas e arquitetura modular.

### Executável (demo online)

Acesse a versão publicada: https://naruto-jogo-da-memoria.netlify.app

## Como rodar o projeto

Pré-requisitos: Node 18+ e npm.

Desenvolvimento (hot reload):

```powershell
cd "d:\leo\Projetos\🎮 Jogo da Memória"
npm install
npm run dev -- --host
```

Build de produção e preview local:

```powershell
npm run clean
npm run build
npm run preview
```

## Features principais

- Geração e embaralhamento de cartas (utils dedicados)
- Mecânica de jogo: vira 2 cartas, confere par, desvira após 1s se não combinar
- Trava de interação enquanto anima (evita cliques extras)
- HUD com contador de jogadas e cronômetro que inicia no primeiro clique
- Reinício do jogo (reset total de estados)
- Mensagem de vitória ao finalizar todos os pares
- Animação 3D de flip com CSS (transform/transition)
- Layout responsivo (grid 4 colunas desktop, 3 em telas menores)
- Tema Naruto com ícones SVG simples e facilmente substituíveis

## Tecnologias utilizadas

- React 18+ (Hooks: useState, useEffect)
- Vite 7 (build/dev server)
- JavaScript moderno (ES6+): arrow functions, destructuring, spread
- CSS moderno (Flex/Grid, transitions, transform 3D)
- ESLint (qualidade e padronização)

## Estrutura do projeto

```
src/
	components/        # UI: Header, ScorePanel, GameBoard, Card
	utils/             # Lógica pura: shuffle, generateCards
	assets/naruto/     # Ícones SVG do tema + Banner do README
public/
	leaf.svg           # Favicon
```

## Observações

- Os ícones de Naruto são placeholders em SVG; substitua por artes oficiais se tiver licença. Basta trocar os arquivos em `src/assets/naruto/`.


## Deploy

- Vercel: importando o repo do GitHub (Framework: Vite; Root: `.`), sem config extra.
- Netlify: Build command `npm run build`, Publish directory `dist`.

