import React from 'react'
import {BiHome, BiSearch,BiMessageAltMinus} from "react-icons/bi";
import {MdAddCircleOutline} from "react-icons/md";
import {BsFillPersonFill} from 'react-icons/bs'

const BottomNavbar = () => {
  return (
    <div style={{display:'flex', alignItems:'center', gap:'40px', position:'fixed', bottom:'20px'}}>
        <BiHome  style={{ fontSize:'30px'}} />
               <BiSearch  style={{ fontSize:'30px'}} />
        <MdAddCircleOutline  style={{ fontSize:'30px'}} />
        <BiMessageAltMinus  style={{ fontSize:'30px'}} />
        <BsFillPersonFill  style={{ fontSize:'30px'}} />

    </div>
  )
}

export default BottomNavbar