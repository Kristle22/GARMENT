// import Message from '../Message';
import Nav from '../Nav';
import Create from './Create';
import List from './List';

function Crud() {
  return (
    <>
      <div className='container'>
        <Nav />
        <Create />
        <List />
      </div>
    </>
  );
}

export default Crud;
