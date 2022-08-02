import { useContext } from 'react';
import BackContext from '../BackContext';

function Order({ order }) {
  const { setDeleteOrder, setStatus } = useContext(BackContext);

  const orderId = order.orderId;

  const handleConfirm = () => {
    setStatus({ id: orderId });
  };

  const handleDelete = () => {
    setDeleteOrder({ id: orderId });
  };
  // console.log('ORDER', order);

  return (
    <div className='container flex-row'>
      <div className='container frame'>
        <div className='flex-row order-9'>
          <p>{order.orderId}</p>
          <p>
            {JSON.stringify(new Date(order.date))
              .slice(1, -6)
              .replace('T', ' ')}
          </p>
          <i>'{order.cloth_ids}'</i>
          <p>{order.orderSum} Eur.</p>
          <p>{order.user_name}</p>
          <p>{order.mail}</p>
          <p className='prc'>{order.userCom}</p>
        </div>
        <h3 className='mrg'>Order details:</h3>
        <div className='flex-row frame'>
          <div
            className='flex-row line'
            style={{
              width: '100%'
            }}
          >
            <h5 style={{ width: '20px' }}>Cloth Id</h5>
            <h5 style={{ width: '50px' }}>Type and size</h5>
            <h5>Price</h5>
            <h5>Image</h5>
          </div>
          <div>
            {order.clothId &&
              order.clothId
                .split(',')
                .map((item) => <p style={{ padding: '20px 0' }}>{item}</p>)}
          </div>
          <div>
            {order.cloth &&
              order.cloth.split(',').map((item) => (
                <p style={{ padding: '20px 0' }}>
                  {item}, {order.size}
                </p>
              ))}
          </div>
          <div>
            {order.prc &&
              order.prc
                .split(',')
                .map((item) => <p style={{ padding: '20px 0' }}>{item}</p>)}
          </div>
          <div>
            {order.img &&
              order.img
                .split(' ,')
                .map((item) => (
                  <img className='img-box sm' src={item} alt='new outfit'></img>
                ))}
          </div>
        </div>
      </div>
      <div className='btns order'>
        {order.status === 1 ? (
          <button type='button' className='edt book' onClick={handleConfirm}>
            CONFIRMED
          </button>
        ) : (
          <button type='button' className='edt book pending' onClick={handleConfirm}>
            NOT CONFIRMED
          </button>
        )}
        <button type='button' className='dlt book' onClick={handleDelete}>
          REM-OVE
        </button>
      </div>
    </div>
  );
}

export default Order;
