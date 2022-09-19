import { Button, Card } from "react-bootstrap"
import { useSelector,useDispatch } from "react-redux"
import { addFavorite,removeFavorite } from "../../store/favorite"
import './AddToFav.css'

export default function AddToFav(props) {

    const {favoriteList} = useSelector(state=>state.favoriteSlice)
    const dispatch = useDispatch()
const handleRemove = (ele)=>{
    dispatch(removeFavorite(ele))
}
    return(
        <>
        <h2 className="page-title">Favorite List</h2>
        { favoriteList.length >0?<>
      {  favoriteList.map(ele=>
            <div className="container-fav">
      <Card style={{ width: '18rem' }}  key={ele.id} className="my-4 ms-4">
      <Card.Img variant="top" src={ele.image} />
      <Card.Body>
        <Card.Title>{ele.name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="danger" onClick={()=>handleRemove(ele)}>Remove</Button>
      </Card.Body>
    </Card>
    </div>
         )
        }
        </>:
        <p className="empty">THE FAVORITE LIST IS EMPTY</p>
    }
        </>
    )
}