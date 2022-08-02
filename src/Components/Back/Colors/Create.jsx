import { useContext, useState } from 'react';
import BackContext from '../BackContext';

function Create() {
  const { setCreateClothColor } = useContext(BackContext);

  const [title, setTitle] = useState('');
  const [hexCode, setHexCode] = useState('');
  console.log(hexCode);
  const handleCreate = () => {
    const data = { title, hexCode };
    setCreateClothColor(data);
    setTitle('');
    setHexCode('');
  };
  return (
    <>
      <div className='form-container' style={{ marginTop: '10px' }}>
        <div className='form'>
          <h3>Insert Color</h3>
          <form>
            <label>Title</label>
            <input
              type='text'
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              placeholder='new color here...'
            />
            <label>Hex Code</label>
            <div className='flex-row'>
              <input
                className='color'
                type='color'
                onChange={(e) => {
                  setHexCode(e.target.value);
                }}
                value={hexCode}
                placeholder='color hex code here...'
              />
              <h1>{hexCode}</h1>
            </div>
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
