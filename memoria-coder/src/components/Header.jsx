export default function Header({ onReset }) {
  return (
    <header className="header">
      <h1>Memória Coder — Naruto</h1>
      <button className="btn" onClick={onReset} aria-label="Reiniciar jogo">
        Reiniciar
      </button>
    </header>
  );
}
