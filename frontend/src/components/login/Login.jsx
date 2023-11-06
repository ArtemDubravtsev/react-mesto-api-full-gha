import RegisterLoginSection from "../registerLoginSection/registerLoginSection";
import Input from "../input/Input";
import UseForm from "../../utils/UseForm";

export default function Login({ name, handleLogin }) {
  const { values, handleChange } = UseForm();

  function onLogin(evt) {
    evt.preventDefault();
    handleLogin(values.password, values.email);
  }

  return (
    <RegisterLoginSection name={name} onSubmit={onLogin}>
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
