import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import './crud.css';
import Back from './Components/Back/Back';
import Front from './Components/Front/Front';
import { login, logout, authConfig } from './Functions/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/logout' element={<LogoutPage />} />
        <Route
          path='/'
          element={
            <RequireAuth role='user'>
              <Front show='welcome' />
            </RequireAuth>
          }
        />
        <Route
          path='/my-cart'
          element={
            <RequireAuth role='user'>
              <Front show='my-cart' />
            </RequireAuth>
          }
        />
        <Route
          path='/orders-history'
          element={
            <RequireAuth role='user'>
              <Front show='orders-history' />
            </RequireAuth>
          }
        />
        <Route
          path='/admin'
          element={
            <RequireAuth role='admin'>
              <Back show='admin' />
            </RequireAuth>
          }
        />
        <Route
          path='admin/colors'
          element={
            <RequireAuth role='admin'>
              <Back show='colors' />
            </RequireAuth>
          }
        />
        <Route
          path='/admin/garments'
          element={
            <RequireAuth role='admin'>
              <Back show='garments' />
            </RequireAuth>
          }
        />
        <Route
          path='/admin/orders'
          element={
            <RequireAuth role='admin'>
              <Back show='orders' />
            </RequireAuth>
          }
        />
        <Route
          path='/admin/comments'
          element={
            <RequireAuth role='admin'>
              <Back show='comments' />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

////////////////REQUIRE AUTH////////////
function RequireAuth({ children, role }) {
  const [view, setView] = useState(<h2>Please wait...</h2>);

  useEffect(() => {
    axios
      .get('http://localhost:3003/login-check?role=' + role, authConfig())
      .then((res) => {
        if ('ok' === res.data.msg) {
          setView(children);
        } else {
          setView(<Navigate to='/login' replace />);
        }
      });
  }, [children, role]);

  return view;
}

//////////////////LOGIN PAGE////////////

function LoginPage() {
  const navigate = useNavigate();

  const [pass, setPass] = useState('');
  const [user, setUser] = useState('');
  const doLogin = () => {
    axios.post('http://localhost:3003/login', { user, pass }).then((res) => {
      localStorage.setItem('username', user);
      if ('ok' === res.data.msg) {
        login(res.data.key);
        navigate('/', { replace: true });
      }
    });
  };
  return (
    <div
      className='login'
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        margin: '50px auto',
        maxWidth: '650px',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '5px',
        padding: '20px 0',
        color: '#fff',
        border: '2px solid #a9a090',
        backgroundColor: '#68891dcf',
        boxShadow: '-50px 100px 200px #a9b999',
      }}
    >
      <div
        style={{
          width: '50%',
          fontFamily: 'cursive',
          fontSize: '26px',
        }}
      >
        Name:{' '}
        <input
          style={{
            padding: '7px',
            borderRadius: '5px',
            border: '2px solid #a9baa0',
            backgroundColor: '#a9baab9b',
          }}
          type='text'
          value={user}
          onChange={(e) => setUser(e.target.value)}
        ></input>
      </div>
      <div style={{ width: '50%', fontFamily: 'cursive', fontSize: '26px' }}>
        Password:{' '}
        <input
          className='btn'
          style={{
            padding: '7px',
            borderRadius: '5px',
            border: '2px solid #a9baa0',
            backgroundColor: '#a9baab9b',
          }}
          type='password'
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        ></input>
      </div>
      <button
        className=''
        onClick={doLogin}
        style={{
          width: '15%',
          alignSelf: 'center',
          cursor: 'pointer',
          borderRadius: '7px',
          padding: '7px',
          color: '#fff',
          backgroundColor: '#bb311999',
          border: 'none',
        }}
      >
        Login
      </button>
    </div>
  );
}

//////////////LOGOUT PAGE///////////
function LogoutPage() {
  useEffect(() => logout(), []);
  return <Navigate to='/login' replace />;
}

export default App;
