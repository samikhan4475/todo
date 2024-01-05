// import React, { useState } from "react";
// import { instance1, instance2 } from "./ApiInstance";
// import Loader from "./Loader";
// const Api = () => {
//   const [data, setData] = useState([]);
//   const [getData, setGetData] = useState([]);
//   const [loading, setLoading] = useState("");
//   const [getLoader, setGetLoader] = useState("");

//   const handleClick = async () => {
//     setLoading(true);
//     try {
//       const response = await instance1.get("/posts");
//       setData(response.data);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.error(error);
//     }
//   };
//   const handleNewClick = async () => {
//     setGetLoader(true);
//     try {
//       const resource = await instance2.get("/photos");
//       setGetData(resource.data);
//       setGetLoader(true);

//       console.log("instance2 successfull");
//     } catch (error) {
//       console.log("instance not successfull");
//       setGetLoader(true);
//     }
//   };
//   return (
//     <div className="container">
//       <h1 className="text-center">Axios Using API Integration</h1>
//       <button onClick={handleClick}>Fetch API Data</button>
//       <button onClick={handleNewClick}>Fetch API Data</button>
//       {loading ? (
//         <Loader />
//       ) : (
//         data.map((el, ind) => (
//           <div key={ind}>
//             <p>{el.id}</p>
//             <h1>{el.title}</h1>
//           </div>
//         ))
//       )}
//       {getLoader ? (
//         <Loader />
//       ) : (
//         getData.map((item, ind) => (
//           <div key={ind}>
//             <p>{item.title}</p>
//             <img src={item.url} alt={item.url} />
//           </div>
//         ))
//       )}
//     </div>
//   );
// };
// export default Api;
