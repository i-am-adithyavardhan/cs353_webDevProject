//import React from 'react'
import {useState} from 'react'
// import FontAwesomeIcon from 
const Blogimage = ({blogData,setBlogData,handleChange}) => {
  const [file,setFile] = useState();
  return (
    <div className='blog-items'>
              <label htmlFor='addimg'>
                Add Image
                {/* <FontAwesomeIcon icon="fa-solid fa-plus" /> */}
              </label>
              <input type="file" id='addimg' onChange = {(e)=>{
                // console.log(e.target.files[0]);
                setFile(URL.createObjectURL(e.target.files[0]));
                //setFile(e.target.files[0]);
                setBlogData({...blogData,'image':file});
                console.log(blogData)
                }}/>
              <img src={file}/>
              {/* <button type='button' onClick={()=>{console.log("clicked");setFile(null)}}>Remove </button> */}
    </div>
  )
}
export default Blogimage