import "../../styles/Comment.css";
import Button from "../Button";
import comments from "../../../util/sample_comment.json";

const Comment = () => {
  return (
    <section className="comment_container">
      <h1>Commnets</h1>
      <div className="input_container">
        <input type="text" placeholder="Review product." />
        <Button text={"Send"} />
      </div>
      {comments.map((elem, index) => {
        return (
          <div key={index} className="comment">
            <h4>{elem.author}</h4>
            <p>{elem.comment}</p>
          </div>
        );
      })}
    </section>
  );
};

export default Comment;
