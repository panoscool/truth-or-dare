import React, { useContext, useState } from "react"
import cuid from "cuid"
import { OptionsContext } from "../context/OptionsContext"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import PlayersList from "./PlayersList"
import TextInput from "./Shared/TextInput"

const useStyles = makeStyles(theme => ({
  formGroup: {
    display: "flex"
  },
  button: {
    margin: theme.spacing(1, 2, 1, -1)
  }
}))

function PlayersPage() {
  const classes = useStyles()
  const { players, setPlayers } = useContext(OptionsContext)
  const [values, setValues] = useState({
    id: "",
    name: ""
  })

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  function hnandleSelect(player) {
    setValues(player)
  }

  function handleUpdate(player) {
    setPlayers(
      players.map(p => {
        if (p.id === player.id) {
          return { ...player }
        } else {
          console.log("p", player)
          return p
        }
      })
    )
    setValues({})
  }

  function handleDelete(id) {
    setPlayers(players.filter(p => p.id !== id))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (values.id) {
      handleUpdate(values)
    } else {
      values.id = cuid()
      setPlayers([...players, values])
      setValues({})
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={classes.formGroup}>
        <TextInput
          name="name"
          value={values.name || ""}
          handleChange={handleChange}
        />
        <Button variant="outlined" type="submit" className={classes.button}>
          Add
        </Button>
      </form>
      <PlayersList
        data={players}
        hnandleSelect={hnandleSelect}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </div>
  )
}

export default PlayersPage
