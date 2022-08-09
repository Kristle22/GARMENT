// import Message from '../Message';
import Nav from '../Nav';
import Create from './Create';
import List from './List';

function Crud() {
  return (
    <>
      <div className='container'>
        <Nav />
        <div className='flex'>
          <Create />
          <List />
        </div>
      </div>
    </>
  );
}

export default Crud;
