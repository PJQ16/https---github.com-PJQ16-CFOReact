import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../config";
import { UserContext } from "../components/MyContext";
import ForestIcon from "@mui/icons-material/Forest";
import SearchIcon from "@mui/icons-material/Search";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import NewNavbar from "../components/NewNavbar";
import Aside from "../components/Aside";
import NewFooter from "../components/NewFooter";
import MoodIcon from "@mui/icons-material/Mood";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
export default function Measure() {
  const { userData } = useContext(UserContext);
  const [dataPeriods, setDataPeriods] = useState([]);
  const [searchYear, setSearchYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  //ดึงurlparam มาใช้งาน
  const location = useLocation();
  const quertParams = new URLSearchParams(location.search);
  const name = quertParams.get("name");
  const num = quertParams.get("num");

  const itemsPerPage = 12;

  useEffect(() => {
    fetchDataPeriod();
  }, []);

  const fetchDataPeriod = async () => {
    try {
      const res = await axios.get(
        `${config.urlApi}/activity/showPeriod/${userData.facultyID}`
      );
      setDataPeriods(res.data);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: e.message,
      });
    }
  };

  const handleSearchChange = (selectedOption) => {
    setSearchYear(selectedOption ? selectedOption.value : "");
  };

  const handleClickPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredData = dataPeriods.filter((item) => {
    if (!searchYear) return true;
    return item.years + 543 === parseInt(searchYear);
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Create options for years from dataPeriods
  const yearOptions = dataPeriods.map((item) => ({
    value: item.years + 543,
    label: item.years + 543,
  }));

  return (
    <div className="app">
      <div id="app">
        <div className="main-wrapper">
          <NewNavbar />
          <Aside />
          <div className="app-content">
            <section className="section">
              <h1>{name}</h1>
              <div className="d-flex justify-content-center">
                <div className="col-12">
                  <div className="card text-center border-0">
                    <div className="card-header border-0">
                      <h4>เกณฑ์การให้คะแนน</h4>
                    </div>
                    <div className="card-body">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>สถานะ Icon</th>
                            <th>คำอธิบาย</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {" "}
                              <MoodIcon
                                className="d-block w-100"
                                sx={{
                                  fontSize: "50px",
                                  backgroundColor: "#a6a0e8",
                                }}
                              />
                            </td>
                            <td className="text-start">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Nesciunt porro cum sequi quia, quod
                              quibusdam, eveniet aliquid placeat enim veritatis
                              aspernatur! Odio libero sequi fuga rem, id velit
                              mollitia molestias?
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {" "}
                              <SentimentNeutralIcon
                                className="d-block w-100"
                                sx={{
                                  fontSize: "50px",
                                  backgroundColor: "#7a70e7",
                                }}
                              />
                            </td>
                            <td className="text-start">
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Impedit sit placeat veritatis!
                              Earum, ea incidunt quibusdam corporis voluptates
                              omnis enim eius. Aliquam eveniet earum perferendis
                              vel neque delectus molestias. Blanditiis.
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {" "}
                              <SentimentVeryDissatisfiedIcon
                                className="d-block w-100"
                                sx={{
                                  fontSize: "50px",
                                  backgroundColor: "#574ae7",
                                }}
                              />
                            </td>
                            <td className="text-start">
                              Lorem ipsum, dolor sit amet consectetur
                              adipisicing elit. Doloribus, alias delectus, vel
                              harum aliquam, dicta doloremque sit tempora aut
                              dolores magni iusto modi architecto minima
                              officiis voluptates. Tempore, hic praesentium.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <p>
                <SearchIcon style={{ color: "#f0ebf6" }} />
                <Select
                  options={yearOptions}
                  onChange={handleSearchChange}
                  isClearable
                  placeholder={`ค้นหาปี..`}
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "20px",
                      border: "5px solid #f0ebf6",
                      paddingLeft: "20px",
                      marginTop: "2px",
                      color: "black",
                      width: "200px",
                    }),
                  }}
                />
              </p>

              <div className="row">
                {currentItems.map((item) => (
                  <div className="col-12 col-sm-6 col-lg-3" key={item.id}>
                    <div className="card card-secondary">
                      <div className="card-header">
                        <div className="carousel-item active alert-success text-dark">
                          <MoodIcon
                            className="d-block w-100"
                            sx={{
                              fontSize: "300px",
                              backgroundColor: "#a6a0e8",
                            }}
                          />
                          <div className="carousel-caption d-none d-md-block ">
                            <h3>ดีมาก</h3>
                            <p>
                              การทำมาตรการ ของหน่วยงาน {userData.facultyName}
                              คุณอยู่ในเกณฑ์ที่ ดีมาก
                            </p>
                          </div>
                        </div>
                        {/* {item.logo === '' ? (
                                                    <img 
                                                        src='https://media.istockphoto.com/id/1248723171/vector/camera-photo-upload-icon-on-isolated-white-background-eps-10-vector.jpg?s=612x612&w=0&k=20&c=e-OBJ2jbB-W_vfEwNCip4PW4DqhHGXYMtC3K_mzOac0=' 
                                                        className="card-img-top" 
                                                        alt="..." 
                                                    />
                                                ) : (
                                                    <img 
                                                        src={`${config.urlApi}/logos/${userData.logo}`} 
                                                        className="img2" 
                                                        alt="" 
                                                    />
                                                )} */}
                      </div>
                      <div className="card-body text-secondary">
                        <h4 className="bl_font">มาตรการ {item.years + 543}</h4>
                        <span className="bl_font">
                          มาตรการการอนุรักษ์พลังงาน
                          การบำรุงรักษา/การใช้งานอย่างมีประสิทธิภาพ,
                          มาตรการการอนุรักษ์พลังงาน
                          การบำรุงรักษา/การใช้งานอย่างมีประสิทธิภาพ,
                          มาตรการการอนุรักษ์พลังงาน การปรับปรุงกระบวนการ
                          ของวิทยาเขต {userData.campusName} หน่วยงาน{" "}
                          {userData.facultyName}
                        </span>
                      </div>
                      <div className="card-footer">
                        <Link
                          to={`/measureDetail/${item.campus_id}/${
                            item.fac_id
                          }/${item.years + 543}/${item.id}?num=${num}`}
                          className="btn text-white"
                        >
                          <button
                            type="button"
                            className="btn btn-primary btn-rounded w-md waves-effect m-b-5"
                          >
                            <i
                              className="fa fa-sign-out"
                              data-toggle="tooltip"
                              title=""
                              data-original-title="fa-sign-out"
                            ></i>
                            ลงข้อมูล
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <nav>
              <ul className="pagination justify-content-end">
                {[...Array(totalPages)].map((_, i) => (
                  <li
                    key={i + 1}
                    className={`page-item ${
                      i + 1 === currentPage ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handleClickPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <NewFooter />
        </div>
      </div>
    </div>
  );
}
