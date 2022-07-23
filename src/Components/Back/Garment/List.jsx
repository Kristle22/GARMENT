import { useContext } from 'react';
import Row from './Row';
import BackContext from '../BackContext';
// import SortBtns from './SortBtns';
// import Filter from './Filter';
// import Search from './Search';

function List() {
  const { clothes } = useContext(BackContext);

  return (
    <>
      <div className='heading'>
        <h2>Create new Garment</h2>
      </div>
      <div className='flex-card'>
        <div className='flex-row main'>
          <h4>Image</h4>
          <h4>Color</h4>
          <h4>Hex Code</h4>
          <h4>Type</h4>
          <h4>Price</h4>
          {/* <SortBtns />
          <Filter />
          <Search /> */}
        </div>
        {clothes ? clothes.map((r) => <Row key={r.id} row={r} />) : null}
      </div>
    </>
  );
}

export default List;
