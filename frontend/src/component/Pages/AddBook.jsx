import axios from "axios";
import React, { useState } from "react";

const AddBook = () => {

    const [BookData,setBookData] = useState({ 
        url:"",
        title:"",
        author:"",
        price:"",
        description:"",
        language:""
    })

    const headers = {
        id: localStorage.getItem('id'),
        authorization: `Bearer ${localStorage.getItem('token')}`,
       };

    // handleChange for value change //
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setBookData({...BookData,[name]:value})
    }

    // submit function for submiting the data into backend api //
    const handleSubmit=async()=>{
         try {
             
             if(BookData.url === "" || 
                BookData.title==="" || 
                BookData.author==="" || 
                BookData.language==="" || 
                BookData.price==="" ||
                BookData.description===""
            ){
                alert("All Fields Require");
            }
            else{
                  const response = await axios.post('http://localhost:3000/book/add-book',BookData,{headers});
                  setBookData({
                    url:"",
                    title:"",
                    author:"",
                    price:"",
                    description:"",
                    language:""
                  });
                  alert(response.data.message);
            }
         } 
         catch (error) {
            
         }
    }

  return (
    <>
      <div className="h-[100%] p-0 md:p-4">
        <h3 className="text-2xl md:text-3xl font-semibold text-zinc-500 mb-8">
          Add Book
        </h3>

        <div className="bg-zinc-800 rounded p-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Image
            </label>
            <input
              type="text"
              placeholder="Url of image"
              name="url"
              value={BookData.url}
              onChange={handleChange}
              required
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            />
          </div>

          <div className="mt-2">
            <label htmlFor="" className="text-zinc-400">
              Title of book
            </label>
            <input
              type="text"
              placeholder="Enter Title"
              name="title"
              value={BookData.title}
              onChange={handleChange}
              required
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            />
          </div>

          <div className="mt-2">
            <label htmlFor="" className="text-zinc-400">
              Author
            </label>
            <input
              type="text"
              placeholder="Enter Author Name"
              name="author"
              value={BookData.author}
              onChange={handleChange}
              required
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            />
          </div>

          <div className="mt-2 flex gap-2">
            <div className="w-3/6">
              <label htmlFor="" className="text-zinc-400">
                Language
              </label>
              <input
                type="text"
                placeholder="Enter Author Name"
                name="language"
                value={BookData.language}
                onChange={handleChange}
                required
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              />
            </div>

            <div className="w-3/6">
              <label htmlFor="" className="text-zinc-400">
                price
              </label>
              <input
                type="text"
                placeholder="Enter Price"
                name="price"
                value={BookData.price}
                onChange={handleChange}
                required
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              />
            </div>
          </div>
          
        <div className="mt-2">
          <label htmlFor="" className="text-zinc-400">
              Description
            </label>
            <textarea 
             name="description" 
             value={BookData.description}
             onChange={handleChange}
             required
             placeholder="Enter Description"
             rows={5}
             className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"/>
        </div>

        <button 
         className="px-4 py-2 rounded bg-blue-700 text-zinc-100 font-semibold mt-2
          hover:bg-blue-600 hover:transition-all duration-300" onClick={handleSubmit}> Add Book</button>
        </div>

      </div>
    </>
  );
};

export default AddBook;
