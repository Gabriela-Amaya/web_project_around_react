import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
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

    onAddPlace({
      name,
      link,
    });

    setName("");
    setLink("");
  }

  return (
    <PopupWithForm
      title="Nuevo lugar"
      name="add"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Crear"
    >
      <input
        className="popup__input"
        type="text"
        name="name"
        placeholder="Título"
        value={name}
        onChange={handleNameChange}
        required
        minLength="2"
        maxLength="30"
      />

      <input
        className="popup__input"
        type="url"
        name="link"
        placeholder="Enlace de la imagen"
        value={link}
        onChange={handleLinkChange}
        required
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
