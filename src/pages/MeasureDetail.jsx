import React, { useContext, useEffect, useState } from "react";
import Tab from "../components/Tab";
import { useLocation, useParams } from "react-router-dom";
import { UserContext } from '../components/MyContext';
import NewNavbar from "../components/NewNavbar";
import Aside from "../components/Aside";
import NewFooter from "../components/NewFooter";
import TabHK from "./Tab/TabHK";
import axios from "axios";
import config from "../config";

function MeasureDetail() {
  const { id, fac_id, years } = useParams();
  const { userData } = useContext(UserContext);
  const [measureHeads, setMeasureHeads] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const num = queryParams.get("num");

  const fetchMeasureHead = async () => {
    try {
      const res = await axios.get(config.urlApi + '/measure');
      setMeasureHeads(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchMeasureHead();
  }, []);

  // กรองเฉพาะ measureHead ที่มี id ตรงกับ num
  const filteredMeasureHeads = measureHeads.filter(measureHead => parseInt(measureHead.id) === parseInt(num));

  return (
    <div className="app">
      <div id="app">
        <div className="main-wrapper">
          <NewNavbar />
          <Aside />
          <div className="app-content">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4>กรอกข้อมูลมาตรการ หน่วยงาน {userData.facultyName} ปี {years}</h4>
                  </div>

                  {/* แสดง Tab ถ้าพบข้อมูล */}
                  {filteredMeasureHeads.length > 0 ? (
                    <Tab>
                      {filteredMeasureHeads.map((measureHead) =>
                        measureHead.categorymeasures.map((categorymeasure) => (
                          <div key={categorymeasure.id} label={`${categorymeasure.cate_name}`} className="border-top">
                            <TabHK measureTitle={`${categorymeasure.id}`} />
                          </div>
                        ))
                      )}
                    </Tab>
                  ) : ( 
                    // แสดงข้อความถ้าไม่พบข้อมูล
                    <div className="text-center p-3">
                      <p>ไม่พบข้อมูลมาตรการที่เกี่ยวข้อง</p>
                    </div>
                  )}

                </div>
              </div>
            </div>
            <NewFooter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeasureDetail;
