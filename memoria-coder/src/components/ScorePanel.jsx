export default function ScorePanel({ moves, seconds, isGameWon }) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return (
    <section className="score-panel" aria-live="polite">
      <div>
        <strong>Jogadas:</strong> {moves}
      </div>
      <div>
        <strong>Tempo:</strong> {mm}:{ss}
      </div>
      {isGameWon && <div className="victory">Você venceu! 🎉</div>}
    </section>
  );
}
