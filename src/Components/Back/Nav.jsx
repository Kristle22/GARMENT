import { Link, NavLink } from 'react-router-dom';
import Message from './Message';

function Nav() {
  return (
    <>
      <nav className='nav'>
        <NavLink
          to='/admin/'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          Admin
        </NavLink>
        <NavLink
          to='/admin/garments'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          Garments
        </NavLink>
        <NavLink
          to='/admin/orders'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          Orders
        </NavLink>
        {/* <NavLink
          to='/admin/comments'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          Comments
        </NavLink> */}
        <Link
          to='/logout'
          style={{ width: '14%', textDecoration: 'underline' }}
        >
          Logout
        </Link>
      </nav>
      <Message />
    </>
  );
}

export default Nav;
