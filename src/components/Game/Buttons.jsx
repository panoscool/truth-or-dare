import React from 'react';

const Buttons = (props) => {
  const {
    randomTruth,
    randomDare,
    handleHome,
    remainingTruths,
    remainingDares
  } = props;
  return (
    <div className="controls mb-1">
      <button className="btn btn-success btn-block m-0" onClick={randomTruth}>
        Truth ({remainingTruths.length})
      </button>

      <button className="btn btn-info btn-block m-0" onClick={handleHome}>
        Home
      </button>

      <button className="btn btn-danger btn-block m-0" onClick={randomDare}>
        Dare ({remainingDares.length})
      </button>
    </div>
  );
};

export default Buttons;
