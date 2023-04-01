import React from "react";
import { useEffect, useState } from "react";
import Categories from "./Categories";
//import BlogList from "./BlogList";
import "./Blogs.css";
import axios from "axios";
const Blogs = ({ categories }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/Blogs", {})
      // .then((res) => {
      //   console.log(res);
      //   setData(data);
      //   return res.json()}

      // )
      .then((res) => {
        // console.log(data)
        console.log(res.data, "userdata");
        setData(res.data);
      });
  }, []);

  return (
    <>
      <div className="blogheader-container">
        <h1>Blogs page</h1>
      </div>
      <div className="blogmiddle-container">
        <Categories categories={categories} />
        {/* <BlogList data={data}/> */}

        <div className="bloginner-container">
          {data.map((i) => {
            return (
              <div key={i._id} className="each-blog">
                  <img src={i.image} alt="Blog pic" className="imgClass" />
                <div className="blog-fields">
                  <div id="author-style">
                    <h3>{i.author}</h3>
                  </div>
                  <div id="title-style">
                    <h3>{i.title}</h3>
                  </div>
                  <div id="description-style">
                    <p>{i.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Blogs;
