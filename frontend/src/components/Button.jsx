import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Button = ({ text, id }) => {
  return (
    <Link to={`/book/${id}`}>
      <button className="primary-button">
        {text}
      </button>
    </Link>
  );
};

export default Button;
