import { useState } from 'react';

const Cell = () => {
  const [amount, setAmount] = useState('');

  const onChange = (e) => {
    setAmount(e.target.value);
    if (e.target.value.length > 1) {
      setAmount(e.target.value.slice(0, 1));
    }
  };

  return (
    <div className='cell'>
      <input
        type='number'
        className='cell-input'
        name='cell_input'
        min='1'
        max='9'
        value={amount}
        onChange={onChange}
      />
    </div>
  );
};
export default Cell;
