import { useEffect, useState } from "react";
import avatar from "./images/image.jpg";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import EditProfilePopup from "./components/EditProfilePopup";
import AddPlacePopup from "./components/AddPlacePopup";
import ImagePopup from "./components/ImagePopup";

function App() {
  const [user, setUser] = useState({
    name: "Jacques Cousteau",
    about: "Explorador",
    avatar: avatar,
  });

  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Valle de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
    {
      id: 2,
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
      id: 3,
      name: "Montañas Calvas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
      id: 4,
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
      id: 5,
      name: "Parque Nacional de la Vanoise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
      id: 6,
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },
  ]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  function handleOpenEditProfilePopup() {
    setIsEditProfilePopupOpen(true);
  }

  function handleOpenAddPlacePopup() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleClosePopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(data) {
    setUser((currentUser) => ({
      ...currentUser,
      name: data.name,
      about: data.about,
    }));

    handleClosePopups();
  }

  function handleAddPlace(data) {
    const newCard = {
      id: Date.now(),
      name: data.name,
      link: data.link,
    };

    setCards((currentCards) => [newCard, ...currentCards]);

    handleClosePopups();
  }

  function handleDeleteCard(cardId) {
    setCards((currentCards) =>
      currentCards.filter((card) => card.id !== cardId),
    );
  }

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        handleClosePopups();
      }
    }

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <div className="page">
      <Header />

      <Main
        user={user}
        cards={cards}
        onEditProfile={handleOpenEditProfilePopup}
        onAddPlace={handleOpenAddPlacePopup}
        onCardClick={handleCardClick}
        onDeleteCard={handleDeleteCard}
      />

      <Footer />

      <EditProfilePopup
        user={user}
        isOpen={isEditProfilePopupOpen}
        onClose={handleClosePopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={handleClosePopups}
        onAddPlace={handleAddPlace}
      />

      <ImagePopup card={selectedCard} onClose={handleClosePopups} />
    </div>
  );
}

export default App;
