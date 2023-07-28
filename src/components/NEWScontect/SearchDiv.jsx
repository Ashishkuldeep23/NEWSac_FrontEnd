import React, { useRef } from 'react'
import { useState } from 'react'

import "./style.css"

import axios from 'axios'



function SearchDiv({ setDataStatus, setContentArr, setTotalPagesAre, dataDivRef, setIsSearchBoxOpen }) {

    const [inputBoxFocsed, setInputBoxFocsed] = useState(false)

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

            if (!request.data.status) {
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


            // // // Set result by search open or not---->
            setIsSearchBoxOpen(true)


            // // // Scroll page to Data Div when getData is called.
            window.scrollTo(0, dataDivRef.height)

            // // // Set data in main arr 
            setContentArr(request.data.data.articles);

        } catch (err) {
            // // // Set result by search open or not---->
            setIsSearchBoxOpen(false)
            console.log(err);
            setDataStatus(`Data not Found , Error is :- ${err.message}`);
        }


        // // // Setting input box to false , if already true.
        return setInputBoxDisable(false)

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
                    value={searchText}
                    onChange={(e) => { setSearchText(e.target.value) }}
                    type="text"
                    name="text"
                    id="search_input_box"
                    placeholder='ISRO'
                    onKeyDown={(e) => { if (e.key === "Enter") { getDataBySearch() } }}
                    disabled={inputBoxDisable}
                />
                <button
                    className='rounded-end bg-success text-white fw-bold px-2'
                    onClick={() => { setInputBoxFocsed(false); getDataBySearch() }}
                >
                    Search
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