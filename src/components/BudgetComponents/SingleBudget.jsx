import React, { useState } from "react";
import PropTypes from "prop-types";

const SingleBudget = ({ budget ,setEditingVars}) => {
  // State variables specific to a single budget item
  const percentageSpent = (budget.spent / budget.limit) * 100;

  return (
     <li
                className="hover:shadow-lg transform hover:scale-105 transition-all duration-300 "
                key={budget.category}
              >
                <div className="flex gap-5 p-2 items-center justify-center">
                  <div className="flex flex-col gap-1 w-96 ">
                    <div className="flex justify-between items-center ">
                      <h5 className="dark:text-white">{budget.category}</h5>
                      <p className="dark:text-white">${budget.limit}</p>
                    </div>
                    <div className="w-full  mb-4 bg-gray-200 rounded-full dark:bg-gray-700">
                      <div
                        className={`rounded-full text-center p-0.5  leading-none dark:text-white ${
                          percentageSpent <= 100 ? "bg-green-600" : "bg-red-600"
                        }`}
                        style={{
                          width:
                            percentageSpent <= 100
                              ? `${percentageSpent}%`
                              : "100%",
                        }}
                      >
                        ${budget.spent}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="rounded-md border px-2 dark:text-white"
                      onClick={() => {
                        setEditingVars(budget.category,budget.spent,budget.limit,budget._id,true); 
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </li> 
  );
};

SingleBudget.propTypes = {
  budget: PropTypes.shape({
    category: PropTypes.string,
    limit: PropTypes.number,
    spent: PropTypes.number,
    _id: PropTypes.string,
    // Add more properties as needed
  }),
};

export default SingleBudget;
