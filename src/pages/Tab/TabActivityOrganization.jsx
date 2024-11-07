import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../../config';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PublishIcon from '@mui/icons-material/Publish';
function TabActivityOrganization() {
  const [imageOranizations, setImageOranization] = useState([]);
  const [fileFr2, setFileFr2] = useState(3);
  const fileInputRef2 = useRef(null);
  const {id} = useParams();
  const [activityPeriodId,setActivityPeriodId] = useState(id);

  const [showImages2,setShowImages2] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(()=>{
    fetchImageOranizations();
  },[])

  useEffect(() => {
    setIsDisabled(!isQuarterlyFillDate()); // ถ้า isQuarterlyFillDate() เป็น true จะทำให้ isDisabled เป็น false
  }, []);
  const fetchImageOranizations = async()=>{
      try{
        const res = await axios.get(config.urlApi + `/images/ImageFr03/${id}`)
        setShowImages2(res.data);
        
      }catch(error){
        Swal.fire(
          {
            icon:'error',
            title:'error',
            text:error.message
          }
        )
      }
  }

  const handleFileSelectOr = () => {
    const fileLos = fileInputRef2.current.files;
    if (fileLos && fileLos.length > 0) {
      if (imageOranizations.length + fileLos.length > 5) {
        alert('You can only upload up to 5 images.');
        return;
      }

      const newImages = Array.from(fileLos).map((file) => ({
        src: URL.createObjectURL(file),
        file: file,
      }));

      setImageOranization((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleImageRemove = (index) => {
    const filteredImages = imageOranizations.filter((image, i) => i !== index);
    setImageOranization(filteredImages);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    for (const image of imageOranizations) {
      formData.append('images', image.file);
    }
    formData.append('fileFr', fileFr2);
    formData.append('activityperiod_id',activityPeriodId);
  
    try {
      const res = await Swal.fire({
        icon: 'question',
        title: 'เพิ่มรูป',
        text: 'คุณต้องการเพิ่มรูปใช่หรือไม่',
        showCancelButton: true
      });

      if (res.isConfirmed) {
        await Swal.fire({
          icon: 'success',
          title: 'สำเร็จ',
          text: 'บันทึกสำเร็จ"',
          timer: 1500,
          timerProgressBar: true
        });

        await axios.post(config.urlApi + '/uploadImages', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        fetchImageOranizations();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    } 
};

const handleRemoveImg = async (imgId) => {
  const result = await Swal.fire({
    icon: "warning",
    title: "โปรดยืนยันการลบ",
    input: 'text',
    inputPlaceholder: 'ยืนยันพิมคำว่า YES',
    inputAttributes: {
      pattern: '^[Yy][Ee][Ss]$',
      maxlength: 3
    },
    confirmButtonColor: "#7a3",
    confirmButtonText: "Submit",
    showCancelButton: true,
    cancelButtonColor: "#b45e",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      if (!value || !value.match(/^[Yy][Ee][Ss]$/)) {
        return 'Please enter the correct value (YES).';
      }
    }
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(config.urlApi + `/uploadImages/${imgId}`);
      await Swal.fire({
        icon: "success",
        title: "ลบข้อมูลสำเร็จ",
        timer: 800,
        timerProgressBar: true
      });
      fetchImageOranizations();
      // คุณอาจต้องการทำการอัปเดต state เพื่อลบรูปภาพออกจากหน้าจอ
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.message,
      });
    }
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
    <div className="row">
    <p className='h2 text-center'>โครงสร้างองค์กร</p>
      <div className="col-md-12 d-flex flex-column justify-content-center">
        {showImages2.length > 0 ? (
          showImages2.map((image) => (
            <div key={image.id}>
                <button className="btn btn-danger rounded-circle mt-2" onClick={() =>handleRemoveImg(image.id)}><DeleteIcon/></button>
             <div className="">
            <div className="card-body d-flex justify-content-center align-items-center flex-wrap">
            <label htmlFor="fileInput">
                  <img
                    src={`${config.urlApi}/uploads/${image.file_name}`}
                    alt="Upload"
                    className="img-fluid"
                  />
                </label>

              </div>
              </div>
            </div>
          ))
        ) : (
          <div className="">
            <div className="d-flex justify-content-start">
            {imageOranizations.length > 0 && (
              <button  className='btn-lg btn-primary'  disabled={isDisabled}  onClick={handleSubmit}><PublishIcon/> บันทึรูปภาพ</button>
            )}
            </div>
            <div className="card-body d-flex justify-content-center align-items-center flex-wrap">
              {imageOranizations.map((image, index) => (
                <div key={index} style={{ position: 'relative', marginRight: '10px', marginBottom: '10px' }}>
                  <img
                    src={image.src}
                    alt={`Image ${index + 1}`}
                    className="img-fluid"
                    style={{ marginRight: '5px' }}
                  />
                  <button
                    onClick={() => handleImageRemove(index)}
                    style={{ position: 'absolute', top: '5px', right: '5px', background: 'transparent', border: 'none', cursor: 'pointer',color:'white' }}
                  >
                    &#x2715;
                  </button>
                </div>
              ))}
              {imageOranizations.length < 5 && (
                <label htmlFor="fileInputOR">
                  <img
                    src="https://media.istockphoto.com/id/1248723171/vector/camera-photo-upload-icon-on-isolated-white-background-eps-10-vector.jpg?s=612x612&w=0&k=20&c=e-OBJ2jbB-W_vfEwNCip4PW4DqhHGXYMtC3K_mzOac0="
                    alt="Upload"
                    className="img-fluid"
                  />
                  <input
                    id="fileInputOR"
                    ref={fileInputRef2}
                    type="file"
                    style={{ display: 'none' }}
                    multiple
                    onChange={handleFileSelectOr}
                    accept=".png, .jpg, .jpeg, .svg"
                  />
                </label>
              )}
             
              <input type="hidden" name="fileFr" value={fileFr2} onChange={(e) => setFileFr2(e.target.value)} />
              <input type="hidden" name="activityperiod_id" value={activityPeriodId} onChange={(e) => setActivityPeriodId(e.target.value)} />
            </div>
            {imageOranizations.length > 0 && ( // เพิ่มเงื่อนไขที่ตรวจสอบว่ามีไฟล์ที่ถูกเลือกเข้ามาหรือไม่
  <button className='btn' style={{backgroundColor:'#D6C2F1'}}  disabled={isDisabled} onClick={handleSubmit}>บันทึก</button>
)}
          </div>
        )}
      </div>
    </div>
  </div>
);
}

export default TabActivityOrganization;


