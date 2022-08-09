import { useContext, useState } from 'react';
import FrontContext from '../FrontContext';

function Rating({ row }) {
  const { setCreateRates } = useContext(FrontContext);

  const [rate, setRate] = useState('5');

  const rateNow = (e) => {
    setRate(e.target.value);
    setCreateRates({ rate: Number(e.target.value), id: row.id })
  }

  return (
    <div className='com'>
      <form>
        <div className='rateIt'>
          <img src={require('../../../img/rate-us.png')} alt='rate us' />
          <select value={rate} onChange={rateNow}>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={10 - i}>
                {10 - i} *
              </option>
            ))}
          </select>
        </div>
        <h1>
          <b>
            <svg>
              <use href='#rating' />
            </svg>
          </b>
          {row.rate_sum ? (row.rate_sum / row.rates).toFixed(2) : '0.00'}
        </h1>
      </form>
    </div>
  )
}

export default Rating;