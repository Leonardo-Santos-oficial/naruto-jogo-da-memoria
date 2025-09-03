# PRD - Projeto Jogo da Memória React

## 1. Visão Geral do Projeto

* **Nome do Projeto:** "Memória Coder" (ou tema a definir).
* **Declaração do Produto:** Uma aplicação web interativa de Jogo da Memória, desenvolvida com React, para demonstrar competências em lógica de programação, manipulação de estado e estilização moderna, seguindo as melhores práticas de desenvolvimento.
* **Público-Alvo:** Recrutadores e Tech Leads de empresas de tecnologia.
* **Objetivo Principal:** Servir como uma peça-chave no portfólio de desenvolvimento, destacando a habilidade do desenvolvedor em criar uma aplicação React funcional, bem estruturada, manutenível e visualmente agradável.

## 2. Tecnologias Propostas

* **Linguagens:** HTML5, CSS3, JavaScript (ES6+).
* **Biblioteca Principal:** React 18+ (utilizando Hooks modernos).
* **Setup do Projeto:** Vite ou Create React App.
* **Controle de Versão:** Git e GitHub.
* **Deploy:** Vercel ou Netlify.

## 3. Arquitetura de Componentes

A interface será dividida em componentes reutilizáveis para garantir a manutenibilidade e escalabilidade do projeto.

* **`App.js`:** Componente principal que orquestra todo o jogo, contendo a lógica e os estados mais importantes.
* **`Header.js`:** Componente para exibir o título do jogo e o botão de "Reiniciar".
* **`GameBoard.js`:** Componente que renderiza o grid de cartas, recebendo a lista de cartas do `App.js`.
* **`Card.js`:** Representa uma única carta. Gerencia o estado de "virada" e a animação.
* **`ScorePanel.js`:** Exibe informações como o número de jogadas e o tempo decorrido.

## 4. Princípios de Código e Arquitetura

Este projeto seguirá princípios rigorosos para garantir alta qualidade e demonstrar profissionalismo.

* **Modularização e Single Responsibility:** Cada componente React deve ter uma única responsabilidade (Single Responsibility Principle). Funções de lógica pura (como o algoritmo de embaralhar o array) serão extraídas para arquivos de utilitários (`/src/utils`), mantendo os componentes focados na renderização (JSX) e no gerenciamento de estado. O objetivo é manter os arquivos pequenos, focados e de fácil manutenção.

* **JavaScript Moderno (ES6+):** Utilizar consistentemente as funcionalidades mais recentes do JavaScript para um código mais limpo, eficiente e legível. Isso inclui, mas não se limita a: `let` e `const` (em vez de `var`), Arrow Functions, desestruturação (`destructuring`) de objetos e arrays, e o operador `spread` (`...`).

* **React Moderno (Hooks):** O projeto será construído exclusivamente com **Componentes de Função** e **Hooks**. Daremos preferência aos hooks `useState` e `useEffect` para gerenciamento de estado e ciclo de vida, evitando completamente o uso de componentes de classe. O uso de hooks customizados (`custom hooks`) será considerado se houver lógica de estado que possa ser reutilizada.

## 5. Estrutura de Dados e Lógica Principal

* **Objeto da Carta:** Cada carta será um objeto JavaScript com a seguinte estrutura:
    ```javascript
    {
      id: 1,          // ID único para a chave no React
      value: 'React',   // Identificador do par (ex: nome do ícone)
      isFlipped: false, // A carta está virada para cima?
      isMatched: false  // A carta já encontrou seu par?
    }
    ```
* **Estado Principal (em `App.js`):**
    * `cards (useState)`: Um array contendo todos os objetos de carta.
    * `flippedCards (useState)`: Um array que armazena temporariamente as 1 ou 2 cartas viradas na jogada.
    * `moves (useState)`: Um contador para as tentativas do jogador.
    * `isGameWon (useState)`: Um booleano que se torna `true` quando o jogo termina.

## 6. Detalhamento das Funcionalidades (User Stories)

* **Geração do Tabuleiro:**
    * Ao iniciar, o sistema deve criar e embaralhar um array de pares de cartas.
    * O tabuleiro deve ser renderizado com todas as cartas viradas para baixo.
* **Mecânica de Virar a Carta:**
    * Ao clicar em uma carta, ela deve virar para cima.
    * O jogador não pode virar mais de duas cartas ao mesmo tempo, nem clicar em cartas que já formaram par.
* **Verificação de Pares:**
    * Após duas cartas serem viradas, o sistema deve comparar seus valores.
    * **Se for um par:** As cartas devem ser marcadas como `isMatched: true`.
    * **Se não for um par:** As cartas devem virar para baixo novamente após 1 segundo (`setTimeout`).
* **HUD / Painel de Pontuação:**
    * O contador de "Jogadas" deve ser incrementado a cada par de cartas virado.
    * Um cronômetro deve iniciar no primeiro clique.
* **Reinício e Fim de Jogo:**
    * O botão "Reiniciar" deve resetar todos os estados e gerar um novo tabuleiro.
    * Uma mensagem de vitória deve ser exibida quando todos os pares forem encontrados.

## 7. Estilização e Animações

* **Animação da Carta:** Utilizar CSS `transform: rotateY(180deg)` e `transition` para criar um efeito 3D suave ao virar a carta.
* **Layout Responsivo:** O grid de cartas deve se adaptar a diferentes tamanhos de tela usando CSS Flexbox ou Grid.
* **Tema:** Definir uma paleta de cores coesa e um conjunto de ícones/imagens para o tema do jogo (ex: logos de tecnologias).

## 8. Orientações para Usar a IA como Assistente

Para otimizar o desenvolvimento, utilize prompts específicos para cada etapa.

> **Exemplos de Prompts:**
>
> * **Setup:** "Me dê o comando para criar um novo projeto React usando Vite."
> * **Componentes:** "Me dê um código inicial para o componente `Card.js`, seguindo as melhores práticas de modularização."
> * **Lógica:** "Preciso extrair a lógica de embaralhar as cartas para um arquivo de utilitários. Como ficaria essa função usando JavaScript moderno (ES6+)?"
> * **CSS:** "Me ajude a criar a animação de 'flip' em 3D para a carta usando CSS."
> * **Refatoração:** "Este componente está ficando muito grande. Pode me ajudar a refatorá-lo, talvez criando um custom hook?"

## 9. Próximos Passos (Plano de Ação)

1.  **Configurar o Ambiente:** Criar o projeto React e o repositório no GitHub.
2.  **Estrutura de Arquivos:** Criar a estrutura de pastas, incluindo `/src/components`, `/src/assets` (para imagens/ícones) e `/src/utils`.
3.  **Gerar as Cartas:** Implementar a função de utilitário para criar e embaralhar o array de cartas e usá-la para inicializar o estado em `App.js`.