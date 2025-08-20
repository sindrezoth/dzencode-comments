const Comment = ({ user, comment }) => {

  const { username } = user || { username: "john" };
  const { text, stats, id } = comment || {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci accusantium eos, provident, magni iusto debitis numquam nemo odio doloremque, excepturi harum sunt quaerat tempora molestiae ipsam hic nesciunt! Provident, dolorum?",
    stats: 42,
    id: 13,
  };

  return (
    <div className="comment-wrapper">
      <div className="comment-header">
        <div className="comment-user-info">{username}</div>
        <div className="comment-stats">{stats}</div>
      </div>
      <div className="comment-text-content">{text}</div>
    </div>
  );
};

export default Comment;
