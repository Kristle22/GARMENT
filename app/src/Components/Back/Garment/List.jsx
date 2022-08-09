import { useContext } from 'react';
import Row from './Row';
import BackContext from '../BackContext';
import SortBtns from '../SortBtns';
import Filter from '../Filter';
import Search from '../Search';

function List() {
  const { clothes } = useContext(BackContext);

  return (
    <>
      <div className='heading'>
        <h2>Create new Garment</h2>
      </div>
      <div className='flex-card'>
        <div className='main-5'>
          <h4>Image</h4>
          <Filter />
          <h4>Hex Code</h4>
          <Search />
          <SortBtns />
        </div>
        {clothes ? clothes.map((r) => <Row key={r.id} row={r} />) : null}
      </div>
    </>
  );
}

export default List;
