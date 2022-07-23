import { useContext } from 'react';
import BackContext from './BackContext';

function Message() {
  const { message } = useContext(BackContext);
  if (null === message) return null;
  return (
    <div className='show-message'>
      <div className={'alert alert-' + message.type}>{message.text}</div>
    </div>
  );
}

export default Message;
