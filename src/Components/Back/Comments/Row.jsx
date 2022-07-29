import { useContext } from 'react';
import BackContext from '../BackContext';

function Row({ row }) {
  const { handleDeleteCom } = useContext(BackContext);

  return (
    <>
      <div className='frame com flex-row feedback'>
        <div className="frame flex-nw">
          <img
            className='img-box'
            src={row.photo ? row.photo : null}
            alt='some_outfit'
          />
          <div>
            <h2>
              {row.type}
            </h2>
            <h3>
              {row.price} Eur.
            </h3>
          </div>
        </div>
        <div className='com'>
          <h2>Comments({row.com_count})</h2>
          <ul>
            {
              row.coms && row.coms.slice(0, -3).split('^-^,').map((c, i) => <li key={i}>{c}
                <button
                  type='button'
                  className='dlt'
                  onClick={() =>
                    handleDeleteCom(row.coms_id.split(',')[i])
                  }
                >
                  <svg>
                    <use href='#Delete' />
                  </svg>
                </button></li>)
            }
          </ul>
        </div>
      </div>
    </>
  );
}

export default Row;
