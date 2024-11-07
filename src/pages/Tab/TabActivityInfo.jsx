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
  const [employee, setEmployee] = useState('');
  const [area, setArea] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    fetchDataInfo();
    onLoadDataActivity();
  }, []);

  useEffect(() => {
    setIsDisabled(!isQuarterlyFillDate()); // ถ้า isQuarterlyFillDate() เป็น true จะทำให้ isDisabled เป็น false
  }, []);

  const fetchDataInfo = async () => {
    try {
      const res = await axios.get(config.urlApi + `/activity/showPeriod/${fac_id}/${years - 543}`);
      setInfos(res.data);
      if (res.data.length > 0) {
        const { faculty, employee_amount, building_area } = res.data[0];
        setLatitude(faculty.latitude);
        setLongitude(faculty.longitude);
        setEmployee(employee_amount); // กำหนดค่าเริ่มต้นให้ state employee
        setArea(building_area); // กำหนดค่าเริ่มต้นให้ state area
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
        fetchDataInfo(); 
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message
      });
    }
  };

   const onLoadDataActivity = async () => {
    try {
      const existingData = await axios.get(config.urlApi + `/checkExistingData/${id}`);
      if (existingData.data.length > 0) return;

      Swal.fire({
        title: "Downloading ข้อมูลกิจกรรมการปล่อยก๊าซเรือนกระจก",
        html: "เหลือเวลา <b></b> วินาที.",
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        }
      }).then(async () => {
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
  };
 
  const isQuarterlyFillDate = () => {
    const today = new Date();
    const year = today.getFullYear() + 543; // แปลงปีให้เป็นพุทธศักราช
    const month = today.getMonth() + 1; // เพิ่ม 1 เพื่อให้เดือนตรงกับปฏิทินปกติ
    const date = today.getDate();
  
    
    // ตรวจสอบเงื่อนไขสำหรับวันที่ที่สามารถกรอกข้อมูลได้
    //เงื่อนไขแรกจะ fixed ว่ามีการ กรอกข้อมูลของปี 2567  เดือน พฤศจิกา 2567 เวลา 8.00 น แต่ปีต่อๆ ไป จะเช็ค ตามไตรมาส เดือนที่ 4,7,10,1  
    return (
      ((year === 2567 && month === 11 && date <= 20) ||
      ([4, 7, 10, 1].includes(month) && date <= 15))
    );
  };
  return (
    <div>
      {infos.map((info, index) => (
        <div className="row" key={index}>
          <p className='h2'>ข้อมูลทั่วไป</p>
          <div className="row px-3">
            {/* Left column for the map */}
            <div className="col-md-6 mb-3">
              <div className="">
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

            {/* Right column for form */}
            <div className="col-md-6">
              <div className="">
                <div className="card-body">
                  <form onSubmit={handlerSubmitUpdate}>
                    <div className="row">
                      {/* Left labels */}
                      <div className="col-md-4">
                        <div className="d-flex flex-column">
                          <span className='mt-2'>วิทยาเขต:</span>
                          <span className='mt-2'>หน่วยงาน:</span>
                          <span className='mt-3'>จำนวนพนักงาน:</span>
                          <span className='mt-4'>พื้นที่ใช้สอย:</span>
                          <span className='mt-5'>Latitude:</span>
                          <span className='mt-4'>Longitude:</span>
                          <span className='mt-5'>รูปแบบการคำนวณ:</span>
                          <span className='mt-4'>ปีฐาน:</span>
                        </div>
                      </div>

                      {/* Right inputs/values */}
                      <div className="col-md-8">
                        <div className="d-flex flex-column">
                          <span className='mt-2'>{info.campus.campus_name}</span>
                          <span className='mt-2'>{info.faculty.fac_name}</span>
                          <input
                            type="number"
                            className="form-control mt-3"
                            defaultValue={info.employee_amount}
                            onChange={(e) => setEmployee(e.target.value)}
                            required
                            disabled={isDisabled} 
                          />
                          <input
                            type="number"
                            className="form-control mt-3"
                            defaultValue={info.building_area}
                            step="any"
                            onChange={(e) => setArea(e.target.value)}
                            required
                            disabled={isDisabled} 
                          />
                          <input
                            type="text"
                            className="form-control mt-4"
                            disabled
                            value={latitude}
                          />
                          <input
                            type="text"
                            className="form-control mt-4"
                            disabled
                            value={longitude}
                          />
                          <span className='mt-4'>องค์การบริหารจัดการก๊าซเรือนกระจก (องค์การมหาชน)</span>
                          <span className='mt-4'>2565</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12 py-2 text-end">
                      <button className="btn"   disabled={isDisabled}  style={{ backgroundColor: '#A969FE', color: '#ffffff' }}>บันทึกข้อมูล</button>
                    </div>
                  </form>
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
