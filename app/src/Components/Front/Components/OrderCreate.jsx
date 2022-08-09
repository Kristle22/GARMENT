import { useContext } from 'react';
import FrontContext from '../FrontContext';
import OrderModal from './OrderModal';

function OrderCreate() {

  const {
    clothes,
    setOrderModal,
  } = useContext(FrontContext);

  const clothIds = clothes.filter((cl) => cl.inCart === 1).map((cl) => cl.id);
  const joinIds = clothes.filter((cl) => cl.inCart === 1).map((cl) => cl.id).join(', ');

  const clothArr = clothes.filter((cl) => cl.inCart === 1);

  // const clothInCart = Object.assign({}, ...clothArr);
  // console.log('CIC', clothInCart);

  const orderSum = clothes.filter(cl => cl.inCart === 1).reduce((acc, total) => acc + total.price, 0);

  const handleModal = () => {
    setOrderModal(clothArr);
  };


  return (
    <>
      <h1 className='cart-heading'>Shopping Cart</h1>
      <div className='flex center cartimg'>
        <div className='flex-card cart' style={{ width: '70%' }}>
          {clothes.map((cl) =>
            cl.inCart === 1 ? (
              <div className='flex-row frame'>
                <img className='img-box' src={cl.photo} alt='new outfit' />
                <p className='heading'>{cl.type}</p>
                <i>{cl.clothColor}</i>
                <p className='order'>{cl.price.toFixed(2)} Eur</p>
              </div>
            ) : null
          )}
          <div className='btns-modal'>
            <h2 className='frame'>
              Total price:{' '}
              <b>
                <u>{orderSum.toFixed(2)}</u> Eur.
              </b>
            </h2>
            <button type='button' className='order' onClick={handleModal}>
              Place your ORDER{' '}
              <svg>
                <use href='#Odered' />
              </svg>
            </button>
          </div>
        </div>
        <OrderModal orderSum={orderSum} joinIds={joinIds} clothIds={clothIds} clothArr={clothArr} />
      </div>
    </>
  );
}

export default OrderCreate;
