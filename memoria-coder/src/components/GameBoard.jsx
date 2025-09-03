import Card from './Card';

export default function GameBoard({ cards, onCardClick, disabled }) {
  return (
    <section className="game-board">
      {cards.map((c) => (
        <Card key={c.id} card={c} onClick={onCardClick} disabled={disabled} />
      ))}
    </section>
  );
}
