// import React from 'react'
// import Blogcategory from './Blogcategory'
// import Blogimage from './Blogimage'
// import "./CreateBlogmain.css"
// const CreateBlogmain = () => {
//   return (
//       <div className="createblog-container">
//         <form>
//             <div className='blog-items' id="title-container">
//                 <label>Title</label>
//                 <input type="text" name="title"
//                  placeholder="Enter title of post" className='titlefield' required/>
//             </div>
//             <Blogcategory/>
//             <div className='blog-items'>
//                 <label>Description</label>
//                 <textarea type="textarea" name="desc"
//                   placeholder="Enter the description" className='descfield' required/>
//             </div>
//             <Blogimage/>
//             <button type='submit' className='blog-items' id="create-post">Create</button>
//         </form>
//     </div>
//   )
// }

// export default CreateBlogmain

import React from 'react'
import Blogcategory from './Blogcategory'
import Blogimage from './Blogimage'
import "./CreateBlogmain.css"
import {useState,useEffect} from 'react'
import axios from "axios"

const CreateBlogmain = ({categories}) => {
  const [file,setFile] = useState();
  const [blogData,setBlogData] = useState({
    "title" : "",
    "description" : "",
    "category": "",
    "image" : ""
  })

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const formdata = new FormData();
    const myData = JSON.parse(localStorage.getItem("user"))["username"];
    console.log(myData);
    formdata.append("image",file);
    formdata.append("description",blogData["description"]);
    formdata.append("title",blogData["title"]);
    formdata.append("category",blogData["category"]);
    formdata.append("username",myData);

    const res = await axios.post("http://localhost:5000/createblog",formdata,{headers:{'Content-Type':'multipart/form-data'}});
    console.log("response"+res.data)
  }



  // const handleSubmit= async(e)=>{
  //   console.log("hhiii")
  //   e.preventDefault();
  //   console.log("hello");
  //   const myData = JSON.parse(localStorage.getItem("user"))["username"];
  //   // JSON.parse(localStorage.getItem("user"))._doc.username
  //   console.log(myData);
  //   console.log(typeof(myData));
  //   const a = {...blogData,username: myData};
  //   console.log(a);
  //   try{
  //     const res = await axios.post("http://localhost:5000/createblog",a);
  //     console.log(res);
  //   }
  //   catch(err){
  //     console.log(err);
  //   }
  //   // return
  // }
  const handleChange=(e)=>{
    setBlogData({...blogData,[e.target.name] : e.target.value})
    console.log(blogData);
  }
  // useEffect(()=>{console.log(blogData)},[blogData])

  return (
      <div className="createblog-container">
        <form onSubmit={handleSubmit} > {/*encType="multipart/form-data">*/}
            <div className='blog-items' id="title-container">
                <label htmlFor='title'>Title</label>
                <input type="text" name="title" id='title' onChange={handleChange}
                 placeholder="Enter title of post" className='titlefield' required/>
            </div>
            <Blogcategory categories={categories} blogData={blogData} setBlogData={setBlogData}/>
            <div className='blog-items'>
                <label>Description</label>
                <textarea type="textarea" name="description" rows="2" cols="4" onChange={handleChange}
                  placeholder="Enter the description" className='descfield' required/>
            </div>
            <div>
            <label htmlFor='addimg'>
                Add Image
              </label>
              <input type="file" accept = "image/*" id='addimg' filename={file} onChange = {(e)=>{
                console.log(e.target.files[0]);
                setFile(e.target.files[0]);
                setBlogData({...blogData,'image':e.target.files[0]});
                }}/>
              <img src={file}/>
            </div>
            <button type='submit' className='blog-items' id="create-post">Create</button>
        </form>
    </div>
  )
}

export default CreateBlogmain






//extra
            {/* <div className='blog-items'>
              <label>Add Image</label>
              <input type="file" onChange = {(e)=>{
                console.log(e.target.files[0]);
                setFile(URL.createObjectURL(e.target.files[0]));
                }}/>
              <img src={file} />
              <button type='button' onClick={()=>{console.log("clicked");setFile(null)}}>Remove </button>
            </div> */}