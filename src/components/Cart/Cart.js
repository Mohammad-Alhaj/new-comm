import { Button, Card } from "react-bootstrap"
import { useSelector,useDispatch } from "react-redux"
import { updateAmount } from "../../store/cart"
import {addCart,removeCart,clearAllCart} from '../../store/cart' 
import { Alert } from "@mui/material"
import './Cart.css'
export default function Cart(props) {

    const {cart,error} = useSelector(state=>state.cartSlice)
    const dispatch = useDispatch()

    const handleRemove= (data) => {
        dispatch(removeCart(data))
    }
    const handleBuy = (data) => {
        dispatch(updateAmount(data))
    }
    const handleClearAllCart = () => {
        dispatch(clearAllCart())
    }
    let array ={cartOj: JSON.parse(localStorage.getItem('cart'))}
    if(!array.cartOj){
        array.cartOj = []
    }
    console.log('arra',array.cartOj)
    return(
        <>
        <h2 className="page-title">Shopping Cart</h2>
       {array.cartOj.length >0 ?<>
      
        <div className="subtitle-item cart-container">
            <p>Product</p>
            <p>Price</p>
            <p>Quantity</p>
        </div>
        <div className="btn-cart clear-cart" onClick={handleClearAllCart}>Clear Cart</div>
        {error&&(<Alert severity="error">{error}</Alert>)}
        {
            array.cartOj.map(ele=>
            <div className="container" key={ele.id}>
        <div className="cart-container">
            <div className="item">
            <input type='image' className="item-image"  src={ele.image} alt="image" />
                <div className="item-info">{ele.name}</div>
            </div>

            <div className="price">{ele.price}</div>
            <div className="quantity">{ele.cartQuantity}</div>
            <div className="btn-item-cart">
                <button className="buy btn-cart" onClick={()=>handleBuy(ele)}>Buy</button>
                <button className="remove btn-cart" onClick={()=>handleRemove(ele)}>Remove</button>
            </div>
        </div>
        </div>
        )
      }
      </>:
      <p className="empty">THE CART IS EMPTY</p>
      
      }


    </>
    )
}