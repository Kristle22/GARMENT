import Nav from '../Nav';
import Create from './Create';
import List from './List';
import Edit from './Edit';
// import Statistic from './Statistic';

function Crud() {
  return (
    <>
      <div className='container'>
        <Nav />
        <Create />
        {/* <Statistic /> */}
        <List />
        <Edit />
      </div>
    </>
  );
}

export default Crud;
