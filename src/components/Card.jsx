import { narutoIcons } from '../assets/naruto';

export default function Card({ card, onClick, disabled }) {
  const { isFlipped, isMatched, value } = card;
  const icon = narutoIcons[value];
  const handleClick = () => {
    if (!disabled && !isMatched && !isFlipped) onClick(card);
  };
  return (
    <button
      className={`card ${isFlipped || isMatched ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={handleClick}
      aria-pressed={isFlipped || isMatched}
      aria-label={`Carta ${value}`}
    >
      <div className="card-inner">
        <div className="card-face card-front" />
        <div className="card-face card-back">
          {icon ? (
            <img src={icon} alt={value} />
          ) : (
            <span>{value}</span>
          )}
        </div>
      </div>
    </button>
  );
}
