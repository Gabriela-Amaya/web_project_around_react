import Card from "./Card";

function Gallery({ cards, onCardClick, onCardLike, onCardDelete }) {
  return (
    <section className="gallery">
      <ul className="gallery__photos">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            isLiked={card.isLiked}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>
    </section>
  );
}

export default Gallery;
