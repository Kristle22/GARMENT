import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import FrontContext from './FrontContext';
import Message from './Message';

function Nav() {
  const { getUser, clothes } = useContext(FrontContext);

  const countInCart = clothes.map(cl => cl.inCart).reduce((acc, total) => acc + total, 0);

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
        <NavLink
          to='/orders-history'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >Orders History</NavLink>
        <Link
          to='/logout'
          className='logout'>
          Logout
        </Link>
        <NavLink
          to='/my-cart'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          <div className='inCart'>
            <span>
              {countInCart && countInCart}
            </span>
            <svg className='edt nav-cart'>
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
