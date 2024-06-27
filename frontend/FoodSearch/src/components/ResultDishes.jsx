import React from 'react'

const ResultDishes = ({menu}) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">{menu.name}</h2>
      <p> {menu.restaurant_name}</p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary"> {menu.price}</button>
      </div>
    </div>
  </div>
  )
}

export default ResultDishes
