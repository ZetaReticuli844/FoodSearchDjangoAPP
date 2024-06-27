import React from 'react'
import ResultDishes from './ResultDishes'

const ResultRestaurants = ({restaurant}) => {
   const details=restaurant.full_details
   const menuData=restaurant.menu
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">{restaurant.name}</h2>
        <p>{details.cuisines}</p>
        <p>{details.user_rating.aggregate_rating}</p>

      {/* Menu */}
<button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>Menu</button>
<dialog id="my_modal_2" className="modal">
  <div className="modal-box">
    <h1 className="font-bold text-lg">Menu</h1>
    {
        menuData.map(menu => (
            <ResultDishes key={menu.id} menu={menu} />
          ))
    }
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
    
    </div>
  </div>
  )
}

export default ResultRestaurants
