import React from 'react';
import cuid from 'cuid';
import RadioInput from './Shared/RadioInput';

function CategoriesPage({ category, setCategory }) {
  function handleChange(event) {
    setCategory(event.target.value);
  }

  const categories = [
    { id: cuid(), value: 'funny', label: 'Funny' },
    { id: cuid(), value: 'challenging', label: 'Challenging' },
    { id: cuid(), value: 'uncensored', label: 'Uncensored' }
  ];

  return (
    <RadioInput
      name="category"
      label="Game Mode"
      value={category || ''}
      optionsArray={categories}
      handleChange={handleChange}
    />
  );
}

export default CategoriesPage;
