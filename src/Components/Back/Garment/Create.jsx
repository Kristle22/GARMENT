import { useRef } from 'react';
import { useContext, useState } from 'react';
import BackContext from '../BackContext';
import getBase64 from '../../../Functions/getBase64';

function Create() {
  const { setCreateData, clothColors, showMessage } = useContext(BackContext);

  const [color, setColor] = useState(0);
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');

  const fileInput = useRef();
  const [image, setImage] = useState(null);

  const showImage = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setImage(photo))
      .catch((_) => {
        showMessage({ text: 'failo pasirinkimas atsauktas!', type: 'danger' });
      });
  };

  const changeColor = (e) => {
    setColor(e.target.value);
  };

  const handleCreate = () => {
    const data = {
      color: parseInt(color),
      type,
      price: parseFloat(price),
      photo: image,
    };
    setCreateData(data);
    setColor(0);
    setType('');
    setPrice('');
    setImage(null);
    fileInput.current.value = null;
  };

  return (
    <>
      <div
        className='form-container'
        style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}
      >
        <div className='imghere'></div>
        {image ? (
          <div
            style={{
              width: '50%',
              margin: '10px 20px',
            }}
          >
            <img
              style={{
                width: '100%',
                maxHeight: '450px',
                borderRadius: '5px',
                objectFit: 'contain',
              }}
              src={image}
              alt='scooter'
            />
          </div>
        ) : null}
        <div className='form create'>
          <h3>Enter characteristic of the garment</h3>
          <form>
            <select value={color} onChange={changeColor}>
              <option defaultValue='0'>Choose color</option>
              {clothColors
                ? clothColors.map((c) => (
                    <option
                      key={c.id}
                      value={c.id}
                      style={{
                        backgroundColor: c.title,
                      }}
                    >
                      {c.title} / {c.hex_code}
                    </option>
                  ))
                : null}
            </select>
            <label>Type:</label>
            <input
              className='create'
              type='text'
              onChange={(e) => {
                setType(e.target.value);
              }}
              value={type}
              placeholder='Enter type of the garment...'
            />
            <label>Price:</label>
            <input
              className='create'
              type='text'
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              value={price}
              placeholder='... Eur.'
            />
            <div>
              <label>Photo</label>
              <input ref={fileInput} type='file' onChange={showImage} />
              <small style={{ fontSize: '12px', float: 'left' }}>
                Upload Photo.
              </small>
            </div>
            <div className='btns add'>
              <button type='button' className='put' onClick={handleCreate}>
                <svg>
                  <use href='#Add' />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;
