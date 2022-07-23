import { useContext } from 'react';
import BackContext from '../BackContext';
import Edit from '../Garment/Edit';

function Order({ order }) {
  const { setDeleteOrder, setStatus } = useContext(BackContext);
  console.log('BACK ORDER', order);
  const handleConfirm = () => {
    setStatus({ id: order.id });
  };

  const handleDelete = () => {
    setDeleteOrder({ id: order.id });
  };
  return (
    <>
      <div className='flex-row order frame'>
        <p>{order.id}</p>
        <div className='img-box'>
          <img
            src={order.img ? order.img : require('../../../img/noimg.png')}
            alt='new outfit'
          />
        </div>
        <p>{order.cloth}</p>
        <p>{order.colorId}</p>
        <p>{order.size}</p>
        <p>{order.prc && order.prc.toFixed(2)} Eur.</p>
        <p className='prc'>{order.userCom}</p>
        <p>{order.mail}</p>
        <p>
          {JSON.stringify(new Date(order.date)).slice(1, -6).replace('T', ' ')}
        </p>
      </div>
      <div className='btns order'>
        {order.status === 1 ? (
          <button
            type='button'
            className='edt book'
            onClick={handleConfirm}
            style={{
              fontSize: '12px',
              width: '65px',
              height: '65px',
              boxShadow: '5px 5px 15px #232424d1',
            }}
          >
            CONFIRMED
          </button>
        ) : (
          <button
            type='button'
            className='edt book'
            onClick={handleConfirm}
            style={{
              fontSize: '12px',
              width: '65px',
              height: '65px',
              backgroundColor: '#bec6c897',
              border: '3px solid #777c8a',
              boxShadow: '5px 5px 15px #232424d1',
            }}
          >
            NOT CONFIRMED
          </button>
        )}
        <button
          type='button'
          className='dlt book'
          onClick={handleDelete}
          style={{
            fontSize: '14px',
            width: '65px',
            height: '65px',
            boxShadow: '5px 5px 15px #232424d1',
          }}
        >
          REM-OVE
        </button>
      </div>

      <Edit />
    </>
  );
}

export default Order;
