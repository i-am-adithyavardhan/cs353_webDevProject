import React from "react";

const Categories = ({ categories }) => {
  return (
    <>
          {categories.map((cat) => {
        return (
          <>
            <h1>{cat[0]}</h1>
            <h2>{cat[1]}</h2>
            <p>{cat[2]}</p>
            {console.log(cat)}
          </>
        );
      })}
    </>
  );
};

export default Categories;
