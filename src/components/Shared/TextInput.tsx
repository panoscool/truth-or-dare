import { TextField, TextFieldProps } from '@mui/material';

function TextInput({ onChange, inputProps, ...props }: TextFieldProps) {
  return (
    <TextField {...props} fullWidth size="small" inputProps={inputProps} onChange={onChange} />
  );
}

export default TextInput;
