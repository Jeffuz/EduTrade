import React from "react";

const CreateItemPost = () => {
  return (
    <div className="text-left m-auto">
      <h3>Create New Listing</h3>
      
      <form>
        <label>Item Name</label>
        <input type="text"/>
        <br/>

        <label>Price</label>
        <input type="text"/>

        <br/>
        <label>Description</label>
        <input type="text"/>
        
        <br/>
        <button className="bg-slate-300 rounded-lg m-3 p-1">Create Listing</button>
      </form>
    </div>
  )
}
export default CreateItemPost;