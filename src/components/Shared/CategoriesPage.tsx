import React from 'react';
import cuid from 'cuid';
import RadioInput from './RadioInput';
import SelectInput from './SelectInput';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { storeSetItem, KEYS } from '../../config/store';
import useAuthentication from '../../hooks/useAuthentication';

interface Props {
  name?: string;
  label: string;
  select?: boolean;
  category: any;
  setCategory: (e: string) => void;
}

function CategoriesPage({ select, category, setCategory, ...rest }: Props) {
  const { width } = useWindowDimensions();
  const { authenticated } = useAuthentication();

  function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    setCategory(event.target.value as string);
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
