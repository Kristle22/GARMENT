import { useContext } from 'react';
import Row from './Row';
import BackContext from '../BackContext';

function List() {
  const { some } = useContext(BackContext);

  return (
    <>
      <div className='heading'>
        <h2>COMMENTS</h2>
      </div>
      <div className='flex-card'>
        <div className='flex-row' style={{ width: '100%' }}>
          <h4>Image</h4>
          <h4>Type</h4>
        </div>
        {some ? some.map((r) => <Row key={r.id} row={r} />) : null}
      </div>
    </>
  );
}

export default List;
