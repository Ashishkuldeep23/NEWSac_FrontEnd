import React, { useState } from 'react'

import "./style.css"

import SearchDiv from './SearchDiv'

function HearderDiv({ getData, contentArr, setDataStatus, setContentArr, setTotalPagesAre, dataDivRef, setFilterOnTop, setIsSearchBoxOpen, someDataForQuery, searchByQueryBtn, setSearchByQueryBtn }) {

    const [infoDivShow, setInfoDivShow] = useState(false)


    function repairHomePage(){
        // // // Calling getData of top-headline endpoint to show like home page  ---->

        // // // If not worked or bug , call reload() fn of window
        getData(1 , '' , '' , "in" , 20)

        // // // Filter dive in left
        setFilterOnTop(false)

        // // // Hide Query div
        setIsSearchBoxOpen(false)

    }



    return (
        <>
            {/* About Div code this this */}
            <div className=' bg-dark border border-info border-2' id='info_div' style={{ display: !infoDivShow && "none" }}>
                <a href="https://res.cloudinary.com/dlvq8n2ca/image/upload/v1687828596/zzr14emaxohpzllyzlat.webp" target="_blank" rel="noopener noreferrer">
                    <img id='img' src="https://res.cloudinary.com/dlvq8n2ca/image/upload/v1687828596/zzr14emaxohpzllyzlat.webp" alt="Ashish's Image" />
                </a>
                <h2 className='text-warning'>NEWSac.com</h2>
                <h4 className='text-warning'>NEWSac is a news reading web app.</h4>
                <button className='cancel px-2 rounded' onClick={() => setInfoDivShow(false)}>X</button>

                <ul className='text-white'>
                    <li>This web app gives latest NEWS everytime.</li>
                    <li>Here user can search NEWS by giving keyword in input box.(Just below of icon)</li>
                    <li>In this web app you can filter data accroding to (category & nation) your intrest.(In Darkblue div)</li>
                    <li>In last user can read multipages by sending request from pagnation.(In last of all NEWS)</li>
                    <li>Data provided by Free Api.</li>
                    <li>Link:- <a href="">Link</a>.</li>
                    <li>Link:- <a href="">Link</a>.</li>
                    <li>Created by ❤️ Ashish Kuldeep</li>
                </ul>

                <input className='cancel rounded' type="button" value="Close" onClick={() => { setInfoDivShow(false) }} />
            </div>


            {/* Main Header code here ----------> */}
            <div className='d-sm-flex align-items-center justify-content-between px-4 py-2' >
                <div >
                    <div onClick={()=>{repairHomePage()}} className='d-flex justify-content-start align-items-center my-1' id='web_name_div' >
                        <img className='icon_header' src="./news2.png" alt="Web Icon" />
                        <h1 className='mt-1'>NEWSac.com</h1>
                    </div>

                    <div className='d-flex align-items-start justify-content-start' style={{ marginTop: "-2vh" }}>
                        <button  onClick={() => { setInfoDivShow(true) }} className='btn btn-sm btn-outline-dark py-0  px-1 me-1' >About</button>
                        <h6 className=" text-center text-sm-start ">All latest NEWS here</h6>
                    </div>

                </div>

                <div className="text-center">
                    <SearchDiv
                        contentArr={contentArr}
                        setDataStatus={setDataStatus}
                        setContentArr={setContentArr}
                        setTotalPagesAre={setTotalPagesAre}
                        dataDivRef={dataDivRef}
                        setFilterOnTop={setFilterOnTop}
                        setIsSearchBoxOpen={setIsSearchBoxOpen}
                        someDataForQuery={someDataForQuery}
                        searchByQueryBtn={searchByQueryBtn}
                        setSearchByQueryBtn={setSearchByQueryBtn}
                    />
                </div>

            </div>
        </>
    )
}

export default HearderDiv