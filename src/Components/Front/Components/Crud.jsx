import Nav from '../Nav';
import List from './List';
import Message from '../Message';

function Crud() {
  return (
    <>
      <div className='container'>
        <Nav />
        <List />
        <Message />
      </div>
    </>
  );
}

export default Crud;
