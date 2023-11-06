import Form from "../form/Form";
import { Link } from "react-router-dom";

export default function RegisterLoginSection({ name, children, onSubmit }) {
  return (
    <section className="register">
      <h2 className="register__title">
        {name === "signup" ? "Регистрация" : "Вход"}
      </h2>
      <Form
        name={name}
        buttonText={name === "signup" ? "Зарегистрироваться" : "Войти"}
        children={children}
        onSubmit={onSubmit}
      />
      {name === "signup" && (
        <p className="register__subtitle">
          Уже зарегистрированы?
          <Link to={"/sign-in"} className="register__link">
            &nbsp;Войти
          </Link>
        </p>
      )}
    </section>
  );
}
