import React, { useState } from 'react';

function ClassButton({ className }) {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(!clicked)
  }

  return (
    <button
      type="button"
      onClick={() => handleClick()}
      onKeyDown={() => handleClick()}
      className="classButton"
    >
      {className}
    </button>
  )
}

export default ClassButton