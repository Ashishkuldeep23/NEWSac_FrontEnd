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



  const dataDivRef = useRef("")    // // // Refrence of header for scroll






  // // // Get all Queries from filtered data by filter div ------>
  function getAllQueriesOfFilter(obj) {
    // console.log(obj)

    if (Object.keys(obj) <= 0) {
      obj = { articalCategory: "", articalSortBy: "publishedAt", articalCountry: "in" }
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
            setDataStatus={setDataStatus} 
            setContentArr={setContentArr} 
            setTotalPagesAre={setTotalPagesAre} 
            dataDivRef={dataDivRef}
            setIsSearchBoxOpen={setIsSearchBoxOpen}
          />
        </div>

        <div
          style={{
            backgroundColor: "darkblue",
            height: filterOnTop ? "100%" : "60vh",
            marginTop: filterOnTop ? "0" : "5vh" ,
            display : isSearchBoxOpen && "none" 
          }}

          id="filter_div_mb_style"

          className={
            filterOnTop
              ? "col-12 px-4  "
              : "col-sm-2 ps-4 border rounded"
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
          className={filterOnTop ? "col-sm-12" : "col-sm-10"}
          id="main_container"
          ref={dataDivRef}
        >
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
              })}

              <div className="pages_of_this col-12 d-flex justify-content-center flex-wrap">
                {/* <p className="btn btn-outline-primary mx-2">Previous {"   "}</p>
              <p className="btn btn-outline-primary  mx-2">Next</p> */}

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
                          return getData(e.target.id, allQueryObject.articalCategory, allQueryObject.articalSortBy, allQueryObject.articalCountry, 20)
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
