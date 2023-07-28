import React from 'react'
import { useState } from 'react'

import "./style.css"



function SearchDiv() {


    const [inputBoxFocsed, setInputBoxFocsed] = useState(false)



    return (
        <div className='d-flex justify-content-center h-100' >

            <div
                className='border border-3 border-warning bg-dark rounded my-1'
                onMouseOver={() => setInputBoxFocsed(true)}
                onMouseOut={() => setInputBoxFocsed(false)}
                id='search_holder_div'
            >

                <input className='rounded ' type="text" name="" id="" />
                <button className='rounded ' onClick={()=>setInputBoxFocsed(false)}>Search</button>

                <div className={inputBoxFocsed ? "d-block mx-2" : "d-none mx-2"}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>

            </div>



        </div>
    )
}

export default SearchDiv