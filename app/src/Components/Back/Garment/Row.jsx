import { useContext } from 'react';
import BackContext from '../BackContext';

function Row({ row }) {
  const { setDeleteData, setModalData } = useContext(BackContext);
  const handleDelete = () => {
    setDeleteData(row);
  };
  const handleModal = () => {
    setModalData(row);
  };

  return (
    <>
      <div className='main-5 frame'>
        <img
          src={row.photo ? row.photo : require('../../../img/noimg.png')}
          alt='some_outfit'
        />
        <p>{row.clothColor}</p>
        <div>
          <span
            className='color-ball'
            style={{
              backgroundColor: row.hexCode ? row.hexCode : null,
            }}
          ></span>
          <p>{row.hexCode}</p>
        </div>
        <p>{row.type}</p>
        <p>{Number(row.price).toFixed(2)} Eur.</p>
      </div>
      <div className='btns row'>
        <button type='button' className='edt' onClick={handleModal}>
          <svg>
            <use href='#Edit' />
          </svg>
        </button>
        <button type='button' className='dlt' onClick={handleDelete}>
          <svg>
            <use href='#Delete' />
          </svg>
        </button>
      </div>
    </>
  );
}

export default Row;

// {JSON.stringify(new Date(kolt.lastUsed))
//   .slice(1, -6)
//   .replace('T', ' ')}
