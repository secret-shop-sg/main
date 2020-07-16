import React,{useState} from "react";
import "../login.css"
import "../Bootstrap.css"
import {FaUserCircle} from "react-icons/fa"
function Signup(){
return(
<div className="wrapper fadeInDown">
  <div id="formContent">

    <div style={{paddingTop:10, paddingBottom:10}} className="fadeIn first">
      <FaUserCircle size={61}/>
    </div>
    <form>
      <input type="text" id="textthing" className="fadeIn second input" name="login" placeholder="username" />
      <input type="text" id="textthing" className="fadeIn third input" name="login" placeholder="email" />
      <input type="text" id="textthing" className="fadeIn fourth input" name="login" placeholder="password" />
      <input type="text" id="textthing" className="fadeIn fifth input" name="login" placeholder="confirm password" />
      <input type="submit" className="fadeIn sixth input" value="Create Account" />
    </form>
  </div>
</div>
)
}

export default Signup