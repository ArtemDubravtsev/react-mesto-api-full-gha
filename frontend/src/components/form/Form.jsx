export default function Form({ name, buttonText, children, onSubmit }) {
  return (
    <form
      noValidate
      name={name}
      className={
        name === "signin" || name === "signup"
          ? "register__form"
          : "popup__form"
      }
      onSubmit={onSubmit}
    >
      {children}
      {name === "signin" || name === "signup" ? (
        <button className="register__button">{buttonText}</button>
      ) : (
        <button className="popup__button-save">{buttonText}</button>
      )}
    </form>
  );
}
