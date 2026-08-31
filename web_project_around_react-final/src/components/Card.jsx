function Card({ card, isLiked, onCardClick, onCardLike, onCardDelete }) {
  function handleImageClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <button
        className="card__delete-button"
        type="button"
        aria-label="Eliminar tarjeta"
        onClick={handleDeleteClick}
      />

      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleImageClick}
      />

      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>

        <button
          className={`card__like-button ${
            isLiked ? "card__like-button_active" : ""
          }`}
          type="button"
          aria-label="Me gusta"
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}

export default Card;
