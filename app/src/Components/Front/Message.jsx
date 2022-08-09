import { useContext } from 'react';
import FrontContext from './FrontContext';

function Message() {
  const { message } = useContext(FrontContext);
  if (null === message) return null;
  return (
    <div className='show-message'>
      <div className={'alert alert-' + message.type}>{message.text}</div>
    </div>
  );
}

export default Message;
