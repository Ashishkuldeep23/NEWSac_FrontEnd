import React from "react";

import "./style.css"

import { useRef, useState, useEffect } from "react"



// // // Below both array will used as Value in options.

const arrOfOptionsCategory = ["entertainment", "business", "general", "health", "science", "sports", "technology"]

const arrOfOptionContery = [
  { sort: "in", name: "India" },
  { sort: "us", name: "USA" },
  { sort: "au", name: "Australia" },
  { sort: "nz", name: "New Zealand" },
  { sort: "ru", name: "Russia" },
  { sort: "sa", name: "South Africa" },
  { sort: "ae", name: "" },
  { sort: "ar", name: "" },
  { sort: "at", name: "" },
  { sort: "be", name: "" },
  { sort: "bg", name: "" },
  { sort: "br", name: "" },
  { sort: "ch", name: "" },
  { sort: "cn", name: "" },
  { sort: "eg", name: "" },
  { sort: "gb", name: "" },
  { sort: "hk", name: "" },
  { sort: "jp", name: "" },
  { sort: "lv", name: "" },
  { sort: "mx", name: "" },
  { sort: "ng", name: "" },
  { sort: "no", name: "" },
  { sort: "ph", name: "" },
  { sort: "pt", name: "" },
  { sort: "se", name: "" },
  { sort: "si", name: "" },
  { sort: "sk", name: "" },
  { sort: "th", name: "" },
  { sort: "tw", name: "" },
  { sort: "ua", name: "" },
  { sort: "ve", name: "" },
  { sort: "za", name: "" },
]



function TopHeadlineFilter({ contentArr, getData, getAllQueriesOfFilter, filterOnTop, setFilterOnTop }) {

  const categoryRef = useRef("")
  const countryRef = useRef("")


  const [articalCategory, setArticalCategory] = useState("entertainment")
  const [articalCountry, setArticalCountry] = useState("in")




  // getAllQueriesOfFilter({articalCategory , articalSortBy , articalCountry})



  // // // This hook is used to set value of reload
  useEffect(() => {

    setArticalCategory(articalCategory)
    setArticalCountry(articalCountry)

    // console.log(articalCategory)
    // console.log(articalCountry)

  }, [])




  // // // This is filter handler function -------->
  function filterHandler(e) {

    // console.log(categoryRef.current.value)
    // console.log(sortByRef.current.value)
    // console.log(countryRef.current.value)


    // // // Sending Query to actual get data Api
    getAllQueriesOfFilter({ articalCategory: articalCategory, articalCountry: articalCountry })


    // // // calling getData function that gets data from backend and sets into main contant Arr.
    getData(1, articalCategory, "", articalCountry, 20)



    // alert("Ready to get ")
  }



  return (
    <div className="my-3">
      <h3 className="d-sm-inline me-2  text-center">Filter Articles</h3>
      <button
        className="d-none d-sm-inline btn btn-danger btn-lg btn-sm px-1 py-0"
        onClick={() => { setFilterOnTop(!filterOnTop) }}
      >
        {
          filterOnTop
            ? <i className="fa-solid fa-hand-point-left "></i> 
            : <i className="fa-solid fa-hand-point-up "></i>
        }

      </button>


      <div className="filter_Content flex-sm-column align-items-center">


        {
          (contentArr.length > 0)
            ?
            <div className="all_selects">

              <label className="fw-bold text-white bg-dark" htmlFor="category" >Category</label>
              <select className="bg-warning" ref={categoryRef} value={articalCategory} onChange={(e) => { setArticalCategory(e.target.value) }} name="" id="category" >

                {
                  arrOfOptionsCategory.map(
                    (el, i) => { return <option key={i} value={el}>{el}</option> }
                  )
                }

              </select>

              {/* SortBy no use now -----> */}
              {/* <label htmlFor="sort_by">Sorty by</label>
              <select value={articalSortBy} onChange={(e) => { setArticalSortBy(e.target.value) }} name="" id="sort_by" >
                <option value="popularity">popularity</option>
                <option value="publishedAt">publishedAt</option>
              </select> */}

              <label className="fw-bold text-white bg-dark" htmlFor="country">Country</label>
              <select className="bg-warning" ref={countryRef} value={articalCountry} onChange={(e) => { setArticalCountry(e.target.value) }} name="" id="country" >

                {
                  arrOfOptionContery.map(
                    (ele, i) => { return <option key={i} value={ele.sort}>{ele.sort.toLocaleUpperCase()} : {ele.name || ele.sort}</option> }
                  )
                }

              </select>


            </div>

            :
            <div className="">
              {
                Array.from(Array(2), (el, i) => {
                  return (
                    < div key={i} className="all_selects">
                      <label key={i} className="fw-bold text-white bg-dark" htmlFor="">Loading...</label>
                      <select className="bg-warning" name="" id="" >
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



        <button
          className="px-2 m-1 ms-sm-auto btn btn-success text-white  fw-bold"
          onClick={(e) => (contentArr.length > 0) ? filterHandler(e) : alert("Please wait for while , Data is coming ")
          }>
          <i className="fa-solid fa-filter fa-flip"></i> Filter
        </button>



      </div>

    </div>
  );
}

export default TopHeadlineFilter;
