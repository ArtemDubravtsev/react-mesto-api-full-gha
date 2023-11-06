import RegisterLoginSection from "../registerLoginSection/registerLoginSection";
import Input from "../input/Input";
import UseForm from "../../utils/UseForm";

export default function Register({ name, handleRegister }) {
  const { values, handleChange } = UseForm();

  function onRegister(evt) {
    evt.preventDefault();
    handleRegister(values.password, values.email);
  }

  return (
    <RegisterLoginSection name={name} onSubmit={onRegister}>
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
      />
      <Input
        name="password"
        type="password"
        placeholder="Пароль"
        value={values.password}
        onChange={handleChange}
      />
    </RegisterLoginSection>
  );
}
