import { createContext,useState } from "react";
export const StoreContext=createContext(null);
import { food_list } from "../assets/frontend_assets/assets";

function StoreContextProvider({children}) {
    const [cartItems, setcartItems] = useState({});
    const addToCart=(id)=>{
        
        setcartItems((prev)=>{
            return {...prev,[id]:(prev[id]||0)+1}
        })
    }
    const removeFromCart=(id)=>{
        
        setcartItems((prev)=>{
            return {...prev,[id]:prev[id]-1}
        })
    }
    const getCartTotal=()=>{
        let total = 0
        for(let key in cartItems) {
           const food= food_list.find((item)=>item._id==key)
           total += food.price*cartItems[key]
        }
        console.log(total);
        return total
    }
    const store = {
        food_list,
        cartItems,
        setcartItems,
        addToCart,
        removeFromCart,
        getCartTotal,
    }
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider