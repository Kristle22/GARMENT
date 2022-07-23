import { useEffect, useState, useReducer } from 'react';
import clothReducer from './clothReducer';
import FrontContext from './FrontContext';
import Nav from './Nav';
import Crud from './Components/Crud';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import OrderList from './Components/OrderList';

function Front({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [message, setMessage] = useState(null);

  const [clothes, dispachClothes] = useReducer(clothReducer, []);
  const [clothColors, setClothColors] = useState(null);

  const [orderModal, setOrderModal] = useState(null);
  const [orderCreate, setOrderCreate] = useState(null);
  const [orders, setOrders] = useState(null);

  // const [createComment, setCreateComment] = useState(null);
  // const [createRates, setCreateRates] = useState(null);

  const [users, setUsers] = useState(null);

  const [sortPrice, setSortPrice] = useState('0');
  const [filter, setFilter] = useState(0);
  const [search, setSearch] = useState('');

  const [inCart, setInCart] = useState(0);
  const showMessage = (mes) => {
    setMessage(mes);
    setTimeout(() => setMessage(null), 5000);
  };

  const sorting = (e) => {
    const sortOrder = e.target.value;
    setSortPrice(sortOrder);
    const action = {
      type: sortOrder,
    };
    dispachClothes(action);
  };

  // Read FRONT garment
  useEffect(() => {
    let query;
    if (filter === 0 && !search) {
      query = '';
    } else if (filter) {
      query = '?color-id=' + filter;
    } else if (search) {
      query = '?s=' + search;
    }

    axios
      .get('http://localhost:3003/rubai' + query, authConfig())
      .then((res) => {
        const action = {
          type: 'cloth_list',
          payload: res.data,
        };
        dispachClothes(action);
      });
  }, [lastUpdate, filter, search]);

  // Read FRONT colors
  useEffect(() => {
    axios.get('http://localhost:3003/spalvos', authConfig()).then((res) => {
      setClothColors(res.data);
    });
  }, [lastUpdate]);

  // Read FRONT users
  useEffect(() => {
    axios.get('http://localhost:3003/users', authConfig()).then((res) => {
      setUsers(res.data);
    });
  }, [lastUpdate]);

  // Read FRONT orders
  useEffect(() => {
    axios.get('http://localhost:3003/uzsakymai', authConfig()).then((res) => {
      setOrders(res.data);
    });
  }, [lastUpdate]);

  // CREATE order
  useEffect(() => {
    if (null === orderCreate) return;
    axios
      .post('http://localhost:3003/uzsakymai', orderCreate, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [orderCreate]);

  // Edit clothes inCart
  useEffect(() => {
    if (null === inCart) return;
    axios
      .put('http://localhost:3003/rubai/' + inCart.id, inCart, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [inCart]);

  // CREATE Comments
  // useEffect(() => {
  //   if (null === createComment) return;
  //   axios
  //     .post(
  //       'http://localhost:3003/front/komentarai',
  //       createComment,
  //       authConfig()
  //     )
  //     .then((res) => {
  //       showMessage(res.data.msg);
  //       setLastUpdate(Date.now());
  //     });
  // }, [createComment]);

  // // CREATE RATING
  // useEffect(() => {
  //   if (null === createRates) return;
  //   axios
  //     .put(
  //       'http://localhost:3003/front/reitingai/' + createRates.id,
  //       createRates,
  //       authConfig()
  //     )
  //     .then((res) => {
  //       console.log('RATE', res.data);
  //       showMessage(res.data.msg);
  //       setLastUpdate(Date.now());
  //     });
  // }, [createRates]);

  function getUser() {
    return localStorage.getItem('username');
  }
  function userId() {
    const userId = users.filter((user) => user.name === getUser())[0].id;
    return userId;
  }
  // console.log(getUser(), userId());

  return (
    <FrontContext.Provider
      value={{
        clothes,
        clothColors,
        setOrderCreate,
        orderModal,
        setOrderModal,
        message,
        // setCreateComment,
        // setCreateRates,
        orders,
        showMessage,
        setFilter,
        setSearch,
        users,
        getUser,
        userId,
        sortPrice,
        sorting,
        setInCart,
      }}
    >
      {show === 'myaccount' ? (
        <div className='container'>
          <Nav />
          <h2>Your Orders</h2>
          <OrderList />
        </div>
      ) : show === 'welcome' ? (
        <Crud />
      ) : null}
    </FrontContext.Provider>
  );
}

export default Front;
