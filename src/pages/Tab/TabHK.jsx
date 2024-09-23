import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import config from "../../config";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

export default function TabHK({ measureTitle }) {
  const { register, handleSubmit, watch } = useForm();
  const [measure, setMeasure] = useState([]);
  const [measureTiles, setMeasureTiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [checkedItems, setCheckedItems] = useState({}); // State สำหรับเก็บค่า checkbox ที่ถูกเลือก
  const { id } = useParams();

  // Fetch data from the API
  const fetchDataApi = async () => {
    try {
      const res = await axios.get(config.urlApi + "/measure");
      const fetchedMeasures = res.data;

      // Filter measure tiles based on measureTitle
      const filteredTiles = fetchedMeasures.flatMap((measure) =>
        measure.categorymeasures.flatMap((category) =>
          category.measure_tiles.filter(
            (tile) => category.id === parseInt(measureTitle)
          )
        )
      );

      setMeasure(fetchedMeasures);
      setMeasureTiles(filteredTiles);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchDataApi();
  }, []);

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < measureTiles.length - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      Swal.fire("No more pages", "You have reached the last page", "info");
    }
  };

  // Handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = (data) => {
    // กรองเฉพาะ checkbox ที่ถูกเลือก
   
    const selectedCheckedItems = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );

    // สร้าง object สำหรับเก็บข้อมูลที่เกี่ยวข้องกับ checkbox ที่ถูกเลือก
    const selectedData = selectedCheckedItems.reduce((acc, measureId) => {
      acc[measureId] = {
        activity_measure: data[`activity_measure${measureId}`],
        activity_ref: data[`activity_ref${measureId}`],
        report_measure: data[`report_measure${measureId}`],
        report_ref: data[`report_ref${measureId}`],
        worksite_area: data[`worksite_area${measureId}`],
        amount_item: data[`amount_item${measureId}`],
        size: data[`size${measureId}`],
        unit: data[`unit${measureId}`],
        result_saving: data[`result_saving${measureId}`],
        saving_unit: data[`saving_unit${measureId}`],
        saving_ref: data[`saving_ref${measureId}`],
        list_id: data[`list_id${measureId}`],
        activityperiod_id: id,
      };
      return acc;
    }, {});

    if (Object.keys(selectedData).length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'กรุณาเลือกอย่างน้อยหนึ่งรายการก่อนบันทึก!',
      });
    } else {
      // แสดงเฉพาะข้อมูลที่ถูกเลือกใน console.log
      Swal.fire({
        icon:'success'
      })
      console.log("Selected Data:", selectedData);
    }
  };

  const handleCheckboxChange = (measureId) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [measureId]: !prevState[measureId], // Toggle checked state
    }));
  };
  
  const isSectionVisible = (measureId) => {
    return checkedItems[measureId]; // ถ้า checkbox ถูกเลือกให้แสดงข้อมูลที่เกี่ยวข้อง
  };
  

  return (
    <div>
      {measureTiles[currentPage] && (
        <>
          <div key={measureTiles[currentPage].id}>
            <div
              className="fw-bold h3 text-white text-nowrap text-truncate"
              style={{ backgroundColor: "#8d95b9" }}
            >
              <span className="ms-2">{measureTiles[currentPage].name}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {measureTiles[currentPage].measure_lists.map(
              (measure_list, listIndex) => {
                const isChecked = checkedItems[measure_list.id]; // ตรวจสอบว่า Checkbox ถูกเลือกหรือไม่
                const activitySelected = watch(
                  `activity_measure${measure_list.id}`
                );
                const reportSelected = watch(
                  `report_measure${measure_list.id}`
                );
                

                return (
                  <div className="p-2" key={`${measure_list.id}`}>
                    <p className="h5">
                      <input
                        type="checkbox"
                        className="form-check-input mx-3"
                        onChange={() => handleCheckboxChange(measure_list.id)} // เมื่อคลิกที่ Checkbox
                        checked={isChecked || false} // แสดงสถานะการเลือก
                      />
                      <span className="ms-5">
                        {listIndex + 1}.{measure_list.name}
                      </span>
                    </p>

                    {/* แสดงข้อมูลเฉพาะเมื่อ Checkbox ถูกเลือก */}
                    {isChecked && (
                      <>
                        {/* กิจกรรม/วิธีการดำเนินการบริหารจัดการ */}
                        <span className="p-3">
                          <span className="h5">
                            กิจกรรม/วิธีการดำเนินการบริหารจัดการ
                          </span>
                          <div className="row">
                          <div className="col-3">
                          <p className="ps-4">
                            <input
                              type="checkbox"
                              name={`activity_measure${measure_list.id}`}
                              value="1"
                              {...register(
                                `activity_measure${measure_list.id}`
                              )}
                            />{" "}
                            ติดประกาศ/รณรงค์ประชาสัมพันธ์
                          </p>
                          </div>
                          {activitySelected && (
                            <>
                          <div className="col-3">
                          <p>
                                    <label htmlFor=""> จุดที่ดำเนินการ</label>
                                    <input
                                      type="text"                                  
                                      className="form-control"                  
                                      
                                      {...register(
                                        `worksite_area${measure_list.id}`
                                      )}
                                    />
                                  </p>

                          </div>
                          <div className="col-2">
                          <p className="ps-4">
                                    <label htmlFor="">จำนวนอุปกรณ์</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      {...register(
                                        `amount_item${measure_list.id}`
                                      )}
                                      
                                    />
                                  </p>
                            
                            </div>
                            <div className="col-2">
                            <p className="ps-4">
                                    <label htmlFor="">ขนาด(รวม)</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      
                                      {...register(`size${measure_list.id}`)}
                                    />
                                  </p>
                            </div>
                            <div className="col-2">
                            <p className="ps-4">
                                    <label htmlFor="">หน่วย</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      
                                      {...register(`unit${measure_list.id}`)}
                                    />
                                  </p>
                            </div>
                            </>
                              )}
                          </div>

                          <div className="row">
                            <div className="col-3">
                            <p className="ps-4">
                            <input
                              type="checkbox"
                              name={`activity_measure${measure_list.id}`}
                              value="2"
                              {...register(
                                `activity_measure${measure_list.id}`
                              )}
                            />{" "}
                            คณะทำงาน/ผู้รับผิดชอบ
                          </p>
                            </div>
                            
                            {activitySelected && (
                            <>
                          <div className="col-3">
                          <p>
                                    <label htmlFor=""> จุดที่ดำเนินการ</label>
                                    <input
                                      type="text"                                  
                                      className="form-control"                  
                                      
                                      {...register(
                                        `worksite_area${measure_list.id}`
                                      )}
                                    />
                                  </p>

                          </div>
                          <div className="col-2">
                          <p className="ps-4">
                                    <label htmlFor="">จำนวนอุปกรณ์</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      {...register(
                                        `amount_item${measure_list.id}`
                                      )}
                                      
                                    />
                                  </p>
                            
                            </div>
                            <div className="col-2">
                            <p className="ps-4">
                                    <label htmlFor="">ขนาด(รวม)</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      
                                      {...register(`size${measure_list.id}`)}
                                    />
                                  </p>
                            </div>
                            <div className="col-2">
                            <p className="ps-4">
                                    <label htmlFor="">หน่วย</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      
                                      {...register(`unit${measure_list.id}`)}
                                    />
                                  </p>
                            </div>
                            </>
                              )}
                          </div>
                          
                          <div className="row">
                            <div className="col-3">
                            <p className="ps-4">
                            <input
                              type="checkbox"
                              name={`activity_measure${measure_list.id}`}
                              value="3"
                              {...register(
                                `activity_measure${measure_list.id}`
                              )}
                            />{" "}
                            Automation/การควบคุมอัตโนมัติ
                          </p>
                          <input
                            type="hidden"
                            defaultValue={`${measure_list.id}`} // เปลี่ยนจาก value เป็น defaultValue
                            {...register(`list_id${measure_list.id}`)}
                          />

                            </div>

                            {activitySelected && (
                            <>
                          <div className="col-3">
                          <p>
                                    <label htmlFor=""> จุดที่ดำเนินการ</label>
                                    <input
                                      type="text"                                  
                                      className="form-control"                  
                                      
                                      {...register(
                                        `worksite_area${measure_list.id}`
                                      )}
                                    />
                                  </p>

                          </div>
                          <div className="col-2">
                          <p className="ps-4">
                                    <label htmlFor="">จำนวนอุปกรณ์</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      {...register(
                                        `amount_item${measure_list.id}`
                                      )}
                                      
                                    />
                                  </p>
                            
                            </div>
                            <div className="col-2">
                            <p className="ps-4">
                                    <label htmlFor="">ขนาด(รวม)</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      
                                      {...register(`size${measure_list.id}`)}
                                    />
                                  </p>
                            </div>
                            <div className="col-2">
                            <p className="ps-4">
                                    <label htmlFor="">หน่วย</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      
                                      {...register(`unit${measure_list.id}`)}
                                    />
                                  </p>
                            </div>
                            </>
                              )}
                          </div>
                         

                          {/* Show file input only if any radio button is selected */}
                          {activitySelected && (
                            <div className="col-5">
                              <div className="input-group mb-3">
                                <label
                                  className="input-group-text bg-secondary"
                                  htmlFor="inputGroupFile01"
                                >
                                  เอกสารอ้างอิง
                                </label>
                                <input
                                  type="file"
                                  className="form-control"
                                  id="inputGroupFile01"
                                  {...register(
                                    `activity_ref${measure_list.id}`
                                  )}
                                  accept=".png, .jpg, .pdf"
                                />
                              </div>
                            </div>
                          )}
                          <hr />
                        </span>

                        {/* Show การรายงาน/ประเมินผล if an activity is selected */}
                        {activitySelected && (
                          <span className="p-3">
                            <span className="h5">การรายงาน/ประเมินผล</span>
                            <p className="ps-4">
                              <input
                                type="checkbox"
                                name={`report_measure${measure_list.id}`}
                                value="1"
                                {...register(
                                  `report_measure${measure_list.id}`
                                )}
                              />{" "}
                              รูปแบบเอกสาร
                            </p>
                            <p className="ps-4">
                              <input
                                type="checkbox"
                                name={`report_measure${measure_list.id}`}
                                value="2"
                                {...register(
                                  `report_measure${measure_list.id}`
                                )}
                              />{" "}
                              รูปแบบ E-report
                            </p>

                            {/* Show file input only if a report radio button is selected */}
                            {reportSelected && (
                              <div className="col-5">
                                <div className="input-group mb-3">
                                  <label
                                    className="input-group-text bg-secondary"
                                    htmlFor="inputGroupFile01"
                                  >
                                    เอกสารอ้างอิง
                                  </label>
                                  <input
                                    type="file"
                                    className="form-control"
                                    id="inputGroupFile01"
                                    {...register(
                                      `report_ref${measure_list.id}`
                                    )}
                                    accept=".png, .jpg, .pdf"
                                  />
                                </div>
                              </div>
                            )}
                            <hr />
                          </span>
                        )}

                        {/* Show ปริมาณ and ปริมาณผลประหยัด if a report is selected */}
                        {reportSelected && (
                          <>

                            {/* ปริมาณผลประหยัด */}
                            <span className="p-3">
                              <span className="h5">ปริมาณผลประหยัด</span>
                              <div className="row">
                                <div className="col-4">
                                  <p className="ps-4">
                                    <label htmlFor=""> ผลประหยัด</label>
                                    <input
                                      type="text"
                                      name=""
                                      className="form-control"
                                      id=""
                                      {...register(
                                        `result_saving${measure_list.id}`
                                      )}
                                    />
                                  </p>
                                </div>
                                <div className="col-4">
                                  <p className="ps-4">
                                    <label htmlFor="">หน่วย</label>
                                    <input
                                      type="text"
                                      name=""
                                      className="form-control"
                                      id=""
                                      {...register(
                                        `saving_unit${measure_list.id}`
                                      )}
                                    />
                                  </p>
                                </div>
                                <div className="col-4">
                                  <p className="ps-4">
                                    <label htmlFor="">หลักฐานประกอบ</label>
                                    <input
                                      type="file"
                                      name=""
                                      className="form-control"
                                      id=""
                                      {...register(
                                        `saving_ref${measure_list.id}`
                                      )}
                                    />
                                  </p>
                                </div>
                              </div>
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                );
              }
            )}

            <button type="submit" className="btn btn-primary">
              บันทึกข้อมูล
            </button>
          </form>
        </>
      )}

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <div className="d-flex justify-content-between position-fixed control-buttons">
          <button
            onClick={handlePreviousPage}
            className="btn btn-secondary rounded-circle"
            disabled={currentPage === 0}
            style={{
              position: "fixed",
              center: "20px",
              bottom: "20px",
              zIndex: 1000,
              width: "50px",
              height: "50px",
            }}
          >
            <KeyboardDoubleArrowLeftIcon />
          </button>
          <button
            onClick={handleNextPage}
            className="btn btn-primary rounded-circle"
            disabled={currentPage === measureTiles.length - 1}
            style={{
              position: "fixed",
              right: "20px",
              bottom: "20px",
              zIndex: 1000,
              width: "50px",
              height: "50px",
            }}
          >
            <KeyboardDoubleArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
