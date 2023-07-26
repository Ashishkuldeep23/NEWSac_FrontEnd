import React from "react";

import { useEffect, useState } from "react";

import axios from "axios";

import "./style.css";

import TopHeadlineFilter from "./TopHeadlineFilter";

import SingleCardOfNews from "./SingleNewsCard";

function Content() {
  const [dataStatus, setDataStatus] = useState("");

  const [contentArr, setContentArr] = useState([]);

  const [filterOnTop, setFilterOnTop] = useState(false);

  const [currentPage, setCurrentPage] = useState(5);



  // // // ----------------- Fetch data from backend top-headings -----------
  async function getData(page = 1, category = "", pageSize = 20, country = "in") {

    setContentArr([])  // // // set array empty to show data getting


    // // // These params needed -------->
    // console.log(page , country , category ,pageSize)

    try {
      const request = await axios(
        `https://free-apis-back-end.vercel.app/newsac/top-headlines?country=${country}&sortBy=publishedAt&page=${page}&category=${category}&pageSize=${pageSize}`
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
        setCurrentPage(roundValue);
      }




      setContentArr(request.data.data.articles);

    } catch (err) {
      console.log(err);
      return setDataStatus(`Data not Found , Error is :- ${err.message}`);
    }
  }


  useEffect(() => {
    // console.log("Sbse , Phle to main hi Aya");

    getData();
  }, []);

  return (
    <div className="row">
      <div className="col-12 border border-danger">
        <h1 className=" text-center">NEWSac.com</h1>
        <h6 className=" text-center">All latest NEWS here</h6>
      </div>

      <div className="text-center">
        <h2>Search</h2>
      </div>

      <div
        className={
          filterOnTop
            ? "col-12  px-4 bg-warning h-100 "
            : "col-sm-2 ps-4 border border-warning  h-100"
        }
      >
        {" "}
        <TopHeadlineFilter
          filterOnTop={filterOnTop}
          setFilterOnTop={setFilterOnTop}
        />
      </div>
      <div
        className={filterOnTop ? "col-sm-12" : "col-sm-10"}
        id="main_container"
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

            <div className="pages_of_this col-12 d-flex justify-content-center">
              {/* <p className="btn btn-outline-primary mx-2">Previous {"   "}</p>
              <p className="btn btn-outline-primary  mx-2">Next</p> */}

              {
                Array.from(Array(currentPage), (el, i) => {
                  return <p key={i} className="btn btn-outline-primary  mx-2" onClick={(e) => { console.log(e.target.innerHTML); return getData(e.target.innerHTML, "", 20, "in") }}>{i + 1}</p>
                })
              }

            </div>

          </div>
        ) : (
          // By this way i'can show err or skeleton
          <div className="skeleton">
            {!dataStatus ? (
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
            ) : (
              <h1>{dataStatus}</h1>
            )}
          </div>




        )}
      </div>
    </div >
  );
}

export default Content;
