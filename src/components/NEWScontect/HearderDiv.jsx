import React from 'react'

import "./style.css"

import SearchDiv from './SearchDiv'

function HearderDiv() {
    return (
        <>

            <div className='d-sm-flex align-items-center justify-content-center'>


                <div >

                    <div className='d-flex justify-content-center align-items-center my-1'>

                        <img className='icon_header' src="./news2.png" alt="" />
                        <h1 className='mt-1'>NEWSac.com</h1>
                    </div>
                    <h6 className=" text-center text-sm-start " style={ {marginTop : "-2.5vh"} }>All latest NEWS here</h6>

                </div>

                <div className="text-center mb-2">

                    <SearchDiv />
                </div>

            </div>
        </>
    )
}

export default HearderDiv