import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { useParams } from "react-router-dom";
import Accordion from "../../components/Accordion";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
function TabActivity() {
  const [activities, setActivities] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [sourcesFiles, setSourFiles] = useState("");
  const [exportSourcesFiles, setExportSourcesFiless] = useState([]);
  const [countAvg, setCountAvg] = useState(null);
  const { id } = useParams();
  const [value, setValue] = useState(0);
  useEffect(() => {
    fetchDataApi();
    fetchExportFile();
  }, [id]);
  const fetchDataApi = async () => {
    try {
      const res = await axios.get(config.urlApi + `/scope/datasocpe/${id}`);
      const sortedActivities = res.data.map((activity) => ({
        ...activity,
        headcategories: activity.headcategories.sort((a, b) => a.id - b.id),
      }));

      setActivities(sortedActivities);

      // Initialize quantities array with default values
      const initialQuantities = sortedActivities.map((activity) =>
        activity.headcategories.map((headCategory) =>
          headCategory.data_scopes.map((data_scope) => data_scope.quantity)
        )
      );
      setQuantities(initialQuantities);

      const response = await axios.get(config.urlApi + `/dividData/${id}`);
      setCountAvg(response.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

  const Thmonths = [
    { id: 1, month: "ม.ค" },
    { id: 2, month: "ก.พ" },
    { id: 3, month: "มี.ค" },
    { id: 4, month: "เม.ย" },
    { id: 5, month: "พ.ค" },
    { id: 6, month: "มิ.ย" },
    { id: 7, month: "ก.ค" },
    { id: 8, month: "ส.ค" },
    { id: 9, month: "ก.ย" },
    { id: 10, month: "ต.ค" },
    { id: 11, month: "พ.ย" },
    { id: 12, month: "ธ.ค" },
  ];

  const handleQuantityChange = (
    e,
    dataIndex,
    headIndex,
    activityIndex,
    quantityDataId
  ) => {
    const newQuantities = [...quantities];
    newQuantities[activityIndex][headIndex][dataIndex] = {
      quantity: e.target.value,
    };
    setQuantities(newQuantities);
    const quantityDataQuantity = e.target.value; // อัพเดทค่า quantityDataQuantity ตามค่าที่ใส่ใน input
    handlerSaveData(e, quantityDataId, quantityDataQuantity); // Pass quantityDataId and updated quantityDataQuantity to the handlerSaveData function
    fetchDataApi();
  };
  const handlerSaveData = async (
    event,
    quantityDataId,
    quantityDataQuantity
  ) => {
    try {
      event.preventDefault();
      if (
        quantityDataQuantity === "" ||
        quantityDataQuantity === null ||
        isNaN(quantityDataQuantity)
      ) {
        return; // หยุดการทำงานของฟังก์ชันทันทีหากไม่มีค่า quantityDataQuantity
      }
      const payload = {
        id: quantityDataId, // ใช้ค่า quantityDataId ใน payload
        quantity: quantityDataQuantity, // เพิ่ม quantityDataQuantity เข้าไปใน payload
      };
      await axios.put(config.urlApi + `/scope/updateQuantity/${id}`, payload);
      await fetchDataApi();
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: e.message,
      });
    }
  };

  const handlerImportFile = async (e) => {
    try {
      e.preventDefault();
      if (!sourcesFiles) {
        // ตรวจสอบว่ามีการเลือกไฟล์หรือไม่
        await Swal.fire({
          icon: "warning",
          title: "เตือน!!",
          text: "กรุณาเพิ่มรูปภาพ",
        });
      } else {
        const confirmation = await Swal.fire({
          icon: "info",
          title: "สร้างข้อมูล",
          text: "ต้องการสร้างรายงานใช่หรือไม่",
          showCancelButton: true,
        });
        if (confirmation.isConfirmed) {
          // ถ้าผู้ใช้กดตกลง
          await Swal.fire({
            icon: "success",
            title: "สำเร็จ",
            text: "ระบบทำการสร้างรายงานเรียบร้อยแล้ว",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
          const formData = new FormData();
          formData.append("file_name", sourcesFiles);
          formData.append("activityperiod_id", id);
          const response = await axios.post(
            config.urlApi + `/importSourcesfile`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          fetchExportFile();
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchExportFile = async () => {
    try {
      const response = await axios.get(config.urlApi + `/sourcesfile/${id}`);
      setExportSourcesFiless(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handdlerFuel = async () => {
    try {
      Swal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "ดึงข้อมูลสำเร็จ",
        showConfirmButton: false,
        timer: 800,
        timerProgressBar: true,
      });
      await axios.put(config.urlApi + `/datascope/pullDataFuel/${id}`);
      fetchDataApi();
    } catch (e) {
      console.log(e.message);
    }
  };

  const showDataPdf = (exportSourcesFile) => {
    Swal.fire({
      icon: "question",
      title: "เปิดไฟล์",
      text: "ต้องการเปิดไฟล์ใช่หรือไม่",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        window.open(
          `${config.urlApi}/sourcesfile/${exportSourcesFile}`,
          "_blank",
          "noreferrer"
        );
      }
    });
  };

  const getBadgeClass = (name) => {
    switch (name) {
        case 'scope1':
            return 'badge-primary';
        case 'scope2':
            return 'badge-warning';
        case 'scope3':
            return 'badge-success';
        case 'separate':
            return 'badge-info';
        case 'removal':
            return 'badge-danger';
        default:
            return 'badge-secondary'; // ค่าเริ่มต้นเมื่อไม่ตรงกับเงื่อนไขที่กำหนด
    }
};

  return (
    <div>
      <p className="h3">กิจกรรมการปล่อยก๊าซเรือนกระจก</p>
      {activities.length === 0 ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        activities.map((activity, activityIndex) => (
          <div className="card" key={activityIndex}>
            <div className="card-header">
																<h4><span className={`badge ${getBadgeClass(activity.name)}`}>{activity.name}</span></h4> 
															</div>

            <div className="accordion" id={`accordion${activity.name}`}>
              {activity.headcategories.map((headCategory, headIndex) => (
                <Accordion
                  key={headCategory.id}
                  id={`collapse${headCategory.id}`}
                  title={`${headIndex + 1}.) ${headCategory.head_name}`}
                  expanded={headCategory.id === 0}
                >
                  {headCategory.id === 11 ||
                    headCategory.id === 21 ||
                  headCategory.id === 30 ||
                  headCategory.id === 31 ||
                  headCategory.id === 32 ||
                  headCategory.id === 33 ? (
                    <button
                      className="btn btn-success mb-2"
                      onClick={handdlerFuel}
                    >
                      <CompareArrowsIcon /> ซิงค์ข้อมูล
                    </button>
                  ) : (
                    <></>
                  )}
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead>
                        <tr className="text-center">
                          <th>รายการ</th>
                          <th>หน่วย</th>
                          {Thmonths.map((Thmonth) => (
                            <th key={Thmonth.id}>{Thmonth.month}</th>
                          ))}
                          <th>
                            {" "}
                            ปริมาณ <br /> /<br /> ปี
                          </th>
                          <th>
                            (tCO<sub>2</sub>e)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {headCategory.data_scopes.map(
                          (data_scope, dataIndex) => {
                            // ตรวจสอบว่าเป็นแถวแรกของรายการหรือไม่
                            const isFirstRow =
                              dataIndex === 0 ||
                              headCategory.data_scopes[dataIndex - 1].name !==
                                data_scope.name;
                            // Calculate total quantity per year
                            const totalYearQuantity = headCategory.data_scopes
                              .filter((item) => item.name === data_scope.name)
                              .reduce(
                                (total, item) =>
                                  parseFloat(total) + parseFloat(item.quantity),
                                0
                              );
                            return (
                              <React.Fragment key={dataIndex}>
                                {isFirstRow && (
                                  <tr className="text-center">
                                    <td>{data_scope.name}</td>
                                    <td>{data_scope.lci}</td>
                                    {Thmonths.map((Thmonth) => {
                                      const quantityData =
                                        headCategory.data_scopes.find(
                                          (item) =>
                                            item.month === Thmonth.id &&
                                            item.name === data_scope.name
                                        );
                                      return (
                                        <td key={Thmonth.id}>
                                          {data_scope.head_id === 11 ||
                                          data_scope.head_id === 21 ||
                                          data_scope.head_id === 30 ||
                                          data_scope.head_id === 31 ||
                                          data_scope.head_id === 32 ||
                                          data_scope.head_id === 33 ? (
                                            <form>
                                              <input
                                                type="number"
                                                disabled
                                                style={{
                                                  borderRadius: "10px",
                                                  border: "1px solid gray",
                                                  width: "90px",
                                                  padding: "5px",
                                                }}
                                                key={data_scope.id}
                                                value={quantityData.quantity}
                                              />
                                            </form>
                                          ) : (
                                            <form>
                                              <input
                                                type="number"
                                                style={{
                                                  borderRadius: "10px",
                                                  border: "1px solid gray",
                                                  width: "90px",
                                                  padding: "5px",
                                                }}
                                                key={data_scope.id}
                                                defaultValue={
                                                  quantityData
                                                    ? quantityData.quantity
                                                    : ""
                                                }
                                                onFocus={(e) => {
                                                  e.target.style.backgroundColor =
                                                    "#DBF1C0";
                                                }}
                                                onChange={(e) =>
                                                  handleQuantityChange(
                                                    e,
                                                    dataIndex,
                                                    headIndex,
                                                    activityIndex,
                                                    quantityData.id
                                                  )
                                                } // Pass quantityData.id to the handler
                                              />
                                            </form>
                                          )}
                                        </td>
                                      );
                                    })}
                                    <td>
                                    {
  data_scope.name === "CH4 จากน้ำขังในพื้นที่นา" && countAvg !== null && countAvg !== 0
    ? Number((parseFloat(totalYearQuantity) / countAvg).toFixed(2)).toLocaleString()
    : Number(parseFloat(totalYearQuantity).toFixed(2)).toLocaleString()
}

                                     {/*  {data_scope.name ===
                                        "CH4 จากน้ำขังในพื้นที่นา" &&
                                      countAvg !== null &&
                                      countAvg !== 0
                                        ? parseFloat(totalYearQuantity).toFixed(
                                            2
                                          ) / countAvg
                                        : parseFloat(totalYearQuantity).toFixed(
                                            2
                                          )} */}
                                    </td>
                                    {activity.name === "scope1" ? (
                                      <td>
                                     {/* เงื่อนไขค้น จากชื่อ  เช็คค่า countAvg ไม่เท่ากับ  null และ 0 */}
                                     {data_scope.name ===
                                        "CH4 จากน้ำขังในพื้นที่นา" &&
                                      countAvg !== null &&
                                      countAvg !== 0
                                        ? (
                                              Number(parseFloat(
                                                (totalYearQuantity / countAvg) *
                                                  data_scope.EF
                                              ) / 1000
                                            ).toFixed(2)).toLocaleString()
                                          : (
                                            Number(parseFloat(
                                                totalYearQuantity *
                                                  data_scope.EF
                                              ) / 1000
                                            ).toFixed(2)).toLocaleString()}
                                      </td>
                                    ) : (
                                      <td>
                                        {(
                                           Number(parseFloat(
                                            totalYearQuantity *
                                              data_scope.kgCO2e
                                          ) / 1000
                                        ).toFixed(2)).toLocaleString()}
                                      </td>
                                    )}
                                  </tr>
                                )}
                              </React.Fragment>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </Accordion>
              ))}
            </div>
          </div>
        ))
      )}
      <div className="card shadow text-center">
        <div
          className="card-header text-white"
          style={{
            background:
              " linear-gradient(346deg, rgba(127,113,168,1) 0%, rgba(71,60,152,1) 100%)",
            marginTop: "auto",
          }}
        >
          Uploads ไฟล์เอกสารหลักฐาน ( maximum size: 2 MB )
        </div>
        <div
          className="card-body"
          style={{
            background:
              " linear-gradient(346deg, rgba(127,113,168,1) 0%, rgba(71,60,152,1) 100%)",
            marginTop: "auto",
          }}
        >
          <div className="mb-3">
            {exportSourcesFiles.length === 0 ? (
              <p className="text-center text-white">ไม่มีหลักฐานข้อมูล</p>
            ) : (
              <>
                {exportSourcesFiles.map((exportSourcesFile, index) => (
                  <div key={index}>
                    <button
                      className="btn btn-primary m-3"
                      onClick={() => showDataPdf(exportSourcesFile.file_name)}
                    >
                      <DownloadForOfflineIcon /> หลักฐาน
                    </button>
                    <span className="text-white">
                      {exportSourcesFile.file_name}
                    </span>
                    <hr className="text-white" />
                  </div>
                ))}
              </>
            )}
            <br />

            <div className="input-group">
              <input
                type="file"
                className="form-control"
                onChange={(e) => setSourFiles(e.target.files[0])}
                id="inputGroupFile04"
                aria-describedby="inputGroupFileAddon04"
                accept="application/pdf"
                aria-label="Upload"
              />
              {sourcesFiles === "" ? (
                <button
                  className="btn btn-secondary"
                  type="button"
                  disabled
                  id="inputGroupFileAddon04"
                  onClick={handlerImportFile}
                >
                  เพิ่มหลักฐาน
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  type="button"
                  id="inputGroupFileAddon04"
                  onClick={handlerImportFile}
                >
                  เพิ่มหลักฐาน
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabActivity;
