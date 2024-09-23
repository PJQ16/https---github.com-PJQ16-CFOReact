import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FactoryIcon from "@mui/icons-material/Factory";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Swal from "sweetalert2";
import config from "../config";
import axios from 'axios';
export default function Aside() {
    const [measure,setMeasuer] = useState([]);
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

      const fetchData = async() =>{
        try{
          const res = await axios.get(config.urlApi + '/measure');
          setMeasuer(res.data);

        }catch(err){
          console.log(err.meassge)
        }
      }

      useEffect(()=>{
        fetchData();
      },[])
  
  return (
    <aside className="app-sidebar">
    <ul className="side-menu">
        <li>
            <Link  className="side-menu__item" to="/"   onClick={() => handleLinkClick("The current button1")}><i className="side-menu__icon fa fa-home"></i><span className="side-menu__label">หน้าแรก</span></Link>
        </li>
        
        <li>
            <Link  className="side-menu__item" to="/Activitydata"   onClick={() => handleLinkClick("The current button2")}><i className="side-menu__icon fa fa-calendar"></i><span className="side-menu__label">กรอกข้อมูลก๊าซเรือนกระจก</span></Link>
        </li>

  {/*       <li>
            <Link  className="side-menu__item" to="/measure"   onClick={() => handleLinkClick("The current button3")}><i className="side-menu__icon fa fa-list"></i><span className="side-menu__label">กรอกข้อมูลมาตรการ</span></Link>
        </li> */}
        
        <li className="slide">
            <a className="side-menu__item" data-toggle="slide" href="#"   onClick={() => handleLinkClick("The current button")}><i className="side-menu__icon fa fa-tasks"></i><span className="side-menu__label">กรอกข้อมูลมาตรการ</span><i className="angle fa fa-angle-right"></i></a>
           <ul className="slide-menu">
                  {measure.map((item,index)=>(
              <Link to={`/measure?name=${encodeURIComponent(item.name)}&num=${encodeURIComponent(item.id)}`} className="slide-item">
              {item.name}
            </Link>
              ))}
            </ul> 
        </li>       
    </ul>
</aside>
  )
}
