import { useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useDispatch,useSelector } from 'react-redux'
import {getDataById} from '../../store/API'

 import { CircularProgress } from '@mui/material';
import { useEffect } from "react";

import './CardsDetails.css'
import { addCart } from "../../store/cart";
export default function CardDetails(props){

    const {isLoading,oneShirt} = useSelector((state)=>state.shirt)

    const {id} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getDataById(id))
    },[dispatch,id])
   
    const  handleAddCart = (oneShirt)=>{

dispatch(addCart(oneShirt))
    }


    return(
      !isLoading? <div className="container-card-details">
      <div className="card-details">
    
    <Card style={{ maxWidth: '120rem' }} key={oneShirt.id} className='card-item-details col'>
     <Card.Img variant="top" src={oneShirt.image} />
      <Card.Body className="body-text-card">
        <Card.Title className="text" >{oneShirt.name}</Card.Title>
        <Card.Text className="text-dis">
         {oneShirt.description}
        </Card.Text>
        <Card.Text className="text">
            {oneShirt.price}
        </Card.Text>
        {oneShirt.amount >0?<Button  variant="primary" size="lg" onClick={()=>handleAddCart(oneShirt)}>Add cart</Button>:
        
        <p style={{backgroundColor:'red' ,color:'white'}}>Out stock</p>
        }
      </Card.Body>
    </Card> 
    
    </div>
    </div>:<CircularProgress/>
    )
}