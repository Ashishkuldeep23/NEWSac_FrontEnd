import React from "react";

import "./style.css";

function SingleCardOfNews({
  filterOnTop ,
  urlToImage,
  title,
  author,
  publishedAt,
  description,
  url,
  sourceName,
}) {
  //   console.log(
  //     urlToImage,
  //     title,
  //     author,
  //     publishedAt,
  //     description,
  //     url,
  //     sourceName
  //   );

  function makeActualDate(str) {
    let makeDate = new Date(str);
    // console.log(makeDate)

    let date = makeDate.getDate();
    let month = makeDate.getMonth();
    let year = makeDate.getFullYear();

    // console.log(date,month, year)

    // // // Putting 0 before month if less then 10

    date = date < 10 ? `0${date}` : date;
    month = month < 10 ? `0${month}` : month;

    return `${date}-${month}-${year}`;
  }

  return (
    <div style={ { width : filterOnTop ? "60vh" : "45vh"} }
      className="singe_card"
      onClick={() => {
        window.open(url);
      }}
    >
      <img
        src={
          urlToImage ||
          "https://res.cloudinary.com/dlvq8n2ca/image/upload/v1690341986/jnmuuiu2v8fnu3lrtukm.png"
        }
        alt={sourceName || "Source Name"}
      />
      <h4 className="title">{title || "Title of NEWS"}</h4>

      <div className="side_by_side">
        <p className="author_of_article">{author || "Writer"}</p>
        <p>{makeActualDate(publishedAt) || "Time"}</p>
      </div>

      <p>{description || "Description of NEWS not provided"}</p>
      <p className="source_name">By -: {sourceName || "Source Name"}</p>
    </div>
  );
}

export default SingleCardOfNews;
