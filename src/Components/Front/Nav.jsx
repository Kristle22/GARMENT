import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import FrontContext from './FrontContext';
import Message from './Message';

function Nav() {
  const { getUser } = useContext(FrontContext);
  return (
    <>
      <nav className='nav'>
        <NavLink
          to='/'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          Welcome, {getUser()}
        </NavLink>
        <Link
          to='/logout'
          style={{ width: '14%', textDecoration: 'underline' }}
        >
          Logout
        </Link>
        <NavLink
          to='/myaccount'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          <div style={{ position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                top: '-15px',
                right: '-5px',
                fontSize: '25px',
                fontFamily: 'cursive',
                color: 'crimson',
              }}
            >
              3
            </span>
            <svg className='edt cart'>
              <use href='#Shopping-cart' />
            </svg>
          </div>
        </NavLink>
      </nav>
      <Message />
    </>
  );
}

export default Nav;
