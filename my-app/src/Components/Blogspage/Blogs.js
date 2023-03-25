import React from "react";
import { useEffect, useState } from "react";
import Categories from "./Categories";
//import BlogList from "./BlogList";
import axios from "axios";
const Blogs = ({categories}) => {
  const [data, setData] = useState([]);
//   useEffect(() => {
//     fetch("http://localhost:5000/Blogs", {
//       method: "GET",
//     })
//       .then((res) => {
//         console.log(res);
//         return res.json()}
//       )
//       .then((data) => {
//         console.log(data, "userdata");
//         setData(data);
//       });
//   }, []);

    // const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/Blogs", {})
      // .then((res) => {
      //   console.log(res);
      //   setData(data);
      //   return res.json()}
      
      // )
      .then((data) => {
        console.log(data.data, "userdata");
        setData(data.data);
      });
  }, []);
  return (
    <>
        <div>
            <p>View Posts</p>
        </div>
        <Categories categories={categories}/>
        {/* <BlogList data={data}/> */}
        <div>
      <h1>Blogs page</h1>
      {data.map((i) => {
        return (
          <div key={i._id}>
            <h3>{i.author}</h3>
            <h3>{i.title}</h3>
            <p>{i.description}</p>
            {/* <img src="D:\Blog React\backend\uploads\{i.image}" alt="Blog pic"/> */}
          </div>
        );
      })}
    </div>
    </>
    
  );
};

export default Blogs;
