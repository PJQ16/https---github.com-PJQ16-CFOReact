import React, { useContext, useEffect, useState } from 'react';
import Map from '../../components/Map';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../../config';
import { UserContext } from '../../components/MyContext';
function TabActivityInfo() {
  const {id, years, fac_id } = useParams();
  const [infos, setInfos] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const {userData} = useContext(UserContext);
  const [employee,setEmployee] = useState('');
  const [area,setArea] = useState('');


  useEffect(() => {
    fetchDataInfo();
    onLoadDataActivity();
  }, []);

  const fetchDataInfo = async () => {
    try {
      const res = await axios.get(config.urlApi + `/activity/showPeriod/${fac_id}/${years - 543}`);
      setInfos(res.data);
      if (res.data.length > 0) {
        const { faculty } = res.data[0]; // Assuming latitude and longitude are available in the first item
        setLatitude(faculty.latitude);
        setLongitude(faculty.longitude);
      }
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: e.message
      });
    }
  }; 
  const handlerSubmitUpdate = async (event) => {
    try {
        event.preventDefault();
        const payload = {
            employee_amount: employee,
            building_area: area
        };

        const confirmation = await Swal.fire({
            icon: 'question',
            title: 'Question',
            text: 'ต้องการบันทึกข้อมูลใช่หรือไม่?',
            showCancelButton: true
        });

        if (confirmation.isConfirmed) {
            await Swal.fire({
                icon: 'success',
                title: 'บันทึก',
                text: 'บันทึกข้อมูลสำเร็จ',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });

            await axios.put(config.urlApi + `/activity/modifyDataPeriod/${id}`, payload);
            fetchDataInfo(); // ทำการเรียกใช้ fetchDataInfo() ภายในนี้
        }
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.message
        });
    }
};

const onLoadDataActivity = async (event) => {
  try {
    // เรียก API เพื่อตรวจสอบว่ามีข้อมูลใน activityperiod_id นี้อยู่แล้วหรือไม่
    const existingData = await axios.get(config.urlApi + `/checkExistingData/${id}`);

 
    // ถ้ามีข้อมูลอยู่แล้วใน activityperiod_id นี้ ให้ไม่ทำการโหลดข้อมูลใหม่
     if (existingData.data.length > 0) {
      return;
    }

    // ถ้าไม่มีข้อมูลใน activityperiod_id นี้ ให้ทำการโหลดข้อมูล
    let timerInterval;
    Swal.fire({
      title: "Downloand ข้อมูลกิจกรรมการปล่อยก๊าซเรือนกระจก",
      html: "เหลือเวลา<b></b> วินาที.",
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then(async (result) => { 
      /* Read more about handling dismissals below */
       if (result.dismiss === Swal.DismissReason.timer) {
      } 

      // เมื่อ Swal ปิดลงแล้ว ให้ทำการโหลดข้อมูล
       await axios.post(config.urlApi + '/generateActivity', {
        activityperiod_id: id,
        fac_id: userData.facultyID,
        campus_id: userData.campusID
      });
      fetchDataInfo();

      Swal.fire('โหลดข้อมูลเสร็จเรียบร้อยแล้ว');
      window.location.reload();
    });
  } catch (e) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: e.message
    });
  }
}



  return (
    <div>
      {infos.map((info, index) => (
        <div className="row" key={index}>
            <p className='h2'>ข้อมูลทั่วไป</p>
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row px-2ฃ">
                  <div className="col-md-6">
                    <div className="card border-0">
                      <div className="card-body">
                        <Map
                          detail={`วิทยาเขต ${info.campus.campus_name} หน่วยงาน ${info.faculty.fac_name}`}
                          address={`ที่อยู่ ${info.faculty.address}`}
                          latitude={parseFloat(info.faculty.latitude)}
                          longitude={parseFloat(info.faculty.longitude)}
                          setLatitude={setLatitude}
                          setLongitude={setLongitude}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="col-md-12">
                      <div className="card border-0 shadow">
                        <div className="card-body">
                          <div className="row">
                            <form onSubmit={handlerSubmitUpdate}>
                           <div className="row">
  <div className="col-md-2 ">
    <div className="d-flex flex-column">
      <span className='my-3'>วิทยาเขต:</span>
      <span className='my-3'>หน่วยงาน:</span>
      <span className='my-3'>จำนวนพนักงาน:</span>
      <span className='my-3'>พื้นที่ใช้สอย:</span>
      <span className='my-3'>Latitude:</span>
      <span className='my-3'>Longitude:</span>
      <span className='my-3'>รูปแบบการคำนวณ:</span>
      <span className='my-3'>ปีฐาน:</span>
    </div>
  </div>
  <div className="col-md-9">
    <div className="d-flex flex-column">
      <span className='my-3'>{info.campus.campus_name}</span>
      <span className='my-3'>{info.faculty.fac_name}</span>
      <input
        type="number"
        className="form-control my-3"
        defaultValue={info.employee_amount}
        onChange={(e) => setEmployee(e.target.value)}
      />
      <input
        type="number"
        className="form-control my-2"
        defaultValue={info.building_area}
        onChange={(e) => setArea(e.target.value)}
      />
      <input type="text" className="form-control my-2" disabled value={latitude} />
      <input type="text" className="form-control my-2" disabled value={longitude} />
      <span className='my-4'>องค์การบริหารจัดการก๊าซเรือนกระจก (องค์การมหาชน)</span>
      <span className='my-3'>2565</span>
    </div>
  </div>
</div>

                            <div className="col-md-12 py-2">
                              <button className="btn" onClick={handlerSubmitUpdate} style={{backgroundColor:'#A969FE',color:'#ffffff'}}>บันทึกข้อมูล</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

  
     
    </div>
  );
}

export default TabActivityInfo;
