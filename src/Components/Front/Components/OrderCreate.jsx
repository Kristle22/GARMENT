import { useEffect, useContext } from 'react';
import FrontContext from '../FrontContext';

function Create({ setSize, setUserCom }) {
  const {
    orderModal,
    setOrderModal,
    setOrderCreate,
    showMessage,
    users,
    getUser,
  } = useContext(FrontContext);

  useEffect(() => {
    if (null === orderModal) {
      return;
    }
  }, [orderModal]);
  console.log(orderModal);
  const handleReserve = () => {
    // if (size === '') {
    //   showMessage({
    //     text: 'Prasau uzpildykite privalomus laukelius',
    //     type: 'info',
    //   });
    //   return;
    // }
    const userId =
      users.filter((user) => user.name === getUser())[0]?.id ?? null;
    const data = {
      items: orderModal.items,
      size: orderModal.size,
      userCom: orderModal.userCom,
      userId,
    };
    setOrderCreate(data);
    console.log('ORDER DATA', data);
    setOrderModal(null);
    setSize(0);
    setUserCom('');
  };
  if (null === orderModal) {
    return null;
  }

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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                color: '#fff',
              }}
            >
              <h4>ORDER DETAILS: {orderModal.price}</h4>
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
    </>
  );
}

export default Create;
