import React, { useContext } from 'react'
import FoodItem from '../Cards/FoodItem'
import { StoreContext } from '../../Context/store.context'

const FoodDisplay = ({category}) => {
    const {food_list}=useContext(StoreContext)
  return (
    <div>
      <h2 className='text-3xl'>Top dishses near you</h2>
      <div className="food-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-10">
        {
            food_list.map((food, index) => (
                category === "All" || category === food.category ? <FoodItem food={food} key={index} /> : null
            ))
        }
      </div>
    </div>
  )
}

export default FoodDisplay
