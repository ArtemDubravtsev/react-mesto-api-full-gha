import api from "../utils/api.js";
import Header from "./header/Header.jsx";
import Main from "./main/Main.jsx";
import Footer from "./footer/Footer.jsx";
import PopupWithForm from "./popupWithForm/PopupWithForm.jsx";
import ImagePopup from "./imagePopup/ImagePopup.jsx";
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./editProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./editAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./addPlacePopup/AddPlacePopup.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./protectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./infoTooltip/InfoTooltip.jsx";
import {
  registration,
  authorization,
  getUserData,
} from "../utils/registerAuth.js";

function App() {
  const navigate = useNavigate();
  //попапы
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = useState(false);
  //контекст
  const [currentUser, setCurrentUser] = useState({});
  //карточки
  const [cards, setCards] = useState([]);
  const [deleteCardId, setDeleteCardd] = useState("");
  //регистрация/авторизация
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isRight, setIsRight] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);

  const setStateCloseAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsCardDeletePopupOpen(false);
    setIsRegisterPopupOpen(false);
  }, []);

  const closePopupEscButton = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        setStateCloseAllPopups();
        document.removeEventListener("keydown", closePopupEscButton);
      }
    },
    [setStateCloseAllPopups]
  );

  const closeAllPopups = useCallback(() => {
    setStateCloseAllPopups();
    document.removeEventListener("keydown", closePopupEscButton);
  }, [setStateCloseAllPopups, closePopupEscButton]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEventListenerPopupEscClose();
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEventListenerPopupEscClose();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEventListenerPopupEscClose();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
    setEventListenerPopupEscClose();
  }

  function handleCardDelete(cardId) {
    setDeleteCardd(cardId);
    setIsCardDeletePopupOpen(true);
    setEventListenerPopupEscClose();
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked, localStorage.jwt)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(`Ошибка при изменении лайка ${error}`));
  }

  function handleCardDeleteSubmit(evt) {
    evt.preventDefault();
    api
      .deleteCard(deleteCardId, localStorage.jwt)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== deleteCardId;
          })
        );
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка при удалении карточки ${error}`));
  }

  function handleUpdateUser(dataUser) {
    api
      .setProfilInfo(dataUser, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) =>
        console.log(`Ошибка при редактировании данных ${error}`)
      );
  }

  function handleUpdateAvatar(dataUser) {
    api
      .setProfilAvatar(dataUser, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) =>
        console.log(`Ошибка при редактирования аватара ${error}`)
      );
  }

  function handleAddPlaceSubmit(dataUser) {
    api
      .addNewCard(dataUser, localStorage.jwt)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((error) =>
        console.log(`Ошибка при редактировании карточки ${error}`)
      );
  }

  function setEventListenerPopupEscClose() {
    document.addEventListener("keydown", closePopupEscButton);
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        api.getInfo(localStorage.jwt),
        api.getCards(localStorage.jwt),
      ])
        .then(([dataUser, dataCard]) => {
          setCurrentUser(dataUser);
          setCards(dataCard);
        })
        .catch((error) => console.log(`Ошибка при создании данных ${error}`));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (localStorage.jwt) {
      getUserData(localStorage.jwt)
        .then((res) => {
          setUserEmail(res.email);
          setLoggedIn(true);
          navigate("/");
        })
        .catch((err) => console.error(`Ошибка при авторизации ${err}`));
    } else {
      setLoggedIn(false);
    }
  }, [navigate]);

  function handleRegister(password, email) {
    registration(password, email)
      .then(() => {
        setIsRegisterPopupOpen(true);
        setIsRight(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsRegisterPopupOpen(true);
        setIsRight(false);
        console.error(`Ошибка при регистрации ${err}`);
      });
  }

  function handleLogin(password, email) {
    authorization(password, email)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setIsRegisterPopupOpen(true);
        setIsRight(false);
        console.error(`Ошибка при авторизации ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                cards={cards}
                loggedIn={loggedIn}
                userEmail={userEmail}
              />
            }
          />

          <Route
            path="/sign-up"
            element={
              <>
                <Header name="signup" />
                <Main name="signup" handleRegister={handleRegister} />
              </>
            }
          />

          <Route
            path="/sign-in"
            element={
              <>
                <Header name="signin" />
                <Main name="signin" handleLogin={handleLogin} />
              </>
            }
          />
        </Routes>

        <Footer />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />

        <PopupWithForm
          name="delete_card"
          title="Вы уверены?"
          buttonText="Да"
          isOpen={isCardDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDeleteSubmit}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          name="registerPopup"
          isRight={isRight}
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
