import cuid from 'cuid';
import RadioInput from './RadioInput';
import SelectInput from './SelectInput';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { storeSetItem, KEYS } from '../../config/store';
import useAuthentication from '../../hooks/useAuthentication';
import { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  name?: string;
  label: string;
  select?: boolean;
  value: string | null;
  row?: boolean;
  setCategory: (e: string) => void;
}

function CategoriesPage({ select, row, value, setCategory, ...rest }: Props) {
  const { width } = useWindowDimensions();
  const { authenticated } = useAuthentication();

  function handleChange(event: SelectChangeEvent | React.ChangeEvent<HTMLInputElement>) {
    setCategory(event.target.value);
    storeSetItem(KEYS.QUESTION_CATEGORY, event.target.value);
  }

  const categories = [
    { id: cuid(), value: 'funny', label: 'Funny', disabled: false },
    { id: cuid(), value: 'challenging', label: 'Challenging', disabled: false },
    { id: cuid(), value: 'uncensored', label: 'Uncensored', disabled: !authenticated },
  ];

  if (select && width < 460) {
    return (
      <SelectInput
        {...rest}
        name="category"
        value={value || ''}
        options={categories}
        onChange={handleChange}
      />
    );
  }

  return (
    <RadioInput
      {...rest}
      row={row}
      name="category"
      value={value || ''}
      options={categories}
      onChange={handleChange}
    />
  );
}

export default CategoriesPage;
