import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';

interface Props {
  name: string;
  label: string;
  value: string;
  required?: boolean;
  disabled?: boolean;
  row?: boolean;
  options: { id: string; value: string; label: string; disabled?: boolean }[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function RadioInput({ name, label, value, required, disabled, row, options, onChange }: Props) {
  return (
    <FormControl disabled={disabled} required={required} component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup name={name} value={value} onChange={onChange} row={row}>
        {options?.map((option: any) => (
          <FormControlLabel
            key={option.id}
            label={option.label}
            value={option.value}
            disabled={option.disabled}
            control={<Radio disabled={disabled} required={required} />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default RadioInput;
