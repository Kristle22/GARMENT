import { useEffect, useState, useReducer } from 'react';
import clothReducer from './clothReducer';
import BackContext from './BackContext';
import Nav from './Nav';
import ColorsCrud from './Colors/Crud';
import GarmentCrud from './Garment/Crud';
import OrdersCrud from './Orders/Crud';
import CommentsCrud from './Comments/Crud';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';

function Back({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [message, setMessage] = useState(null);

  const [createData, setCreateData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  const [clothes, dispachClothes] = useReducer(clothReducer, []);

  const [clothColors, setClothColors] = useState(null);
  const [createClothColor, setCreateClothColor] = useState(null);
  const [deleteClothColor, setDeleteClothColor] = useState(null);

  const [deletePhoto, setDeletePhoto] = useState(null);

  const [orders, setOrders] = useState(null);
  const [deleteOrder, setDeleteOrder] = useState(null);
  const [status, setStatus] = useState(0);

  const [sortPrice, setSortPrice] = useState('0');
  const [filter, setFilter] = useState(0);
  const [search, setSearch] = useState('');

  // Optional state
  const [comments, setComments] = useState(null);
  // const [deleteCom, setDeleteCom] = useState(null);

  const sorting = (e) => {
    const sortOrder = e.target.value;
    setSortPrice(sortOrder);
    const action = {
      type: sortOrder,
    };
    dispachClothes(action);
  };

  const showMessage = (mes) => {
    setMessage(mes);
    setTimeout(() => setMessage(null), 5000);
  };
  // ///////////AXIOS Garment////////
  // Read
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

  // Create
  useEffect(() => {
    if (null === createData) return;
    axios
      .post('http://localhost:3003/rubai', createData, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [createData]);

  // Delete
  useEffect(() => {
    if (null === deleteData) return;
    axios
      .delete('http://localhost:3003/rubai/' + deleteData.id, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  // Delete Photo
  useEffect(() => {
    if (null === deletePhoto) return;
    axios
      .delete('http://localhost:3003/nuotrauka/' + deletePhoto.id, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [deletePhoto]);

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

  // /////////////AXIOS Colors///////
  // READ Colors
  useEffect(() => {
    axios.get('http://localhost:3003/spalvos', authConfig()).then((res) => {
      setClothColors(res.data);
    });
  }, [lastUpdate]);

  // Create Colors
  useEffect(() => {
    if (null === createClothColor) return;
    axios
      .post('http://localhost:3003/spalvos', createClothColor, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [createClothColor]);

  // Delete colors
  useEffect(() => {
    if (null === deleteClothColor) return;
    axios
      .delete('http://localhost:3003/spalvos/' + deleteClothColor.id, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [deleteClothColor]);

  // READ Comments
  useEffect(() => {
    axios.get('http://localhost:3003/komentarai', authConfig()).then((res) => {
      setComments(res.data);
    });
  }, [lastUpdate]);

  // DELETE COMMENT
  const handleDeleteCom = (id) => {
    axios
      .delete('http://localhost:3003/komentarai/' + id, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  };

  // Read orders
  useEffect(() => {
    let query;
    if (!search) {
      query = '';
    } else {
      query = '?s=' + search;
    }
    axios
      .get('http://localhost:3003/uzsakymai' + query, authConfig())
      .then((res) => {
        setOrders(res.data);
      });
  }, [lastUpdate, search]);

  // Edit order STATUS
  useEffect(() => {
    if (null === status) return;
    axios
      .put('http://localhost:3003/uzsakymai/' + status.id, status, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [status]);

  // Delete order
  useEffect(() => {
    if (null === deleteOrder) return;
    axios
      .delete('http://localhost:3003/uzsakymai/' + deleteOrder.id, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [deleteOrder]);

  return (
    <BackContext.Provider
      value={{
        clothes,
        setCreateData,
        setDeleteData,
        modalData,
        setModalData,
        setEditData,
        sortPrice,
        sorting,
        filter,
        setFilter,
        setSearch,
        message,
        clothColors,
        setClothColors,
        setCreateClothColor,
        setDeleteClothColor,
        orders,
        setDeletePhoto,
        setStatus,
        setDeleteOrder,
        handleDeleteCom,
        comments,
      }}
    >
      {show === 'admin' ? (
        <>
          <div className='container admin'>
            <Nav />
            <img
              src={require('../../img/HGC.png')}
              alt='company logo'
              style={{
                borderRadius: '5px',
                maxWidth: '350px',
                marginTop: '105px',
              }}
            />
          </div>
        </>
      ) : show === 'colors' ? (
        <ColorsCrud />
      ) : show === 'garments' ? (
        <GarmentCrud />
      ) : show === 'orders' ? (
        <OrdersCrud />
      ) : show === 'comments' ? (
        <CommentsCrud />
      ) : null}
    </BackContext.Provider>
  );
}

export default Back;
