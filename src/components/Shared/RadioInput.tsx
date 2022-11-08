import Box from '@mui/material/Box';
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
  vertical?: boolean;
  optionsArray: Array<object>;
  onChange: (e: any) => void;
}

function RadioInput({
  name,
  label,
  value,
  required,
  disabled,
  vertical,
  optionsArray,
  onChange,
}: Props) {
  return (
    <Box display="flex" justifyContent="center" my={2}>
      <FormControl disabled={disabled} required={required} component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup name={name} value={value} onChange={onChange} row={!vertical}>
          {optionsArray?.map((option: any) => (
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
    </Box>
  );
}

export default RadioInput;
