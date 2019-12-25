import { useState } from 'react';

export default function useForm(initialState) {
  const [data, setData] = useState([]);
  const [values, setValues] = useState(initialState);

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setData([...data, values]);
    setValues({});
  }

  return { handleSubmit, handleChange, values, data };
}
