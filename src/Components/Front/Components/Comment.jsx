import { useContext, useState } from "react";
import FrontContext from "../FrontContext";


function Comment({ row }) {
  const { setCreateCom } = useContext(FrontContext);

  const [comment, setComment] = useState('');

  const handleComment = () => {
    setCreateCom({ clothId: row.id, comment });
    setComment('');
  }

  return (
    <div className="com frame">
      <h2>
        Comments ({row.com_count})
      </h2>
      <h4>
        {row.com_count ? null : (
          <div className='comment'>
            No feedback yet. Be the first to comment on this garment!
          </div>
        )}
      </h4>
      <ul>
        {row.coms && row.coms.slice(0, -5).split('-^-^-,').map((c, i) => <li key={i}>{c}</li>)}
      </ul>
      <div className='feedback com'>
        <form className='com'>
          <label>Leave a Review</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Write your comment here...'
          ></textarea>
          <button className='put' onClick={handleComment}>
            <svg className='put'>
              <use href='#post' />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Comment;