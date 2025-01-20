import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <>
    <div className='d-flex justify-content-between fixed-top' style={{backgroundColor:'#0398fc'}}>
    <div className='d-flex'>
      <i class="fa-brands fa-opencart text-white ps-4" style={{paddingTop:'30px' , fontSize:'1.5rem'}}></i>
      <h4 className='ps-3 pt-4'><Link to={'/'} className='text-white text-decoration-none'>Eshoppee</Link></h4>
    </div>
        <div className='text-end p-4'>
          
          <Link to={'/cart'} className='fw-bolder text-white text-decoration-none fs-5'><i class="fa-solid fa-cart-shopping"></i></Link>
        </div>
    </div>
    </>
   
  )
}

export default Header