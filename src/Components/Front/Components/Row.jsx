import { useContext } from 'react';
import FrontContext from '../FrontContext';
// import OrderCreate from './OrderCreate';

function Row({ row }) {
  const {
    setInCart,
    // setCreateComment,
    // setCreateRates,
  } = useContext(FrontContext);

  // const [comment, setComment] = useState('');
  // const [rate, setRate] = useState('5');

  // const handleComment = () => {
  //   setCreateComment({
  //     comment,
  //     id: row.id,
  //   });
  //   setComment('');
  // };
  // const rateNow = (e) => {
  //   setRate(e.target.value);
  //   setCreateRates({ rate: parseInt(e.target.value), id: row.id });
  // };

  return (
    <>
      <div className='flex-row user frame'>
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
        <p>{row.type}</p>
        <p className='prc'>{Number(row.price).toFixed(2)} Eur.</p>
      </div>
      <div className='btns'>
        <button
          type='button'
          className='put'
          onClick={() => setInCart({ id: row.id })}
        >
          <svg>
            <use href='#cart' />
          </svg>
        </button>
      </div>
    </>
  );
}

export default Row;
