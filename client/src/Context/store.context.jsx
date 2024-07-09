import { createContext,useEffect,useState } from "react";
import axios from "axios";
export const StoreContext=createContext(null);

function StoreContextProvider({children}) {
    const url="http://localhost:6969"
    const [cartItems, setCartItems] = useState({});
    const [token,setToken]=useState();
    const [foodList,setFoodList] = useState([])

    const fetchFoodList=async()=>{
        const res=await axios.get(`${url}/api/food/list`)
        setFoodList(res.data.data)
    }

    const addToCart=async(id)=>{
        
        setCartItems((prev)=>{
            return {...prev,[id]:(prev[id]||0)+1}
        })
        
        if(token){
            const res=await axios.post(`${url}/api/cart/add`,{id},{
                headers: {
                    token
                },
            })
        }

    }
    const removeFromCart=async(id)=>{
        
        setCartItems((prev)=>{
            return {...prev,[id]:prev[id]-1}
        })

        if(token){
            const res=await axios.post(`${url}/api/cart/remove`,{id},{headers: {token}})
            console.log(res.data.data)

        }
    }
    const getCartTotal=()=>{
        let total = 0
        for(let key in cartItems) {
           const food= foodList.find((item)=>item._id==key)
           total += food.price*cartItems[key]
        }
        console.log(total);
        return total
    }

    const loadCartItems= async(token)=>{
        const res=await axios.get(`${url}/api/cart/list`,{
            headers:{
                token
            },  
        })
        console.log(res.data.message)
        setCartItems(res.data.data.cart)
    }

    useEffect(()=>{
        fetchFoodList()
        if(localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            loadCartItems(localStorage.getItem('token'))
        }
    },[])
    const store = {
        foodList,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getCartTotal,
        url,
        token,
        setToken,
    }
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider