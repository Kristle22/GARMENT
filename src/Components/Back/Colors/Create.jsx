import { useContext, useState } from 'react';
import BackContext from '../BackContext';

function Create() {
  const { setCreateSomeSecond } = useContext(BackContext);

  const [title, setTitle] = useState('');

  const handleCreate = () => {
    const data = { title };
    setCreateSomeSecond(data);
    setTitle('');
  };
  return (
    <>
      <div className='form-container'>
        <div className='form color'>
          <h3>Insert Color</h3>
          <form>
            <label>Title</label>
            <input
              className='color'
              type='text'
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              placeholder='new color here...'
            />
            <button type='button' className='put' onClick={handleCreate}>
              <svg className='put'>
                <use href='#Add' />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;
