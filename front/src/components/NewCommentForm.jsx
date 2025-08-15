import {useState, useRef} from 'react';
import DOMPurify from 'dompurify';
import Editor from './Editor';


const NewCommentForm = () => {
  const [comment, setComment] = useState('');
  const textareaRef = useRef(null);
  
  function submitHandle(e) {
    e.preventDefault();

    console.log("submit!");
    console.log(comment);
  }

  function onChangeHandle(e) {
    setComment(e.target.value)
  }
  function selectHandle(e) {
    console.log(e.target.selectionStart);
    console.log(e.target.selectionEnd);
  }

  return (
    <div className="form-wrapper">
      <form onSubmit={submitHandle}>
        <Editor />
        {/* <textarea  */}
        {/*   id="textareainput"  */}
        {/*   onChange={onChangeHandle}  */}
        {/*   value={comment}  */}
        {/*   ref={textareaRef} */}
        {/*   onSelect={selectHandle} */}
        {/* ></textarea> */}
        <button type="submit">Надіслати</button>
      </form>
    </div>
  );
};

export default NewCommentForm;
