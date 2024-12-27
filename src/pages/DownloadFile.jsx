import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../config";
import { UserContext } from "../components/MyContext";
import "bootstrap/dist/css/bootstrap.min.css";
import NewNavbar from "../components/NewNavbar";
import Aside from "../components/Aside";
import NewFooter from "../components/NewFooter";

export default function DownloadFile() {
    const { userData } = useContext(UserContext);
    const [dataPeriods, setDataPeriods] = useState([]);
    const [fileDownload, setFileDownload] = useState([]);
  
    useEffect(() => {
      fetchDataPeriod();
    }, []);
  
    const fetchDataPeriod = async () => {
      try {
        const resPeriod = await axios.get(
          `${config.urlApi}/activity/showPeriod/${userData.facultyID}`
        );
        const resFiles = await axios.get(`${config.urlApi}/manageFile`);
        setDataPeriods(resPeriod.data);
        setFileDownload(resFiles.data);
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: e.message,
        });
      }
    };

    const handleDownload = async (fileName) => {
      if (!fileName) {
        Swal.fire("เกิดข้อผิดพลาด!", "ไม่มีชื่อไฟล์ที่จะดาวน์โหลด", "error");
        return;
      }
    
      try {
       const res = await Swal.fire({
              icon:'question',
              title:'ดาวน์โหลด',
              text:'กรุณากรอกคำว่า "ยืนยัน"',
              showCancelButton:true,
              input:'text',
              inputPlaceholder:'กรุณากรอกคำว่า "ยืนยัน"',
              inputValidator:(value)=>{
                if(!value){
                  return 'กรุณากรอกข้อความ'
                }else if(value !== "ยืนยัน"){
                  return 'กรุณากรอกคำว่า "ยืนยัน"'
                }
                  return null
              } 
        });
        if(res.isConfirmed){
          // เรียก API เพื่อดาวน์โหลดไฟล์
          const response = await axios.get(`${config.urlApi}/download/${fileName}`, {
            responseType: "blob", // สำคัญ: เพื่อให้รับข้อมูลเป็น Blob
          });
  
          // สร้าง URL สำหรับดาวน์โหลด
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName); // ตั้งชื่อไฟล์
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
  
          Swal.fire("ดาวน์โหลดสำเร็จ!", "", "success");
        }
  
       
      } catch (error) {
        console.error("Error downloading file:", error);
        Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถดาวน์โหลดไฟล์ได้", "error");
      }
    };
      

    return (
      <div className="app">
        <div id="app">
          <div className="main-wrapper">
            <NewNavbar />
            <Aside />
            <div className="app-content">
              <section className="section">
                <p className="h3">ไฟล์เอกสาร</p>
                <div className="accordion" id="accordionExample">
                  {fileDownload.map((item, fileIndex) => 
                    item.statue_active === '1'&&(
                    <div className="accordion-item" key={`file-${fileIndex}`}>
                      <h2 className="accordion-header" id={`heading-${fileIndex}`}>
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse-${fileIndex}`}
                          aria-expanded="false"
                          aria-controls={`collapse-${fileIndex}`}
                        >
                          {item.categoryName || `${item.cate_name}`}
                        </button>
                      </h2>
                      <div
                        id={`collapse-${fileIndex}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading-${fileIndex}`}
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          {item.manage_files && item.manage_files.length > 0 ? (
                            <ul>
                              {item.manage_files.map((manage_file, manageIndex) => 
                                manage_file.status_active === '1' && (
                                <li key={`file-${fileIndex}-doc-${manageIndex}`}>
                                  <a
                                         onClick={() => manage_file?.file_name && handleDownload(manage_file.file_name)} // ตรวจสอบว่ามี file_name ก่อน
                                        href="#"
                                        className="text-decoration-none"
                                        >
                                        {manage_file.file_detail + '.'+ manage_file.file_type}
                                        </a>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>ไม่มีไฟล์ในหมวดนี้</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )
                }
                </div>
              </section>
            </div>
            <NewFooter />
          </div>
        </div>
      </div>
    );
  }
  