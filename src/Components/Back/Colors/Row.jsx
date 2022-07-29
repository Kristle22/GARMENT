import { useContext } from 'react';
import BackContext from '../BackContext';

function Row({ row }) {

  const { setDeleteClothColor } = useContext(BackContext);

  const handleDelete = () => {
    setDeleteClothColor(row);
  };
  console.log(row);
  return (
    <>
      <div className='flex-row'>
        <p
          className='colors'
          style={{
            backgroundColor: row.hex_code,
            color: row.hex_code === 'white' ? 'black' : 'white',
            boxShadow: `2px 3px 20px ${row.title} `,
            margin: '10px',
          }}
        >
          {row.title}
        </p>
        {row.id === row.garment_id ? (
          ''
        ) : (
          <button type='button' className='dlt' onClick={handleDelete}>
            <svg>
              <use href='#Delete' />
            </svg>
          </button>
        )}
      </div>
    </>
  );
}

export default Row;
