import React, { useContext, useState } from 'react';
import cuid from 'cuid';
import { OptionsContext } from '../context/OptionsContext';
import RadioInput from './Shared/RadioInput';

function CategoriesList() {
  const { data, setData } = useContext(OptionsContext);

  const [values, setValues] = useState({
    id: '',
    name: ''
  });

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    values.id = cuid();
    setData([...data, values]);
    setValues({ ...values, name: '' });
  }

  const categories = [
    { id: cuid(), value: 'funny', label: 'Funny' },
    { id: cuid(), value: 'challenging', label: 'Challenging' },
    { id: cuid(), value: 'uncensored', label: 'Uncensored' }
  ]

  return (
    <form onSubmit={handleSubmit}>
      <RadioInput name='category' value={values.category || ''} optionsArray={categories} handleChange={handleChange} />
    </form>
  )
}

export default CategoriesList;
