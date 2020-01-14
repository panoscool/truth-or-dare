import React, { useContext, useState } from "react";
import cuid from "cuid";
import { OptionsContext } from "../context/OptionsContext";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PlayersList from "./PlayersList";
import TextInput from "./Shared/TextInput";

const useStyles = makeStyles(theme => ({
  formGroup: {
    display: "flex"
  },
  button: {
    margin: theme.spacing(1, 2, 1, -1)
  }
}));

function PlayersPage() {
  const classes = useStyles();
  const { players, setPlayers, setGuest } = useContext(OptionsContext);
  const [isEdit, setIsEdit] = useState(false);
  const [values, setValues] = useState({
    id: "",
    name: ""
  });

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  function handleFocus() {
    setGuest(false);
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
    setValues({ id: "", name: "" });
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
      setValues({ id: "", name: "" });
    }
  }

  const disabled = values.name !== undefined && !values.name.trim();

  return (
    <div>
      <form onSubmit={handleSubmit} className={classes.formGroup}>
        <TextInput
          name="name"
          value={values.name || ""}
          handleChange={handleChange}
          handleFocus={handleFocus}
        />
        <Button
          disabled={disabled}
          variant="outlined"
          type="submit"
          className={classes.button}
        >
          {isEdit ? "Edit" : "Add"}
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
