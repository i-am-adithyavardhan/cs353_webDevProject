import React from 'react'
import Blogcategory from './Blogcategory'
import Blogimage from './Blogimage'
import "./CreateBlogmain.css"
const CreateBlogmain = () => {
  return (
      <div className="createblog-container">
        <form>
            <div className='blog-items' id="title-container">
                <label>Title</label>
                <input type="text" name="title"
                 placeholder="Enter title of post" className='titlefield' required/>
            </div>
            <Blogcategory/>
            <div className='blog-items'>
                <label>Description</label>
                <textarea type="textarea" name="desc"
                  placeholder="Enter the description" className='descfield' required/>
            </div>
            <Blogimage/>
            <button type='submit' className='blog-items' id="create-post">Create</button>
        </form>
    </div>
  )
}

export default CreateBlogmain