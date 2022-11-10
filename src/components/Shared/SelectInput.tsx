import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  name: string;
  label: string;
  value: string;
  required?: boolean;
  disabled?: boolean;
  options: { id: string; value: string; label: string; disabled?: boolean }[];
  onChange: (e: SelectChangeEvent) => void;
}

function SelectInput({ name, label, value, required, disabled, options, onChange }: Props) {
  return (
    <FormControl fullWidth required={required} disabled={disabled} size="small">
      <InputLabel>{label}</InputLabel>
      <Select label={label} name={name} value={value} onChange={onChange}>
        {options?.map((option: any) => (
          <MenuItem key={option.id} value={option.value} disabled={option.disabled}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectInput;
