import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FactoryIcon from "@mui/icons-material/Factory";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Swal from "sweetalert2";
import config from "../config";


export default function Sidebar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("The current button");
  const navigate = useNavigate();
  const handleLinkClick = (linkText) => {
    setActiveLink(linkText);
  };

  const handlerSignOut = (event) => {
    try {
      event.preventDefault();
      
      Swal.fire({
        icon: 'question',
        title: 'ออกจากระบบ',
        text: 'ต้องการออกจากระบบหรือไม่?',
        showConfirmButton: true,
        showCancelButton: true
      }).then(res => {
        if (res.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'ออกจากระบบ',
            text: 'ออกจากระบบเรียบร้อย',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 2000,
            timerProgressBar: true,
          })
          localStorage.removeItem(config.token_name);
          navigate('/login');
        }
      })
    } catch (e) {
      console.log(e.message);
    }
  }



  return (
    <div className="col-lg-2 col-md-2 col-sm-12 p-3 mx-3" >
      <div className="list-group text-decoration-none" style={{border:'1px soild #A97C51'}} >
        <Link
          to="/"
          className={`list-group-item list-group-item-action ${
            location.pathname === "/" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("The current button")}
          style={{backgroundColor:'#696AAD'}}
        >
          <HomeIcon /> หน้าแรก
        </Link>
        <Link
          to={`/Activitydata`}
          className={`list-group-item list-group-item-action ${
            location.pathname === "/Activitydata" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("A second button item")}
          style={{backgroundColor:'#696AAD'}}
        >
          <FactoryIcon /> กิจกรรมปล่อยก๊าซ
        </Link>
        <button
          type="button"
          className={`list-group-item list-group-item-action ${
            location.pathname === "/signout" ? "active" : ""
          }`}
          onClick={handlerSignOut}
          style={{backgroundColor:'#696AAD'}}
        >
          <ExitToAppIcon /> ออกจากระบบ
        </button>
      </div>
    </div>
  );
}
