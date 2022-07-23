import { useContext, useState } from 'react';
import FrontContext from '../FrontContext';
import OrderCreate from './OrderCreate';

function OrderList() {
  const { clothes, orders, setOrderModal, userId, getUser } =
    useContext(FrontContext);
  // console.log(userId);

  // const curOrder = orders.filter((or) => or.user_id === userId());

  const clothIds = clothes.filter((cl) => cl.inCart === 1).map((cl) => cl.id);
  console.log('ORDER_ID', clothIds);

  const cloth = clothes.filter((cl) => cl.inCart === 1);
  console.log('CLOTH', cloth);

  const orderSum = cloth.reduce((acc, total) => acc + total.price, 0);

  const handleModal = () => {
    setOrderModal({
      items: cloth,
      size,
      userCom,
    });
  };

  const [size, setSize] = useState(0);
  const [userCom, setUserCom] = useState('');

  const changeSize = (id) => {
    setSize(id);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
        }}
      >
        <div
          className='flex-card front'
          style={{ padding: '20px', width: '60%' }}
        >
          {clothes.map((cl, i) =>
            cl.inCart === 1 ? (
              <div className='flex-row cart frame'>
                <img className='img-box' src={cl.photo} alt='new outfit' />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <h4
                    style={{
                      fontFamily: 'cursive',
                      fontSize: '24px',
                      padding: 0,
                    }}
                  >
                    {cl.type}
                  </h4>
                  <i>{cl.clothColor}</i>
                  <p className='order'>{cl.price.toFixed(2)} Eur</p>
                </div>
                <div>
                  <div style={{ textAlign: 'left' }}>
                    <label>Choose Size:</label>
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      // onChange={() => changeSize(cloth.split(',')[0])}
                      style={{
                        display: 'block',
                        padding: '3px 5px',
                        borderRadius: '5px',
                        backgroundColor: '#8a858571',
                        width: 'fit-content',
                      }}
                    >
                      <option defaultValue='0'>Select size</option>
                      <option value='XS'>XS</option>
                      <option value='S'>S</option>
                      <option value='M'>M</option>
                      <option value='L'>L</option>
                      <option value='XL'>XL</option>
                      <option value='XXL'>XXL</option>
                    </select>
                  </div>
                  <div className='btns reg'>
                    {/* <i style={{ fontSize: '16px' }}>*required fields</i> */}
                  </div>
                </div>
              </div>
            ) : null
          )}
          <h2 className='frame' style={{ textAlign: 'left' }}>
            Total price:{' '}
            <b>
              <u>{orderSum.toFixed(2)}</u> Eur.
            </b>
          </h2>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '15px',
          }}
        >
          <div>
            {orders &&
              orders.map((or) =>
                or.status === 1 && or.user_id === userId() ? (
                  <div className='frame info confirm'>
                    <svg>
                      <use href='#Confirm' />
                    </svg>
                    <h2>It's CONFIRMED!</h2>
                    <span>Placed on {new Date(or.date).toDateString()}</span>
                    <p className='order'>
                      Estimated delivery date <i>after 2-3 weeks</i>;
                    </p>
                    <span>
                      We've received your order and will contact you as soon as
                      your package is shipped.
                    </span>
                  </div>
                ) : null
              )}
            {orders &&
              orders.map((or) =>
                or.status === 0 && or.user_id === userId() ? (
                  <div className='frame info pending'>
                    <svg>
                      <use href='#Pending' />
                    </svg>
                    <h2>Pending for confirmation...</h2>
                    <span>Placed on {new Date(or.date).toDateString()}</span>
                    <p className='order'>
                      <i>{getUser()}</i>, thank's for your order!
                    </p>
                    <span>You will receive an email confirmation shortly.</span>
                  </div>
                ) : null
              )}
          </div>
          <div className='frame'>
            <div className='order'>
              <label>Comment</label>
              <textarea
                value={userCom}
                onChange={(e) => setUserCom(e.target.value)}
                placeholder='Write your comment here...'
              ></textarea>
            </div>
            <button type='button' className='order' onClick={handleModal}>
              Place your ORDER{' '}
              <svg>
                <use href='#Odered' />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <OrderCreate setSize={setSize} setUserCom={setUserCom} />
    </>
  );
}

export default OrderList;
