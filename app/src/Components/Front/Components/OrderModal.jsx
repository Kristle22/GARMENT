import { useEffect, useContext, useState } from 'react';
import FrontContext from '../FrontContext';

function Create({ orderSum, joinIds, clothIds }) {
  const {
    orderModal,
    setOrderModal,
    setOrderCreate,
    showMessage,
    users,
    getUser,
    setOffCart,
  } = useContext(FrontContext);

  const [size, setSize] = useState(0);
  const [userCom, setUserCom] = useState('');

  useEffect(() => {
    if (null === orderModal) {
      return;
    }
  }, [orderModal]);

  const handleReserve = () => {
    if (size === '') {
      showMessage({
        text: 'Prasau nurodykite drabuzio dydi.',
        type: 'info',
      });
      return;
    }
    const userId =
      users.filter((user) => user.name === getUser())[0]?.id ?? null;


    const data = {
      // type: orderModal.type,
      // price: orderModal.price,
      // img: orderModal.photo,
      // color: orderModal.clothColor,
      clothId: orderModal.id,
      clothIds,
      size,
      userCom,
      joinIds,
      orderSum: Number(orderSum),
      userId,
    };
    setOrderCreate(data);
    console.log('ORDER DATA', data);
    setOrderModal(null);
    setSize(0);
    setUserCom('');
    setOffCart(orderModal);
  };
  if (null === orderModal) {
    return null;
  }
  console.log('modal', orderModal);

  return (
    <>
      <div className='modal-layer'>
        <div className='modal-cont reg'>
          <div className='modal reg'>
            <button
              type='button'
              className='close-x reg'
              onClick={() => setOrderModal(null)}
            >
              &times;
            </button>
            <div className='frame cartimg'>
              <div className='order left'>
                <div>
                  <div>
                    <label>Choose Size:*</label>
                    <select
                      className='order'
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    // onChange={() => changeSize(cloth.split(',')[0])
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
                  </div>
                </div>
                <label>Comment</label>
                <textarea
                  value={userCom}
                  onChange={(e) => setUserCom(e.target.value)}
                  placeholder='Write your message here...'
                ></textarea>
                <i style={{ fontSize: '16px' }}>*required fields</i>
              </div>
              <button
                type='button'
                className='close reg'
                onClick={() => setOrderModal(null)}
              >
                EXIT
              </button>
              <button type='button' className='put reg' onClick={handleReserve}>
                CON-FIRM!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;
