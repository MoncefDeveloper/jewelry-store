import { Link } from "react-router-dom";
import img from "./images/008_-_404_error_4x.webp";

const Error = () => {
  return (
    <div className="error">
      <img src={img} alt="img" />
      <Link to={"/"} className="error-back">
        Back HOME
      </Link>
    </div>
  );
};

export default Error;
