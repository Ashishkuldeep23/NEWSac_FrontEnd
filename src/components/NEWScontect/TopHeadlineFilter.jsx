import React from "react";

import "./style.css"

import { useRef, useState, useEffect } from "react"


function TopHeadlineFilter({ contentArr, getData  , getAllQueriesOfFilter , filterOnTop, setFilterOnTop }) {

  const categoryRef = useRef("")
  const sortByRef = useRef("")
  const countryRef = useRef("")


  const [articalCategory, setArticalCategory] = useState("")
  const [articalSortBy, setArticalSortBy] = useState("")
  const [articalCountry, setArticalCountry] = useState("")




  // getAllQueriesOfFilter({articalCategory , articalSortBy , articalCountry})



  // // // This hook is used to set value of reload
  useEffect(() => {

    setArticalCategory(categoryRef.current.value)
    setArticalSortBy(sortByRef.current.value)
    setArticalCountry(countryRef.current.value)

  }, [])



  
  // // // This is filter handler function -------->
  function filterHandler(e) {

    // console.log(categoryRef.current.value)
    // console.log(sortByRef.current.value)
    // console.log(countryRef.current.value)


    // // // Sending Query to actual get data Api
    getAllQueriesOfFilter({articalCategory : articalCategory , articalSortBy : articalSortBy, articalCountry : articalCountry })


    // // // calling getData function that gets data from backend and sets into main contant Arr.
    getData(1, articalCategory, articalSortBy, articalCountry, 20 )



    // alert("Ready to get ")
  }



  return (
    <div className="my-3">
      <h3 className="d-sm-inline me-2  text-center">Filter Articles</h3>
      <button className="d-none d-sm-inline btn btn-outline-danger px-1 py-0 " onClick={() => { setFilterOnTop(!filterOnTop) }}>
        {filterOnTop ? <i className="fa-solid fa-hand-point-left"></i> : <i className="fa-solid fa-hand-point-up"></i>}
      </button>


      <div className="filter_Content flex-sm-column align-items-center">


        {
          (contentArr.length > 0)
            ?
            <div className="all_selects">

              <label htmlFor="category" >Category</label>
              <select ref={categoryRef} value={articalCategory} onChange={(e) => { setArticalCategory(e.target.value) }} name="" id="category" >
                <option value="entertainment">entertainment</option>
                <option value="business">business</option>
                <option value="general" >general</option>
                <option value="health" >health</option>
                <option value="science" >science</option>
                <option value="sports" >sports</option>
                <option value="technology" >technology</option>

              </select>

              <label htmlFor="sort_by">Sorty by</label>
              <select ref={sortByRef} value={articalSortBy} onChange={(e) => { setArticalSortBy(e.target.value) }} name="" id="sort_by" >
                <option value="popularity">popularity</option>
                <option value="publishedAt">publishedAt</option>
              </select>

              <label htmlFor="country">Country</label>
              <select ref={countryRef} value={articalCountry} onChange={(e) => { setArticalCountry(e.target.value) }} name="" id="country" >
                <option value="in">IN : India</option>
                <option value="us">US : USA</option>
                <option value="au" >AU : Australia</option>
                <option value="nz" >NZ : New Zealand</option>
                <option value="ru" >RU : Russia</option>
                <option value="sa" >SA : South Africa</option>
              </select>


            </div>
            :
            <div className="all_selects">

              {
                Array.from(Array(3), (el, i) => {
                  return (
                    < div key={i} className="all_selects">
                      <label key={i} htmlFor="">Loading...</label>
                      <select  name="" id="" >
                        <option value="A">***</option>
                        <option value="B">**</option>
                        <option value="C" >*</option>

                      </select>
                    </ div >
                  )
                })
              }

            </div>
        }



        <button className="px-2 m-1 ms-sm-auto btn btn-outline-success text-white fw-bold" onClick={(e) => (contentArr.length > 0) ? filterHandler(e) : alert("Data is coming , please wait") }>{ (contentArr.length > 0) ? "Filter" : "Coming" }</button>



      </div>

    </div>
  );
}

export default TopHeadlineFilter;
