import Profile from "./Profile";
import Gallery from "./Gallery";

function Main({
  user,
  cards,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onDeleteCard,
}) {
  return (
    <main className="content">
      <Profile
        user={user}
        onEditProfile={onEditProfile}
        onAddPlace={onAddPlace}
      />

      <Gallery
        cards={cards}
        onCardClick={onCardClick}
        onDeleteCard={onDeleteCard}
      />
    </main>
  );
}

export default Main;
