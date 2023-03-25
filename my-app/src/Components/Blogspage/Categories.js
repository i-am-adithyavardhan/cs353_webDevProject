import React from "react";

const Categories = ({ categories }) => {
  return (
    <div className="category-container">
          {categories.map((cat) => {
        return (
          <div key={cat.id}>
            <h3>{cat.value}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
