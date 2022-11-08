import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

interface Props {
  name: string;
  label: string;
  value: string;
  required?: boolean;
  disabled?: boolean;
  optionsArray: Array<object>;
  onChange: (e: any) => void;
}

function SelectForm({ name, label, value, required, disabled, optionsArray, onChange }: Props) {
  return (
    <FormControl required={required} disabled={disabled} margin="dense">
      <InputLabel>{label}</InputLabel>
      <Select label={label} name={name} value={value} onChange={onChange}>
        {optionsArray?.map((option: any) => (
          <MenuItem key={option.id} value={option.value} disabled={option.disabled}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectForm;
