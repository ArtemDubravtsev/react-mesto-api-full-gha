import { useContext } from "react";
import Card from "../card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Register from "../register/Register.jsx";
import Login from "../login/Login.jsx";

export default function Main({
  name,
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onCardDelete,
  onCardLike,
  cards,
  handleRegister,
  handleLogin,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      {name === "main" ? (
        <>
          <section className="profile">
            <button
              type="button"
              className="profile__avatar-button"
              onClick={onEditAvatar}
            >
              <img
                className="profile__avatar"
                src={currentUser.avatar}
                alt="Аватар"
              />
            </button>
            <div className="profile__info">
              <div className="profile__name">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button
                  type="button"
                  className="profile__button-edit"
                  onClick={onEditProfile}
                />
              </div>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button
              type="button"
              className="profile__button-add"
              onClick={onAddPlace}
            />
          </section>
          <section className="elements">
            {cards.map((data) => {
              return (
                <Card
                  card={data}
                  key={data._id}
                  onCardClick={onCardClick}
                  onCardDelete={onCardDelete}
                  onCardLike={onCardLike}
                />
              );
            })}
          </section>
        </>
      ) : name === "signup" ? (
        <Register name={name} handleRegister={handleRegister} />
      ) : (
        <Login name={name} handleLogin={handleLogin} />
      )}
    </main>
  );
}
