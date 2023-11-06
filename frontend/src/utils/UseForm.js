import { useCallback, useState } from "react";

export default function UseForm() {
  const [values, setValues] = useState({});

  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    setValues((firstValues) => {
      return { ...firstValues, [name]: value };
    });
  }

  const setValue = useCallback((name, value) => {
    setValues((firstValues) => {
      return { ...firstValues, [name]: value };
    });
  }, []);

  function reset(data = {}) {
    setValues(data);
  }

  return { values, handleChange, setValue, reset };
}
