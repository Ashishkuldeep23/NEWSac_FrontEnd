import React, { useState } from 'react'

import "./style.css"

import SearchDiv from './SearchDiv'

function HearderDiv({contentArr , setDataStatus , setContentArr , setTotalPagesAre ,dataDivRef ,setFilterOnTop , setIsSearchBoxOpen , someDataForQuery  , searchByQueryBtn , setSearchByQueryBtn}) {

    const [infoDivShow , setInfoDivShow] = useState(false)


    return (
        <>

            <div className='text-dark' id='info_div'  style={ { display : !infoDivShow && "none"} }>
                <h2 className='text-dark'>NEWSac.com</h2>
                <h4 className='text-dark'>NEWSac is a news reading web app.</h4>
                <button className='cancel px-2 rounded' onClick={()=>setInfoDivShow(false)}>X</button>

                <ul>
                    <li>This web app gives latest NEWS everytime.</li>
                    <li>Here user can search NEWS by giving keyword in input box.(Just below of icon)</li>
                    <li>In this web app you can filter data accroding to (category & nation) your intrest.(In Darkblue div)</li>
                    <li>In last user can read multipages by sending request from pagnation.(In last of all NEWS)</li>
                    <li>Data provided by Free Api.</li>
                    <li>Link:- <a href="">Link</a>.</li>
                    <li>Link:- <a href="">Link</a>.</li>
                    <li>Created by ❤️ Ashish Kuldeep</li>
                </ul>

                <input className='cancel rounded' type="button" value="Close" onClick={()=>{setInfoDivShow(false)}}/>
            </div>


            <div className='d-sm-flex align-items-center justify-content-between px-4 py-2' >
                <div>
                    <div className='d-flex justify-content-center align-items-center my-1' id='web_name_div' onClick={()=>{setInfoDivShow(true)}}>
                        <img className='icon_header' src="./news2.png" alt="Web Icon" />
                        <h1 className='mt-1'>NEWSac.com</h1>
                    </div>
                    <h6 className=" text-center text-sm-start " style={{ marginTop: "-2.5vh" }}>All latest NEWS here</h6>

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