import React, { useState } from 'react';
import cuid from 'cuid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PlayersList from './PlayersList';
import TextInput from '../Shared/TextInput';

const useStyles = makeStyles(theme => ({
  formGroup: {
    display: 'flex'
  },
  button: {
    margin: theme.spacing(1, 0, 1, 0)
  }
}));

function PlayersPage({ players, setPlayers }) {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const [values, setValues] = useState({
    id: '',
    name: '',
    score: {
      truth: 0,
      dare: 0
    }
  });

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  function handleFormReset() {
    setValues({ id: '', name: '', score: { truth: 0, dare: 0 } });
  }

  function hnandleSelect(player) {
    setValues(player);
    setIsEdit(true);
  }

  function handleUpdate(player) {
    setPlayers(
      players.map(p => {
        if (p.id === player.id) {
          return { ...player };
        } else {
          return p;
        }
      })
    );
    handleFormReset();
    setIsEdit(false);
  }

  function handleDelete(id) {
    setPlayers(players.filter(p => p.id !== id));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (values.name !== undefined && !values.name.trim()) return;

    if (values.id) {
      handleUpdate(values);
    } else {
      values.id = cuid();
      setPlayers([...players, values]);
      handleFormReset();
    }
  }

  const disabled = values.name !== undefined && !values.name.trim();

  return (
    <div>
      <form onSubmit={handleSubmit} className={classes.formGroup}>
        <TextInput
          name="name"
          label="Add names"
          placeholder="Add names"
          value={values.name || ''}
          handleChange={handleChange}
        />
        <Button
          type="submit"
          color="primary"
          variant="outlined"
          disabled={disabled}
          className={classes.button}
        >
          {isEdit ? 'Edit' : 'Add'}
        </Button>
      </form>
      <PlayersList
        data={players}
        hnandleSelect={hnandleSelect}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

export default PlayersPage;
