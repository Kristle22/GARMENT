import { useContext } from 'react';
import BackContext from '../BackContext';
import Order from './Order';

function List() {
  const { orders } = useContext(BackContext);
  console.log('ORDERS', orders);

  return (
    <>
      <div className='heading'>
        <h2>List of Orders:</h2>
      </div>
      {/* <Search /> */}
      <div className='flex-card'>
        <div className="container flex-row">
          <div className='flex-row order-9 line'
            style={{ width: '80%', marginLeft: '10px' }}
          >
            <h5>Order ID</h5>
            <h5>Date</h5>
            <h5>Cloth Ids</h5>
            <h5>Total Sum</h5>
            <h5>Name</h5>
            <h5>Email</h5>
            <h5>Comment</h5>
          </div>
        </div>
        {orders &&
          orders.map((order) => <Order key={order.id} order={order} />)}
      </div>
    </>
  );
}

export default List;
