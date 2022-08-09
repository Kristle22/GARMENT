import { useContext } from 'react';
import FrontContext from '../FrontContext';
import Comment from './Comment';
import Rating from './Rating';

function Row({ row }) {
  const {
    setInCart,
  } = useContext(FrontContext);

  const addToCart = () => {
    setInCart({ id: row.id, inCart: 1 });
  };

  return (
    <>
      <div className='flex-row user-4 frame'>
        <div>
          <img
            className='img-box'
            src={row.photo ? row.photo : require('../../../img/noimg.png')}
            alt='some_outfit'
          />
        </div>

        <p style={{ position: 'relative' }}>
          {' '}
          <span
            className='color-ball'
            style={{
              backgroundColor: row.hexCode ? row.hexCode : null,
            }}
          ></span>
          {row.clothColor}
        </p>
        <p className='heading'>{row.type}</p>
        <p className='prc'>{Number(row.price).toFixed(2)} Eur.</p>
      </div>
      <div className='btns'>
        <button type='button' className='put' onClick={addToCart}>
          <svg>
            <use href='#cart' />
          </svg>
        </button>
      </div>
      <div className="flex">
        <Comment row={row} />
        <Rating row={row} />
      </div>
    </>
  );
}

export default Row;
