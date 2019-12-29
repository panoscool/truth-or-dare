import { useState } from 'react';

export default function useForm(initialState) {
  const [values, setValues] = useState(initialState);

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  return { values, setValues, handleChange };
}
