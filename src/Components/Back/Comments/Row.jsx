import { useContext } from 'react';
import BackContext from '../BackContext';

function Row({ row }) {
  const { handleDeleteComment } = useContext(BackContext);

  return (
    <>
      <div className='comment'>
        <div className='flex-row'>
          <div>
            <span
              style={{
                backgroundColor: row.hexCode ? row.hexCode : null,
                padding: '3px 10px',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                position: 'absolute',
                marginLeft: '-5px',
                marginTop: '-5px',
              }}
            ></span>
            <img
              style={{
                width: '100%',
                maxHeight: '120px',
                objectFit: 'contain',
                borderRadius: '5px',
              }}
              src={row.photo ? row.photo : null}
              alt='some_outfit'
            />
          </div>
          <h2
            style={{ margin: '20px', fontFamily: 'cursive', fontSize: '30px' }}
          >
            {row.type}
          </h2>
        </div>
        <h2 style={{ flexDirection: 'row' }}>Comments({row.com_count})</h2>
        <ul>
          {row.coms &&
            row.coms
              .slice(0, -5)
              .split('-^-^-,')
              .map((c, i) => (
                <li key={i}>
                  {c}
                  <button
                    type='button'
                    className='dlt'
                    onClick={() =>
                      handleDeleteComment(row.coms_id.split(',')[i])
                    }
                  >
                    <svg>
                      <use href='#Delete' />
                    </svg>
                  </button>
                </li>
              ))}
        </ul>
      </div>
    </>
  );
}

export default Row;
