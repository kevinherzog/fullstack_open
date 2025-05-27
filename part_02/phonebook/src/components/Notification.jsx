const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={messageType ? "succ" : "error"}>
      {message}
    </div>
  )
}

export default Notification