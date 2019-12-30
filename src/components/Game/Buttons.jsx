import React from 'react';
import Button from '@material-ui/core/Button';

function Buttons({ randomTruth, randomDare }) {
  return (
    <div>
      <Button variant='contained' onClick={randomTruth}>
        Truth
      </Button>

      <Button variant='contained' onClick={randomDare}>
        Dare
      </Button>
    </div>
  );
};

export default Buttons;
