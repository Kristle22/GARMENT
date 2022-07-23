import { useContext } from 'react';
import Row from './Row';
import FrontContext from '../FrontContext';
import SortBtns from '../SortBtns';
import Filter from '../Filter';
import Search from '../Search';

function List() {
  const { clothes } = useContext(FrontContext);

  return (
    <>
      <div className='front-logo'></div>
      <div className='flex-card front'>
        <div style={{ display: 'flex' }}>
          <Filter />
          <SortBtns />
          <Search />
        </div>
        <div className='flex-row user'>
          <h4>Image</h4>
          <h4>Color</h4>
          <h4>Type</h4>
          <h4>Price</h4>
        </div>
        {clothes ? clothes.map((c) => <Row key={c.id} row={c} />) : null}
      </div>
    </>
  );
}

export default List;
