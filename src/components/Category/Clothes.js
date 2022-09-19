
import { useDispatch } from "react-redux"
import { categoryAction } from "../../store/cart"
import { getData } from "../../store/API"
import Cards from "../Cards/Cards"

export default function Clothes(props)  {
const dispatch = useDispatch()
    return(
        <>
        {console.log( <Cards/>)}
        <Cards/>
      
        </>
    )
}