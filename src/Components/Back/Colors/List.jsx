import Row from './Row';
import { useContext } from 'react';
import BackContext from '../BackContext';

function List() {
  const { someSecond } = useContext(BackContext);
  return (
    <>
      <div className='heading' style={{ margin: '30px 0 0 0' }}>
        <h2>Available Colors</h2>
      </div>
      <ul>
        {someSecond ? someSecond.map((s) => <Row key={s.id} row={s} />) : null}
      </ul>
    </>
  );
}

export default List;
