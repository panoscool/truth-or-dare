import { useState } from 'react';
import cuid from 'cuid';
import PlayersList from './PlayersList';
import TextInput from '../Shared/TextInput';
import { storeSetItem, storeRemoveItem, KEYS } from '../../config/store';
import { Box, Button } from '@mui/material';

interface Props {
  players: Array<object>;
  setPlayers: (e: object) => void;
}

function PlayersPage({ players, setPlayers }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [values, setValues] = useState({
    id: '',
    name: '',
    score: {
      truth: 0,
      dare: 0,
    },
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function handleClearList() {
    setPlayers([]);
    storeRemoveItem(KEYS.PLAYERS_LIST);
  }

  function handleFormReset() {
    setValues({ id: '', name: '', score: { truth: 0, dare: 0 } });
  }

  function handleSelect(player: any) {
    setValues(player);
    setIsEdit(true);
  }

  function handleUpdate(player: any) {
    const newPlayers = players.map((p: any) => {
      if (p.id === player.id) {
        return { ...player };
      }
      return p;
    });
    setPlayers(newPlayers);
    storeSetItem(KEYS.PLAYERS_LIST, newPlayers);
    handleFormReset();
    setIsEdit(false);
  }

  function handleDelete(id: string) {
    const newPlayers = players.filter((p: any) => p.id !== id);
    setPlayers(newPlayers);
    storeSetItem(KEYS.PLAYERS_LIST, newPlayers);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (values.name !== undefined && !values.name.trim()) return;

    if (values.id) {
      handleUpdate(values);
    } else {
      values.id = cuid();
      setPlayers([...players, values]);
      storeSetItem(KEYS.PLAYERS_LIST, [...players, values]);
      handleFormReset();
    }
  }

  const disabled = values.name !== undefined && !values.name.trim();

  return (
    <div>
      <Box
        component="form"
        autoComplete="off"
        display="flex"
        gap={1}
        mb={3}
        onSubmit={handleSubmit}
      >
        <TextInput
          name="name"
          label="Add names"
          placeholder="Add names"
          value={values.name || ''}
          onChange={handleChange}
        />
        <Button type="submit" color="primary" variant="contained" disabled={disabled}>
          {isEdit ? 'Edit' : 'Add'}
        </Button>
      </Box>
      <PlayersList
        data={players}
        handleSelect={handleSelect}
        handleDelete={handleDelete}
        handleClearList={handleClearList}
      />
    </div>
  );
}

export default PlayersPage;
