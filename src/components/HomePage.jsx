import React, { useContext, useState } from 'react';
import cuid from 'cuid';
import { OptionsContext } from '../context/OptionsContext';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PlayersList from './PlayersList';
import TextInput from './Shared/TextInput';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex'
  }
}));

function HomePage() {
  const classes = useStyles();
  const { data, setData } = useContext(OptionsContext);
  const [isFormOpen, setFormOpen] = useState(false);
  const [values, setValues] = useState({
    id: '',
    name: ''
  });

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    values.id = cuid();
    setData([...data, values]);
    setValues({ ...values, name: '' });
  }

  console.log(data)

  return (
    <div>
      <form onSubmit={handleSubmit} className={classes.container}>
        <TextInput name='name' value={values.name || ''} handleChange={handleChange} />
        <Button type='submit'>Add</Button>
      </form>
      <PlayersList data={data} />
    </div>
  )
}

export default HomePage;
