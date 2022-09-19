
import Header from './components/Header/Header';
import Cards from './components/Cards/Cards';
import CardDetails from './components/CardsDetails.js/CardsDetails';
import { Routes, Route } from "react-router-dom";
import AddToFav from './components/AddToFav/AddToFav';
import Signin from './components/Auth/Signin/Signin';
import {useSelector} from 'react-redux'
import Category from './components/Category/Category';
import { When } from 'react-if';
import Cart from './components/Cart/Cart';
import Clothes from './components/Category/Clothes';
import Electronics from './components/Category/Electronics';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const {isSingin} = useSelector((state)=>state.auth) 
  return (

    <div className="App">
        <When condition={isSingin} >
      <Header/>
      <Category/>
      <ToastContainer/>
      <Routes>
        <Route path='/new-comm' element={<Cards/>}/>
        <Route path='/new-comm/favorite' element={<AddToFav/>}/>
        <Route path='/new-comm/card/:id' element={<CardDetails/>}/>
        <Route path='/new-comm/cart' element={<Cart/>}/> 
        <Route path='/new-comm/clothes' element={<Clothes/>}/> 
        <Route path='/new-comm/electronics' element={<Electronics/>}/> 
      </Routes>
      </When>
      <Signin/>
      </div>
  );
}

export default App;
