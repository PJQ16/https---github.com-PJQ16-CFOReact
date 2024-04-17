import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Content from '../components/Content';
import { Link,  } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../config';
import { UserContext } from '../components/MyContext';
import ForestIcon from '@mui/icons-material/Forest';

export default function Activitydata() {
    const {userData} = useContext(UserContext);
    const [dataPeriods,setDataPeriods] = useState([]);


    useEffect(() => {
        fetchDataPeriod();
    }, []);

    const fetchDataPeriod =async() =>{
        try{
            const res = await axios.get(config.urlApi + `/activity/showPeriod/${userData.facultyID}`)
            setDataPeriods(res.data);
        }catch(e){
            Swal.fire({
                icon:'error',
                title:'error',
                text:e.message
            })
        }
    }

  return (
    <div>
     <Navbar/>
     <Layout>
     <Sidebar/>
     <Content>
        <div className="row">
        {dataPeriods.map((item)=>
            <div className="col-md-4 my-2" key={item.id}>
            <div className="card" style={{width:'18rem'}}>
                <img src='https://media.istockphoto.com/id/1248723171/vector/camera-photo-upload-icon-on-isolated-white-background-eps-10-vector.jpg?s=612x612&w=0&k=20&c=e-OBJ2jbB-W_vfEwNCip4PW4DqhHGXYMtC3K_mzOac0=' className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">ปล่อยก๊าซเรือนกระจก {item.years + 543}</h5>
                    <p className="card-text">กิจกรรมการปล่อยก๊าซเรือนกระจก ของวิทยาเขต {userData.campusName} หน่วยงาน{userData.facultyName}</p>
                    <Link  to={`/activityDetail/${item.fac_id}/${item.years + 543}/${item.id}`} className="btn text-white" style={{backgroundColor:'#043C7F'}}><ForestIcon style={{color:'white'}}/> กิจกรรม</Link>
                </div>
                </div>
            </div>
            )}
        </div>
     </Content>
     </Layout>
     <Footer/>
    </div>
  );
}
