import axios from "axios";
import React, { useEffect, useState } from "react";

const Card = () => {
  const [data, setData] = useState([]);
  const handleApi = async () => {
    const response = await axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error, "sami");
      });
  };
  useEffect(() => {}, [handleApi()]);

  return (
    <>
      <h1>Api</h1>
      <div className="container">
        <div className="row ">
          {data.slice(0, 8).map((el, ind) => (
            <div
              key={ind}
              className="card col-xxl-2 col-xl-4 col-lg-6 col-sm-12"
            >
              <img src={el.images} alt="el.images" className="w-100" />
              <div className="p-3">
                <h6>{el.title}</h6>
                <p>{el.price}</p>
              </div>
              {/* </div> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Card;
