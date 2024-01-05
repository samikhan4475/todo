import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#000");

  return (
    <div className="sweet-loading">
      <ClipLoader
        color={color}
        loading={loading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
