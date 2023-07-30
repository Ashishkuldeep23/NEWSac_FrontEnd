import React from "react";

import { useEffect, useState, useRef } from "react";

import axios from "axios";

import "./style.css";

import TopHeadlineFilter from "./TopHeadlineFilter";

import SingleCardOfNews from "./SingleNewsCard";

import HearderDiv from "./HearderDiv";




function Content() {
  const [dataStatus, setDataStatus] = useState("");             // // // This tells status of data , showing or not

  const [contentArr, setContentArr] = useState([]);             // // // Main News contanted

  const [filterOnTop, setFilterOnTop] = useState(false);         // // // Filter div position

  const [totalPagesAre, setTotalPagesAre] = useState(1);          // // // Number of pages 


  const [presentVisiblePage, setPresentVisiblePage] = useState(1);      // // // Which page is currettly seen 


  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false)     // // This var is tells search box is opned or not



  const [allQueryObject, setAllQueryObject] = useState({})    // // // This var hold all filtered query.


  const [someDataForQuery, setSomeDataForQuery] = useState({ page: 1, from: "", to: "", sortBy: "publishedAt" })


  const [searchByQueryBtn , setSearchByQueryBtn] = useState(false)    // // // This var will make value true when btn clicked and if this var is true then search by query fn called


  const dataDivRef = useRef("")    // // // Refrence of header for scroll


  // const querySearchDiv = useRef("")  // // // Refrence of Query serch for set value at useEffect




  // // // Get all Queries from filtered data by filter div ------>
  function getAllQueriesOfFilter(obj) {
    // console.log(obj)

    if (Object.keys(obj) <= 0) {
      obj = { articalCategory: "", articalCountry: "in" }
    }

    setPresentVisiblePage(1)  // // // setting page Always 1st on filter
    setAllQueryObject(obj)  // // // Setting query object

    // console.log(allQueryObject)
    return obj
  }




  // // // ----------------- Fetch data from backend top-headings -----------
  async function getData(page = 1, category = "", sortBy = "publishedAt", country = "in", pageSize = 20,) {

    setContentArr([])  // // // set array empty to show data getting


    // // // These params needed -------->
    // console.log(page , country , category , sortBy ,pageSize)

    try {
      const request = await axios(
        `https://free-apis-back-end.vercel.app/newsac/top-headlines?country=${country}&sortBy=${sortBy}&page=${page}&category=${category}&pageSize=${pageSize}`
      );

      console.log(request);
      // console.log(request.data);
      // console.log(request.data.status);


      // // // Some If

      // // // Not working now ---->
      if (!request.data.status) {
        alert(request.data.message);
        return setDataStatus("Data not Found");
      }


      // console.log(request.data.data.totalResults)
      // console.log(request.data.data.articles.length)

      let totalGetRes = request.data.data.totalResults;
      let articlesInThisReq = request.data.data.articles.length


      if (totalGetRes > articlesInThisReq) {
        let roundValue = Math.ceil(totalGetRes / 20);
        // console.log(roundValue)
        setTotalPagesAre(roundValue);
      }

      // // // Scroll page to Data Div when getData is called.
      window.scrollTo(0, dataDivRef.height)


      // // // Set data in main arr 
      setContentArr(request.data.data.articles);

    } catch (err) {
      console.log(err);
      return setDataStatus(`Data not Found , Error is :- ${err.message}`);
    }
  }







  useEffect(() => {
    // console.log("Sbse , Phle to main hi Aya");

    getData();    // // // Tis fu. calls very first


    // // Filter div on top.
    // console.log(window.screen.width)
    if (window.screen.width <= 574) {
      // alert("Go to go")
      // // // make filter div value true becoz our filter on top --->
      setFilterOnTop(true)
    }


  }, []);



  return (

    <>
      <div className="row">
        <div id="main_header_div" className="col-12 bg-warning">
          <HearderDiv
            getData={getData}
            contentArr={contentArr}
            setDataStatus={setDataStatus}
            setContentArr={setContentArr}
            setFilterOnTop={setFilterOnTop}
            setTotalPagesAre={setTotalPagesAre}
            dataDivRef={dataDivRef}
            setIsSearchBoxOpen={setIsSearchBoxOpen}
            someDataForQuery={someDataForQuery}
            searchByQueryBtn={searchByQueryBtn}
            setSearchByQueryBtn={setSearchByQueryBtn}
          />
        </div>

        <div
          style={{
            height: filterOnTop ? "100%" : "60vh",
            marginTop: filterOnTop ? "0" : "5vh",
            display: isSearchBoxOpen && "none"
          }}

          id="filter_div_mb_style"

          className={
            filterOnTop
              ? "col-12 px-4 bg-primary "
              : "col-sm-2 ps-4 bg-primary  rounded"
          }
        >
          {" "}
          <TopHeadlineFilter
            contentArr={contentArr}
            getData={getData}
            getAllQueriesOfFilter={getAllQueriesOfFilter}

            filterOnTop={filterOnTop}
            setFilterOnTop={setFilterOnTop}
          />
        </div>
        <div
          className={( searchByQueryBtn || filterOnTop) ? "col-sm-12" : "col-sm-10"}
          id="main_container"
          ref={dataDivRef}
        >

          {/* Search filter ------------> */}

          <div className="col-12 mt-1" >

            {
              (isSearchBoxOpen) &&
              <div className="bg-primary py-1 px-4 rounded d-flex justify-content-center flex-wrap text-white fw-bold" >
                <div>

                  <label htmlFor="sortBy">Sort By:-</label>
                  <select
                    className="mx-2 rounded p-1 bg-warning"
                    value={someDataForQuery.sortBy}
                    id="sortBy"
                    name="sortBy"
                    onChange={(e) => { setSomeDataForQuery({ ...someDataForQuery, [e.target.name]: e.target.value }) }}
                  >
                    <option value="popularity">Popularity</option>
                    <option value="relevancy">Relevancy</option>
                    <option value="publishedAt">PublishedAt</option>
                  </select>

                </div>

                <div>
                  <label htmlFor="from">From:-</label>
                  <input
                    className="mx-2 rounded p-1 bg-warning"
                    value={someDataForQuery.from}
                    type="date"
                    name="from"
                    id="from"
                    onChange={(e) => {
                      setSomeDataForQuery({ ...someDataForQuery, [e.target.name]: e.target.value })
                    }}
                  />
                </div>

                <div>

                  <label htmlFor="to">To:-</label>
                  <input
                    className="mx-2 rounded p-1 bg-warning"
                    value={someDataForQuery.to}
                    type="date"
                    name="to"
                    id="to"
                    onChange={(e) => {
                      setSomeDataForQuery({ ...someDataForQuery, [e.target.name]: e.target.value })
                    }}
                  />
                </div>

                <button
                  name="btn"
                  value={true}
                  className="mx-2 ms-auto rounded p-1 bg-success text-white fw-bold border-dark"
                  onClick={(e) => {


                    (contentArr.length > 0) 
                    ? setSearchByQueryBtn(true)
                    : alert("Data not present with your Query, Click on Logo to see home page. ")
                     

                    // console.log(someDataForQuery);  // // Calling Query function
                  }}

                >
                  {
                    (contentArr.length > 0) ? "Query Search" : "Coming"
                  }
                </button>

              </div>

            }

          </div>




          {contentArr.length > 0 ? (
            <div>
              {contentArr.map((el, i) => {
                return (
                  <SingleCardOfNews
                    key={i}
                    filterOnTop={filterOnTop}
                    urlToImage={el.urlToImage}
                    title={el.title}
                    author={el.author}
                    publishedAt={el.publishedAt}
                    description={el.description}
                    url={el.url}
                    sourceName={el.source.name}
                  />
                );
              })
              }

              <div className="pages_of_this col-12 d-flex justify-content-center flex-wrap">

                {/* Actual pagition */}

                {
                  Array.from(Array(totalPagesAre), (el, i) => {
                    return (
                      <p
                        key={i} id={i + 1}
                        className={(presentVisiblePage === i + 1) ? "btn btn-primary mx-2" : "btn btn-outline-primary mx-2"}
                        onClick={(e) => {

                          // console.log(presentVisiblePage);     // // //
                          setPresentVisiblePage(i + 1);
                          // console.log(e.target.id);    // // // Setting id = i+1 that's why taking id insted of innerHtml
                          (!isSearchBoxOpen)
                            ? getData(e.target.id, allQueryObject.articalCategory , "" , allQueryObject.articalCountry, 20)
                            :  setSearchByQueryBtn(true);  setSomeDataForQuery({ ...someDataForQuery, page: e.target.id }) // // // Set Query Data ------>
                            // // Calling Query function
                          return
                        }}
                      >
                        {
                          (i === 0) ? "First" : ((i + 1) === totalPagesAre ? "Last" : i + 1)
                        }
                      </p>


                    )
                  })
                }

              </div>

            </div>
          ) : (
            // By this way i'can show err or skeleton (Skeleton code here -------->)
            <div className="skeleton">
              {
                (!dataStatus)
                  ? (
                    <section>
                      {Array.from(Array(20), (el, i) => {
                        return (
                          <div
                            key={i}
                            style={{ width: filterOnTop ? "60vh" : "45vh" }}
                            className="singe_card skeleton_single"
                          >
                            <div className="spinner-border fs-1" style={{ height: "20vh", width: "20vh" }} role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            <h3 className="text-dark">Loading...</h3>
                          </div>
                        );
                      })}


                      <div className="pages_of_this col-12 d-flex justify-content-center">
                        {/* dummy pagination here */}
                        {
                          Array.from(Array(5), (el, i) => {
                            return <p key={i} className="btn btn-outline-primary  mx-2">{0}</p>
                          })

                        }
                      </div>



                      {/*   Above is perfect by DRY run principle.
                          <div className="singe_card"></div>{" "}
                          <div className="singe_card"></div>{" "}
                          <div className="singe_card"></div>{" "}
                          <div className="singe_card"></div>{" "}
                          <div className="singe_card"></div>{" "}
                          <div className="singe_card"></div>{" "}
                          <div className="singe_card"></div>{" "} */}
                    </section>
                  )
                  :
                  (
                    <h1>{dataStatus}</h1>
                  )

              }
            </div>
          )}
        </div>
      </div >
    </>

  );
}

export default Content;
