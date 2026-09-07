import { useContext, useRef, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const avatarRef = useRef(null);

  const [avatarError, setAvatarError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  function validateAvatar(input) {
    if (input.value.trim() === "") {
      return "Este campo es obligatorio.";
    }

    if (input.validity.typeMismatch) {
      return "Introduce una URL válida.";
    }

    return "";
  }

  function handleAvatarChange(event) {
    const error = validateAvatar(event.target);

    setAvatarError(error);
    setIsFormValid(error === "");
  }

  function handleAvatarBlur(event) {
    const error = validateAvatar(event.target);

    setAvatarError(error);
    setIsFormValid(error === "");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const avatarInput = avatarRef.current;
    const error = validateAvatar(avatarInput);

    setAvatarError(error);

    if (error) {
      setIsFormValid(false);
      return;
    }

    handleUpdateAvatar({
      avatar: avatarInput.value.trim(),
    });

    avatarInput.value = "";
    setAvatarError("");
    setIsFormValid(false);
  }

  return (
    <form
      className="popup__form"
      name="avatar-form"
      id="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          ref={avatarRef}
          className={`popup__input ${
            avatarError ? "popup__input_type_error" : ""
          }`}
          id="avatar-link"
          name="avatar"
          placeholder="Enlace de la imagen"
          required
          type="url"
          onChange={handleAvatarChange}
          onBlur={handleAvatarBlur}
        />

        <span className="popup__error" id="avatar-link-error">
          {avatarError}
        </span>
      </label>

      <button className="popup__submit" type="submit" disabled={!isFormValid}>
        Guardar
      </button>
    </form>
  );
}

export default EditAvatar;
