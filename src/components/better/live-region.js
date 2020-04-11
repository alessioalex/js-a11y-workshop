import React, {useState, useRef} from "react"

const LiveRegion = () => {
  const [message, setMessage] = useState('Nothing here.');

  const inputRef = useRef(null);

  const submitHandler = (event) => {
    setMessage(inputRef.current.value);
    event.preventDefault();
  };

  return (
    <div>
      <div role="status">
        <p>{message}</p>
      </div>
      <form onSubmit={submitHandler}>
        <label>
          Enter text<br />
          <input type="text" ref={inputRef} />
        </label>
        <button type="submit">Start</button>
      </form>
    </div>
  )
}

export default LiveRegion