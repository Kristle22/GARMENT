import { useState, useEffect, useContext } from 'react';
import BackContext from '../BackContext';
import { useRef } from 'react';
import getBase64 from '../../../Functions/getBase64';

function Edit() {
  const {
    modalData,
    setModalData,
    setEditData,
    clothColors,
    showMessage,
    setDeletePhoto,
  } = useContext(BackContext);

  const [color, setColor] = useState(0);
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');

  const fileInput = useRef();
  const [image, setImage] = useState(null);

  const changeColor = (e) => {
    setColor(e.target.value);
  };

  // console.log(modalData);
  const showImage = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setImage(photo))
      .catch((_) => {
        showMessage({ text: 'failo pasirinkimas atsauktas!', type: 'danger' });
      });
  };

  const handleDeletePhoto = () => {
    setDeletePhoto({ id: modalData.id });
    setModalData((p) => ({ ...p, photo: null }));
  };

  useEffect(() => {
    if (null === modalData) {
      return;
    }
    setColor(
      clothColors.filter((c) => modalData.clothColor === c.title)[0]?.id ?? null
    );
    setType(modalData.type);
    setPrice(Number(modalData.price));
    setImage(modalData.photo);
  }, [modalData, clothColors]);

  const handleEdit = () => {
    const data = {
      id: modalData.id,
      type,
      price,
      photo: image,
      color,
    };
    setEditData(data);
    console.log(data);
    setModalData(null);
  };
  if (null === modalData) {
    return null;
  }

  return (
    <>
      <div className='modal-layer'>
        <div className='modal-cont'>
          <div className='modal'>
            <div className='left-side'>
              <button
                type='button'
                className='close-x'
                onClick={() => setModalData(null)}
              >
                &times;
              </button>
              <button
                type='button'
                onClick={handleDeletePhoto}
                style={{
                  backgroundColor: 'crimson',
                  color: '#fff',
                  padding: '3px 7px',
                  marginBottom: '5px',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '14px',
                  float: 'right',
                }}
              >
                Remove Photo
              </button>
              {
                <div style={{ width: '100%' }}>
                  <img
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '5px',
                    }}
                    src={image ? image : null}
                    alt='new outfit'
                  />
                </div>
              }
            </div>
            <div className='right-side form'>
              <form>
                <label>Change Color:</label>
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
                          {c.title}
                        </option>
                      ))
                    : null}
                </select>
                <label>Change Garment type:</label>
                <input
                  className='create'
                  type='text'
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  value={type}
                  placeholder='Garment type...'
                />
                <label>Change Price:</label>
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
                  <label>Change Photo</label>
                  <input ref={fileInput} type='file' onChange={showImage} />
                  <small style={{ fontSize: '12px', float: 'left' }}>
                    Upload Photo.
                  </small>
                </div>
                <div className='btns-modal'>
                  <button
                    type='button'
                    className='close'
                    onClick={() => setModalData(null)}
                  >
                    <svg>
                      <use href='#Exit' />
                    </svg>
                  </button>
                  <button type='button' className='put' onClick={handleEdit}>
                    <svg className='put'>
                      <use href='#Save' />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Edit;
