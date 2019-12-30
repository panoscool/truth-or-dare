import React, { useContext, useState } from 'react';
import cuid from 'cuid';
import { OptionsContext } from '../context/OptionsContext';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PlayersList from './PlayersList';
import TextInput from './Shared/TextInput';
import CategoriesList from './CategoriesList';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex'
  }
}));

function HomePage() {
  const classes = useStyles();
  const { players, setPlayers } = useContext(OptionsContext);
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

  function hnandleSelect(player) {
    setValues(player);
  }

  function handleUpdate(player) {
    setPlayers(
      players.map(p => {
        if (p.id === player) {
          return { ...player };
        } else {
          console.log('p', player);
          return p;
        }
      })
    );
    setValues({});
  }

  function handleDelete(id) {
    setPlayers(players.filter(p => p.id !== id));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (values.id) {
      handleUpdate(values);
    } else {
      values.id = cuid();
      setPlayers([...players, values]);
      setValues({});
    }
  }

  console.log('players', players, 'values', values);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInput
          name="name"
          value={values.name || ''}
          handleChange={handleChange}
        />
        <Button type="submit">Add</Button>
      </form>
      <PlayersList
        data={players}
        hnandleSelect={hnandleSelect}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
      <CategoriesList />
    </div>
  );
}

export default HomePage;
