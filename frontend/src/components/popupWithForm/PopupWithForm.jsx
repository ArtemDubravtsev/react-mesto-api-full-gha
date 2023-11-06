import Form from "../form/Form";
import Popup from "../popup/Popup";

export default function PopupWithForm({
  name,
  title,
  buttonText,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <h2 className="popup__heading">{title}</h2>
      <Form
        name={name}
        buttonText={buttonText}
        children={children}
        onSubmit={onSubmit}
      />
    </Popup>
  );
}
