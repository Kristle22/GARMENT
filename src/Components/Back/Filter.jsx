import { useContext, useState } from 'react';
import BackContext from './BackContext';

function Filter() {
  const { setFilter, clothColors } = useContext(BackContext);
  const [color, setColor] = useState(0);

  const filtering = (e) => {
    setColor(e.target.value);
    setFilter(Number(e.target.value));
  };

  return (
    <>
      <select
        className='sorting'
        value={color}
        onChange={filtering}
        style={{ maxWidth: '160px' }}
      >
        <option value='0'>Color</option>
        {clothColors &&
          clothColors.map((col) => (
            <option key={col.id} value={col.id}>
              {col.title}
            </option>
          ))}
      </select>
    </>
  );
}

export default Filter;
