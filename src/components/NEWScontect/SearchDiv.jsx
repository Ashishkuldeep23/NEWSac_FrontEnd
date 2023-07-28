import React from 'react'
import { useState } from 'react'

import "./style.css"



function SearchDiv() {


    const [inputBoxFocsed, setInputBoxFocsed] = useState(false)



    async function getDataBySearch(){
        alert("Searching Data")
    }



    return (
        <div className='d-flex justify-content-center h-100' >

            <div
                className='border border-3 border-warning rounded my-1 mb-4'
                onMouseOver={() => setInputBoxFocsed(true)}
                onMouseOut={() => setInputBoxFocsed(false)}
            >

                <input 
                    className='rounded-start px-2 fw-bold' 
                    type="text" 
                    name="" 
                    id="search_input_box"
                    placeholder='ISRO'
                    onKeyDown={(e)=>{ console.log(e.target) }}
                 />
                <button 
                    className='rounded-end bg-success text-white fw-bold px-2' 
                    onClick={()=>{setInputBoxFocsed(false); getDataBySearch() }}
                >
                    Search
                </button>

                <div 
                    className={inputBoxFocsed ? "d-block" : "d-none "} 
                    style={ {position : "absolute" , color : "black"} }
                >
                    *Search news here by Keyword, like:- ISRO.
                </div>

            </div>



        </div>
    )
}

export default SearchDiv