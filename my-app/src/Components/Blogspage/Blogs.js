import React from "react";
import { useEffect, useState } from "react";
import Categories from "./Categories";
import BlogList from "./BlogList";
const Blogs = ({data,categories}) => {
//   const [data, setData] = useState([]);
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
  return (
    <>
        <div>
            <p>View Posts</p>
        </div>
        <Categories categories={categories}/>
        <BlogList data={data}/>
        {/* <div>
      <h1>Blogs page</h1>
      {data.map((i) => {
        return (
          <>
            <h1>{i.author}</h1>
            <h2>{i.title}</h2>
            <p>{i.description}</p>
          </>
        );
      })}
    </div> */}
    </>
    
  );
};

export default Blogs;
