import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextInput from '../Shared/TextInput';
import useForm from '../../hooks/useForm';
import PlayersList from './PlayersList'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex'
  }
}));

const INITIAL_STATE = {
  name: '',
}

function HomePage() {
  const classes = useStyles();
  const { data, values, handleChange, handleSubmit } = useForm(INITIAL_STATE)
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
