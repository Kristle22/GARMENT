import { useEffect, useState, useReducer } from 'react';
import clothReducer from './clothReducer';
import FrontContext from './FrontContext';
import Nav from './Nav';
import Crud from './Components/Crud';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import OrderCreate from './Components/OrderCreate';
import HistoryList from './Components/HistoryList';

function Front({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [message, setMessage] = useState(null);

  const [clothes, dispachClothes] = useReducer(clothReducer, []);
  const [clothColors, setClothColors] = useState(null);

  const [orderModal, setOrderModal] = useState(null);
  const [orderCreate, setOrderCreate] = useState(null);
  const [orders, setOrders] = useState(null);

  const [createComment, setCreateComment] = useState(null);
  // const [createRates, setCreateRates] = useState(null);

  const [users, setUsers] = useState(null);

  const [sortPrice, setSortPrice] = useState(0);
  const [filter, setFilter] = useState(0);
  const [search, setSearch] = useState('');

  const [editData, setEditData] = useState(null);
  const [inCart, setInCart] = useState(null);
  const [offCart, setOffCart] = useState(null);

  const [orderClothIds, setOrderClothIds] = useState(null);

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
  console.log('ORDER FRONT', orders)

  // CREATE order
  // TAKE cloth Ids
  useEffect(() => {
    if (null === orderCreate) return;
    axios
      .post('http://localhost:3003/uzsakymai', orderCreate, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setOrderClothIds(orderCreate.clothIds)
        setLastUpdate(Date.now());
      });
  }, [orderCreate]);
  console.log('ORDER CREATE ', orderCreate);

  // Edit
  useEffect(() => {
    if (null === editData) return;
    axios
      .put('http://localhost:3003/rubai/' + editData.id, editData, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [editData]);

  useEffect(() => {
    if (null === orderClothIds) return;
    let lastId = { 'orderId': orders[orders.length - 1].orderId }
    console.log(lastId)
    orderClothIds.map(garmentID => {
      axios
        .put('http://localhost:3003/orderAssign/' + garmentID, lastId, authConfig())
        .then((res) => {
          // showMessage(res.data.msg);
          // setLastUpdate(Date.now());
        });
    });
  }, [orderClothIds, orders])

  // Edit clothes inCart
  useEffect(() => {
    if (null === inCart) return;
    axios
      .put('http://localhost:3003/krepselis/' + inCart.id, inCart, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [inCart]);

  // Edit clothes offCart
  useEffect(() => {
    if (null === offCart) return;

    offCart && offCart.map(item =>
      axios
        .put('http://localhost:3003/krepselisOff/' + item.id, item, authConfig())
        .then((res) => {
          showMessage(res.data.msg);
          setLastUpdate(Date.now());
        }));
  }, [offCart]);

  // CREATE Comments
  useEffect(() => {
    if (null === createComment) return;
    axios
      .post(
        'http://localhost:3003/front/komentarai',
        createComment,
        authConfig()
      )
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [createComment]);

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
        setCreateComment,
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
        setEditData,
        setInCart,
        setOffCart,
        offCart,
        setOrders,

      }}
    >
      {show === 'my-cart' ? (
        <div className="container">
          <Nav />

          <OrderCreate />
        </div>
      ) : show === 'welcome' ? (
        <Crud />
      ) : show === 'orders-history' ? (
        <div className="container">
          <Nav />
          <HistoryList />
        </div>
      ) : null}
    </FrontContext.Provider>
  );
}

export default Front;
