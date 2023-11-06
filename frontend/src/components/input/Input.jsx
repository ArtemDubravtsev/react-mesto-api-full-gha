export default function Input({ name, type, placeholder, value, onChange }) {
  return (
    <>
      {name === "email" || name === "password" ? (
        <>
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            className="register__form-item"
            value={value ? value : ""}
            onChange={onChange}
          />
        </>
      ) : (
        <>
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            className="popup__form-item"
            value={value ? value : ""}
            onChange={onChange}
          />
        </>
      )}
    </>
  );
}
