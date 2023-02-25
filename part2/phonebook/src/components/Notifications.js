const Notification = ({ text }) => {
  if (text === null) {
    return null;
  }
  return <div className="notification">{text}</div>;
};

const Error = ({ text }) => {
  if (text === null) {
    return null;
  }
  return <div className="error">{text}</div>;
};

const notify = { Notification, Error };

export default notify;
