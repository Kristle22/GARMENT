import { useContext, useState } from 'react';
import FrontContext from './FrontContext';

function Search() {
  const { setSearch } = useContext(FrontContext);

  const [s, setS] = useState('');

  const searching = (e) => {
    setS(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <>
      <div className='search' style={{ maxWidth: '210px' }}>
        <input
          type='text'
          placeholder='Search by Type...'
          value={s}
          onChange={searching}
        />
      </div>
    </>
  );
}

export default Search;
