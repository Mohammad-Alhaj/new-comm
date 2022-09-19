import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react';
import {getData,postData,updateData,deleteCard} from '../../store/API'
import UpdateCards from './UpdataCards';
import PostCards from './postCard';
import DeleteCard from './DeleteCard';
 import { Alert, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import './Card.css'
import { Dropdown } from 'react-bootstrap';
import cookie from 'react-cookies'
import { isSinginRed } from '../../store/auth'; 
import Access from '../Access/Access';
import { addFavorite,removeFavorite } from "../../store/favorite"

export default function Cards(props){

    const {allShirt,isLoading,error} = useSelector((state)=>state.shirt)

const dispatch = useDispatch()

useEffect(()=>{
    dispatch(getData())
  
},[dispatch])

useEffect(()=>{
  console.log('ddddddddddddd');
  console.log(cookie.load('token'));
  if(1){
   dispatch(isSinginRed(true))
  }else{
    dispatch(isSinginRed(false))
  }
},[])


const postDatas = (data)=>{
   dispatch(postData(data))
    }

const updatedata = (data)=>{
    console.log(data)
    dispatch(updateData(data))
  
}
const deleteCards = (data)=>{

    dispatch(deleteCard(data))
  
}
// handle favorite page
const handleAddTofav = (data)=>{
  dispatch(addFavorite(data))
}

return(

  
  !isLoading?  <>
{  error &&(<Alert severity="error">{error}</Alert>)}
<PostCards  postData={postDatas}/>
<div className='container-cards'>
<div className='cards'>
  
  {
    allShirt.map((ele,idx)=>
    <Card  key={ele.id} className='card-item'>
     <Card.Img variant="top" src={ele.image} />
      <Card.Body>
        <Card.Title>{ele.name}</Card.Title>
        <Card.Text>
         {ele.description}
        </Card.Text>
        <div className='price-favor d-flex justify-content-around'>
        <Card.Text className='font-weight-bold'>
            {ele.price}
        </Card.Text>
            <i className="fa-regular fa-heart" onClick={()=>handleAddTofav(ele)}></i>
        </div>
        <div className="btn_actions">
      {  ele.amount > 0 ?
        <div className='amount btn_ac' >
           Available
        </div>:
   
        <div className='amount btn_ac' style={{backgroundColor:'#dc3545'}}>
        out stock
     </div>
        }
     
        <Access action='delete'>
        <Dropdown>
      <Dropdown.Toggle className='p-1' variant="secondary" id="dropdown-basic">
       Actions
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1"><UpdateCards data={updatedata} id={ele.id}/></Dropdown.Item>
        <Dropdown.Item href="#/action-2"><DeleteCard  id={ele.id} deleteCards={deleteCards}/></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </Access>
       <Link to={`/card/${ele.id}`}>  <Button className='p-1' variant="primary">More details</Button></Link>
       </div>
        {/* <Button variant="primary"></Button>
        <Button variant="danger"></Button> */}
        {/* <Button variant="danger "></Button> */}
      </Card.Body>
  
    </Card> 

 
    )
    
    }
    </div>
    </div>
    </>:<CircularProgress />

    
)
}