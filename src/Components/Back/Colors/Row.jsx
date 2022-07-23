import { useContext } from 'react';
import BackContext from '../BackContext';

function Row({ row }) {
  const { setDeleteSomeSecond } = useContext(BackContext);

  const handleDelete = () => {
    setDeleteSomeSecond(row);
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          className='colors'
          style={{
            backgroundColor: row.title,
            color: row.title === 'white' ? 'black' : 'white',
            boxShadow: `2px 3px 20px ${row.title} `,
          }}
        >
          {row.title}
        </div>
      </div>
      {row.id === row.garment_id ? (
        ''
      ) : (
        <div
          className='btns'
          style={{ width: '12%', alignItems: 'end', paddingRight: '10px' }}
        >
          <button type='button' className='dlt' onClick={handleDelete}>
            <svg>
              <use href='#Delete' />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

export default Row;
