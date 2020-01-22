import React from 'react';
import cuid from 'cuid';
import RadioInput from './Shared/RadioInput';
import useWindowDimensions from '../hooks/useWindowDimensions';

function CategoriesPage({ category, setCategory }) {
  const { width } = useWindowDimensions();
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
      vertical={width < 460}
      value={category || ''}
      optionsArray={categories}
      handleChange={handleChange}
    />
  );
}

export default CategoriesPage;
