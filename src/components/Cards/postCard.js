
import React, { useState ,useRef} from 'react';
import { Button } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Access from '../Access/Access';
import './Card.css'
export default function PostCards({postData}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const titleRef = useRef(null)
    const priceRef = useRef(null)
    const amountRef = useRef(null)
    const discRef = useRef(null)
    const categoryRef = useRef(null)
    const imageRef = useRef(null)
   


    const handleSubmit = ()=>{
        const sendData ={
            name: titleRef.current.value,
            category:  categoryRef.current.value,
            description:   discRef.current.value,
            price:  priceRef.current.value,
            amount: amountRef.current.value,
            image:imageRef.current.value
                }

                postData(sendData)
    }

    return(
        <>
        <Access action="delete">
        <Button variant="primary" size="lg" onClick={handleShow} className="ms-4 mt-3">
        Add Product
      </Button>
        {/* <Button variant="primary" style={{padding:'1px'}}>
       
        </Button> */}
        </Access>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your title"
                  autoFocus
                  ref={titleRef}
                />
              </Form.Group>
              {/* *****************  */}
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="example book..."
                  ref={categoryRef}
                />
              </Form.Group>
              {/* *****************  */}
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ex 10$"
                  ref={priceRef}
                />
              </Form.Group>
              {/* *****************  */}
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="1,2,3..."
                  ref={amountRef}
                />
              </Form.Group>
              {/* *****************  */}
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Add Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="http//"
                  ref={imageRef}
                />
              </Form.Group>
              {/* *****************  */}
            
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Disruption</Form.Label>
                <Form.Control as="textarea" rows={3}     ref={discRef}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>{handleClose();handleSubmit()}} className="btn-add" >
              Add Product
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}