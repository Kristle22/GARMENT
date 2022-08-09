import { useContext } from 'react';
import Row from './Row';
import BackContext from '../BackContext';

function List() {
  const { comments } = useContext(BackContext);

  return (
    <>
      <div className='heading'>
        <h2>COMMENTS</h2>
      </div>
      <div className='flex-card'>
        <div className=' com'>
          <h2>Admin Comments:</h2>
          {/* <h4>Image</h4>
          <h4>Type</h4>
          <h4>Price</h4> */}
        </div>
        {comments ? comments.map((c) => <Row key={c.id} row={c} />) : null}
      </div>
    </>
  );
}

export default List;
