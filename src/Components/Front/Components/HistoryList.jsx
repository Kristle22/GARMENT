import { useContext } from 'react';
import FrontContext from '../FrontContext';

function HistoryList() {
  const {
    orders,
    // setOrderModal, 
    userId,
    getUser } =
    useContext(FrontContext);

  // const totalSum = orders.filter((or) => or.user_name === getUser()).map(or => or.orderSum).reduce((acc, total) => acc + total, 0);

  // const handleModal = () => {
  //   setOrderModal({
  //   });
  // };
  // console.log(orderModal);

  return (
    <>
      <h1 className='heading'>Orders History</h1>
      <div className='flex-col mrg'>
        <div className='frame'>
          <p className='heading small'>The total Sum of your orders: <i>{orders ? orders.filter((or) => or.user_name === getUser()).map(or => or.orderSum).reduce((acc, total) => acc + total) : null}</i> Eur.</p>
          {orders &&
            orders
              .filter((order) => order.user_id === userId())
              .map((ord) =>
                ord.status === 1 ? (
                  <div className='frame info confirm'>
                    <svg>
                      <use href='#Confirm' />
                    </svg>
                    <h2>ORDER Nr.{ord.orderId} CONFIRMED!</h2>
                    <span>
                      We've received your order and will contact you as soon as
                      your package is shipped.
                    </span>
                    <p className='order'>
                      Estimated delivery date <i>after 2-3 weeks</i>;
                    </p>
                    <i>Placed on {new Date(ord.date).toLocaleString()}</i>
                  </div>
                ) : (
                  <div className='frame info pending'>
                    <svg>
                      <use href='#Pending' />
                    </svg>
                    <p className='order'>
                      <i>{getUser()}</i>, thank's for your order!
                    </p>
                    <span>You will receive an email confirmation shortly.</span>
                    <h2>
                      Your order Nr.{ord.orderId} is pending for confirmation...
                    </h2>
                    <i>Placed on {new Date(ord.date).toLocaleString()}</i>
                  </div>
                )
              )}
        </div>
      </div>
    </>
  );
}

export default HistoryList;
