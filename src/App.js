import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { OptionsContext } from "./context/OptionsContext";
import Navbar from "./components/Navbar";
import PlayersPage from "./components/PlayersPage";
import CategoriesPage from "./components/CategoriesPage";
import GamePage from "./components/Game/GamePage";

const useStyles = makeStyles(theme => ({
  center: {
    textAlign: "center"
  }
}));

function App() {
  const classes = useStyles();
  const { guest, setGuest } = useContext(OptionsContext);
  const [home, setHome] = useState(true);

  function handleHome() {
    setHome(true);
    setGuest(true);
  }

  return (
    <div>
      <Navbar handleHome={handleHome} />
      {home && (
        <div className={classes.center}>
          <CategoriesPage />
          {guest && home && (
            <>
              <Button onClick={() => setHome(false)}>Play as Guest</Button>
              <Typography gutterBottom>OR</Typography>
            </>
          )}
          <PlayersPage />
        </div>
      )}
      {!home && <GamePage />}
    </div>
  );
}

export default App;
