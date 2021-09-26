import Cell from './Cell';

const Grid = ({ solveSudoku }) => {
  return (
    <>
      <div className='grid-container'>
        <div className='grid'>
          {Array.from({ length: 81 }).map((_, index) => (
            <Cell key={index} />
          ))}
        </div>
        <button onClick={solveSudoku} className='btn btn-solve'>
          solve
        </button>
      </div>
    </>
  );
};

export default Grid;
