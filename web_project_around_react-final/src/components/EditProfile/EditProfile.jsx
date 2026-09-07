import { useContext, useEffect, useRef, useState } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");

    setNameError("");
    setDescriptionError("");
  }, [currentUser]);

  function validateInput(input) {
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

  function handleNameChange(event) {
    setName(event.target.value);

    const error = validateInput(event.target);
    setNameError(error);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);

    const error = validateInput(event.target);
    setDescriptionError(error);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nameInput = nameRef.current;
    const descriptionInput = descriptionRef.current;

    const currentNameError = validateInput(nameInput);
    const currentDescriptionError = validateInput(descriptionInput);

    setNameError(currentNameError);
    setDescriptionError(currentDescriptionError);

    if (currentNameError || currentDescriptionError) {
      return;
    }

    handleUpdateUser({
      name: name.trim(),
      about: description.trim(),
    });
  }

  const isFormValid =
    name.trim().length >= 2 &&
    name.trim().length <= 40 &&
    description.trim().length >= 2 &&
    description.trim().length <= 200;

  return (
    <form
      className="popup__form"
      name="profile-form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          ref={nameRef}
          className={`popup__input ${
            nameError ? "popup__input_type_error" : ""
          }`}
          id="owner-name"
          maxLength="40"
          minLength="2"
          name="userName"
          placeholder="Nombre"
          required
          type="text"
          value={name}
          onChange={handleNameChange}
        />

        <span className="popup__error" id="owner-name-error">
          {nameError}
        </span>
      </label>

      <label className="popup__label">
        <input
          ref={descriptionRef}
          className={`popup__input ${
            descriptionError ? "popup__input_type_error" : ""
          }`}
          id="owner-description"
          maxLength="200"
          minLength="2"
          name="userDescription"
          placeholder="Acerca de mí"
          required
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />

        <span className="popup__error" id="owner-description-error">
          {descriptionError}
        </span>
      </label>

      <button className="popup__submit" type="submit" disabled={!isFormValid}>
        Guardar
      </button>
    </form>
  );
}

export default EditProfile;
