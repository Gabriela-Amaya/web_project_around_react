import { useState } from "react";

function NewCard({ onAddPlaceSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlaceSubmit({
      name,
      link,
    });

    setName("");
    setLink("");
  }

  return (
    <form
      className="popup__form"
      name="new-card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_card-name"
          id="place-name"
          name="name"
          placeholder="Título"
          required
          minLength="2"
          maxLength="30"
          type="text"
          value={name}
          onChange={handleNameChange}
        />

        <span className="popup__error" id="place-name-error" />
      </label>

      <label className="popup__label">
        <input
          className="popup__input popup__input_type_url"
          id="place-link"
          name="link"
          placeholder="Enlace de la imagen"
          required
          type="url"
          value={link}
          onChange={handleLinkChange}
        />

        <span className="popup__error" id="place-link-error" />
      </label>

      <button className="popup__submit" type="submit">
        Crear
      </button>
    </form>
  );
}

export default NewCard;
