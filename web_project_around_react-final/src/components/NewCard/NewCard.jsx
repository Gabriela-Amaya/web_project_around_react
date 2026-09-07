import { useState } from "react";

function NewCard({ onAddPlaceSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const [nameError, setNameError] = useState("");
  const [linkError, setLinkError] = useState("");

  function validateName(input) {
    if (input.value.trim() === "") {
      return "Este campo es obligatorio.";
    }

    if (input.validity.tooShort) {
      return `Debe contener al menos ${input.minLength} caracteres.`;
    }

    if (input.validity.tooLong) {
      return `Debe contener como máximo ${input.maxLength} caracteres.`;
    }

    return "";
  }

  function validateLink(input) {
    if (input.value.trim() === "") {
      return "Este campo es obligatorio.";
    }

    if (input.validity.typeMismatch) {
      return "Introduce una URL válida.";
    }

    return "";
  }

  function handleNameChange(event) {
    setName(event.target.value);
    setNameError(validateName(event.target));
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
    setLinkError(validateLink(event.target));
  }

  function handleNameBlur(event) {
    setNameError(validateName(event.target));
  }

  function handleLinkBlur(event) {
    setLinkError(validateLink(event.target));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nameInput = event.currentTarget.elements.name;
    const linkInput = event.currentTarget.elements.link;

    const currentNameError = validateName(nameInput);
    const currentLinkError = validateLink(linkInput);

    setNameError(currentNameError);
    setLinkError(currentLinkError);

    if (currentNameError || currentLinkError) {
      return;
    }

    onAddPlaceSubmit({
      name: name.trim(),
      link: link.trim(),
    });

    setName("");
    setLink("");
    setNameError("");
    setLinkError("");
  }

  const isFormValid =
    name.trim().length >= 2 &&
    name.trim().length <= 30 &&
    link.trim() !== "" &&
    linkError === "";

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
          className={`popup__input ${
            nameError ? "popup__input_type_error" : ""
          }`}
          id="place-name"
          name="name"
          placeholder="Título"
          required
          minLength="2"
          maxLength="30"
          type="text"
          value={name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
        />

        <span className="popup__error" id="place-name-error">
          {nameError}
        </span>
      </label>

      <label className="popup__label">
        <input
          className={`popup__input ${
            linkError ? "popup__input_type_error" : ""
          }`}
          id="place-link"
          name="link"
          placeholder="Enlace de la imagen"
          required
          type="url"
          value={link}
          onChange={handleLinkChange}
          onBlur={handleLinkBlur}
        />

        <span className="popup__error" id="place-link-error">
          {linkError}
        </span>
      </label>

      <button className="popup__submit" type="submit" disabled={!isFormValid}>
        Crear
      </button>
    </form>
  );
}

export default NewCard;
