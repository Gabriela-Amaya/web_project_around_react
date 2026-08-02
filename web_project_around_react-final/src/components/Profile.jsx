function Profile({ user, onEditProfile, onAddPlace }) {
  return (
    <div className="profile">
      <section className="profile__image">
        <img
          src={user.avatar}
          alt={`Foto de perfil de ${user.name}`}
          className="profile__image-avatar"
        />

        <button
          className="profile__avatar-edit"
          type="button"
          aria-label="Editar foto de perfil"
        />
      </section>

      <section className="profile__info">
        <h1 className="profile__name">{user.name}</h1>

        <p className="profile__job">{user.about}</p>
      </section>

      <button
        className="profile__button-edit"
        type="button"
        aria-label="Editar perfil"
        onClick={onEditProfile}
      />

      <button
        className="profile__button-plus"
        type="button"
        aria-label="Agregar una nueva tarjeta"
        onClick={onAddPlace}
      >
        +
      </button>
    </div>
  );
}

export default Profile;
