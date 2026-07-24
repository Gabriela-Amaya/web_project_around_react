import Card from "./Card";

function Gallery({ cards, onCardClick, onDeleteCard }) {
  return (
    <section className="gallery">
      <ul className="gallery__photos">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onCardClick={onCardClick}
            onDeleteCard={onDeleteCard}
          />
        ))}
      </ul>
    </section>
  );
}

export default Gallery;
