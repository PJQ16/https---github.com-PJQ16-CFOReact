import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../../config';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TabActivityLocation() {
  const [imageLocations, setImageLocations] = useState([]);
  const [fileFr, setFileFr] = useState(2);
  const fileInputRef = useRef(null);
  const {id} = useParams();
  const [activityPeriodId,setActivityPeriodId] = useState(id);

  const [showImages,setShowImages] = useState([]);


  useEffect(()=>{
    fetchImages();
  },[])
  const fetchImages = async()=>{
      try{
        const res = await axios.get(config.urlApi + `/images/ImageFr02/${id}`)
        setShowImages(res.data);
        
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

  const handleFileSelectLo = () => {
    const fileLos = fileInputRef.current.files;
    if (fileLos && fileLos.length > 0) {
      if (imageLocations.length + fileLos.length > 5) {
        alert('You can only upload up to 5 images.');
        return;
      }

      const newImages = Array.from(fileLos).map((file) => ({
        src: URL.createObjectURL(file),
        file: file,
      }));

      setImageLocations((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleImageRemove = (index) => {
    const filteredImages = imageLocations.filter((image, i) => i !== index);
    setImageLocations(filteredImages);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    for (const image of imageLocations) {
      formData.append('images', image.file);
    }
    formData.append('fileFr', fileFr);
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
        fetchImages();
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
      fetchImages();
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




return (
  <div>
    <div className="row">
    <ToastContainer />
      <p className='h2 text-center'>แผนภาพองค์กร</p>
      <div className="col-md-12 d-flex flex-column justify-content-center">
        {showImages.length > 0 ? (
          showImages.map((image) => (
            <div key={image.id}>
              <button className="btn btn-danger rounded-circle mt-2" onClick={() =>handleRemoveImg(image.id)}><DeleteIcon/></button>
             <div className="">
            <div className="card-body d-flex flex-column justify-content-center align-items-center flex-wrap">
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
            <div className="card-body d-flex justify-content-center align-items-center flex-wrap">
              {imageLocations.map((image, index) => (
                <div key={index} style={{ position: 'relative', marginRight: '10px', marginBottom: '10px' }}>
                  <img
                    src={image.src}
                    alt={`Image ${index + 1}`}
                    className="img-fluid"
                    style={{ marginRight: '5px' }}
                  />
                  <button
                    onClick={() => handleImageRemove(index)}
                    style={{ position: 'absolute', top: '5px', right: '5px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    &#x2715;
                  </button>
                </div>
              ))}
              {imageLocations.length < 5 && (
                <label htmlFor="fileInput">
                  <img
                    src="https://media.istockphoto.com/id/1248723171/vector/camera-photo-upload-icon-on-isolated-white-background-eps-10-vector.jpg?s=612x612&w=0&k=20&c=e-OBJ2jbB-W_vfEwNCip4PW4DqhHGXYMtC3K_mzOac0="
                    alt="Upload"
                    className="img-fluid"
                  />
                </label>
              )}
              <input
                id="fileInput"
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                multiple
                onChange={handleFileSelectLo}
                accept=".png, .jpg, .jpeg, .svg"
              />
              <input type="hidden" name="fileFr" value={fileFr} onChange={(e) => setFileFr(e.target.value)} />
              <input type="hidden" name="activityperiod_id" value={activityPeriodId} onChange={(e) => setActivityPeriodId(e.target.value)} />
            </div>
            {imageLocations.length > 0 && (
              <button  className='btn' style={{backgroundColor:'#D6C2F1'}} onClick={handleSubmit}>บันทึก</button>
            )}
          </div>
          
        )}
      </div>
    </div>
  </div>
);
}

export default TabActivityLocation;
