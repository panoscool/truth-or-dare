import React, { useContext } from 'react';
import cuid from 'cuid';
import RadioInput from './RadioInput';
import SelectInput from './SelectInput';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { AuthContext } from '../../context/AuthContext';
import { storeSetItem, KEYS } from '../../config/store';

function CategoriesPage({ select, category, setCategory, ...rest }) {
  const { width } = useWindowDimensions();
  const { authenticated } = useContext(AuthContext);

  function handleChange(event) {
    setCategory(event.target.value);
    storeSetItem(KEYS.QUESTION_CATEGORY, event.target.value);
  }

  const categories = [
    { id: cuid(), value: 'funny', label: 'Funny', disabled: false },
    { id: cuid(), value: 'challenging', label: 'Challenging', disabled: false },
    { id: cuid(), value: 'uncensored', label: 'Uncensored', disabled: !authenticated }
  ];

  if (select && width < 460) {
    return (
      <SelectInput
        {...rest}
        name="category"
        value={category || ''}
        optionsArray={categories}
        handleChange={handleChange}
      />
    );
  }

  return (
    <RadioInput
      {...rest}
      name="category"
      vertical={width < 460}
      value={category || ''}
      optionsArray={categories}
      handleChange={handleChange}
    />
  );
}

export default CategoriesPage;
