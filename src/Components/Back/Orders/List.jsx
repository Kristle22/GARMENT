import Order from './Order';
import { useContext } from 'react';
import BackContext from '../BackContext';

function List() {
  const { orders } = useContext(BackContext);

  return (
    <>
      <div className='heading'>
        <h2>List of Orders:</h2>
      </div>
      {/* <Search /> */}
      <div className='flex-card'>
        <div className='flex-row order list'>
          <p>Order ID</p>
          <p>Image</p>
          <p>Type</p>
          <p>Color Id</p>
          <p>Size</p>
          <p>Price</p>
          <p>Comment</p>
          <p>Email</p>
          <p>Date</p>
        </div>
        {orders && orders.map((o) => <Order key={o.id} order={o} />)}
      </div>
    </>
  );
}

export default List;
