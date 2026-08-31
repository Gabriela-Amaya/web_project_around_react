import { useContext, useRef } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });

    avatarRef.current.value = "";
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
          className="popup__input popup__input_type_avatar"
          id="avatar-link"
          name="avatar"
          placeholder="Enlace de la imagen"
          required
          type="url"
          ref={avatarRef}
        />

        <span className="popup__error" id="avatar-link-error" />
      </label>

      <button className="popup__submit" type="submit">
        Guardar
      </button>
    </form>
  );
}

export default EditAvatar;
