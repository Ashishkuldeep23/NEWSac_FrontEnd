import React, { useEffect, useRef } from 'react'
import { useState } from 'react'

import "./style.css"

import axios from 'axios'



function SearchDiv({ contentArr, setDataStatus, setContentArr, setTotalPagesAre, dataDivRef , setFilterOnTop, setIsSearchBoxOpen, someDataForQuery, searchByQueryBtn, setSearchByQueryBtn }) {

    const [inputBoxFocsed, setInputBoxFocsed] = useState(false)   // // Show Alert

    const [searchText, setSearchText] = useState("ISRO")

    const [inputBoxDisable, setInputBoxDisable] = useState(false)






    async function getDataBySearch(page = 1, q = "ISRO", sortBy = "publishedAt", from = "", to = "", pageSize = 20) {


        // // // If input box is true then return with alert.
        if (inputBoxDisable) return alert("Wait for Result")

        // // // If text is not given then search for ISRO.
        // if (searchText === "ISRO" || searchText === "") {
        //     setSearchText("ISRO")
        //     alert("Searching for 'ISRO' by default")
        // }


        // // // if not text input ----->
        let searchRegex = (/^[ a-zA-Z ]+([\s][ a-zA-Z ]+)*$/)
        if (!searchRegex.test(searchText)) {
            setSearchText("ISRO")
            alert(`This input (${searchText}) is not valid.`)
            return
        }



        // // // Set main arr to 0 length for loading effect
        setContentArr([])

        // alert("Searching Data")
        // console.log(searchText)

        // // // Setting input box to true , if already false.
        setInputBoxDisable(true)


        // let url = `https://newsapi.org/v2/everything?q=${q}&from=${from}&to=${to}&pageSize=${pageSize}&page=${page}&sortBy=${sortBy}&apiKey=${Api_key}`


        try {

            const request = await axios(
                `https://free-apis-back-end.vercel.app/newsac/everything?q=${searchText?.trim()?.toLowerCase() || q}&from=${from}&to=${to}&pageSize=${pageSize}&page=${page}&sortBy=${sortBy}`
            );

            console.log(request);

            if (request.message) {
                alert(request.data.message);
                return setDataStatus(`Data not Found with this text :- ${searchText}`);
            }



            let totalGetRes = request.data.data.totalResults;
            let articlesInThisReq = request.data.data.articles.length

            if (totalGetRes > articlesInThisReq) {
                let roundValue = Math.ceil(totalGetRes / 20);
                // console.log(roundValue)
                setTotalPagesAre(roundValue);
            }


            // // // Set filter div to true for UI Changes(Main Data in full space)
            setFilterOnTop(true)


            // // // Scroll page to Data Div when getData is called.
            window.scrollTo(0, dataDivRef.height)

            // // // Set data in main arr 
            setContentArr(request.data.data.articles);

        } catch (err) {
            // // // Set result by search open or not---->
            setIsSearchBoxOpen(false)
            console.log(err);
            setDataStatus(`Data not Found with this text :- ${searchText} , Please search for something else.`);
        }



        // // // Set result by search open or not---->
        setIsSearchBoxOpen(true)

        // // // Setting input box to false , if already true.
        return setInputBoxDisable(false)

    }



    useEffect(() => {

        // console.log(searchByQueryBtn)

        // // // This code will run When Search filter called or Pagination btn clickecd
        if (searchByQueryBtn) {

            console.log(someDataForQuery)
            console.log(Object.keys(someDataForQuery))
            console.log(Object.keys(someDataForQuery).length)


            // // // If object of value got changed rthen only run below line for that an if condition is present with || (conditional operator)

            let { page, from, to, sortBy } = someDataForQuery

            if (page !== 1 || from !== "" || to !== "" || sortBy !== "") {
                getDataBySearch(page, searchText?.trim()?.toLowerCase(), sortBy, from, to)

                console.log("Calling Axios not")
            } else {
                alert("Change something from Search filter.")
            }


            // // // If work is done make btn var to false
            setSearchByQueryBtn(false)

        }


    }, [searchByQueryBtn])





    return (
        <div className='d-flex justify-content-center h-100' >

            <div
                className='border border-3 border-warning rounded my-1 mb-4'
                onMouseOver={() => setInputBoxFocsed(true)}
                onMouseOut={() => setInputBoxFocsed(false)}
            >

                <input
                    className='rounded-start px-2 fw-bold'
                    id="search_input_box"
                    value={searchText}
                    onChange={(e) => { setSearchText(e.target.value) }}
                    type="text"
                    name="text"
                    placeholder='ISRO'
                    onKeyDown={(e) => { if (e.key === "Enter") { getDataBySearch()  } }}
                    disabled={inputBoxDisable}
                />
                <button
                    className='rounded-end bg-success text-white fw-bold px-2'
                    // onClick={() => { (contentArr.length > 0) ? getDataBySearch() && setInputBoxFocsed(false) : alert("Please wait for while , Data is coming ") }}
                    onClick={() => {  getDataBySearch();setInputBoxFocsed(false) }}
                >
                   <i className="fa-solid fa-magnifying-glass fa-flip"></i>
                </button>

                <div
                    className={inputBoxFocsed ? "d-block" : "d-none "}
                    style={{ position: "absolute", color: "black" }}
                >
                    *Search news here by Keyword, like:- ISRO.
                </div>

            </div>



        </div>
    )
}

export default SearchDiv