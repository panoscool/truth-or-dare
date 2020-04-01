import React from 'react';
import cuid from 'cuid';
import RadioInput from './Shared/RadioInput';
import SelectInput from './Shared/SelectInput';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { storeSetItem, KEYS } from '../config/store';

function CategoriesPage({ label, select, category, setCategory }) {
  const { width } = useWindowDimensions();

  function handleChange(event) {
    setCategory(event.target.value);
    storeSetItem(KEYS.QUESTION_CATEGORY, event.target.value);
  }

  const categories = [
    { id: cuid(), value: 'funny', label: 'Funny' },
    { id: cuid(), value: 'challenging', label: 'Challenging' },
    { id: cuid(), value: 'uncensored', label: 'Uncensored' }
  ];

  if (select && width < 460) {
    return (
      <SelectInput
        name="category"
        label={label}
        value={category || ''}
        optionsArray={categories}
        handleChange={handleChange}
      />
    );
  }

  return (
    <RadioInput
      name="category"
      label={label}
      vertical={width < 460}
      value={category || ''}
      optionsArray={categories}
      handleChange={handleChange}
    />
  );
}

export default CategoriesPage;
