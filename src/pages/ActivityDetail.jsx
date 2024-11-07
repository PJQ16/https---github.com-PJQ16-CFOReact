import React, { useContext } from "react";
import Tab from "../components/Tab";
import TabActivityInfo from "./Tab/TabActivityInfo";
import TabActivityLocation from "./Tab/TabActivityLocation";
import TabActivityOrganization from "./Tab/TabActivityOrganization";
import TabActivity from "./Tab/TabActivity";
import TabActivitySummary from "./Tab/TabActivitySummary";
import TabActivityReport from "./Tab/TabActivityReport";
import { useParams } from "react-router-dom";
import { UserContext } from '../components/MyContext';
import NewNavbar from "../components/NewNavbar";
import Aside from "../components/Aside";
import NewFooter from "../components/NewFooter";

function ActivityDetail() {
  const { id, fac_id,years } = useParams();
  const { userData } = useContext(UserContext);
  return (

    <div className='app'>
<div id="app">
    <div className="main-wrapper" >
   <NewNavbar/>
   <Aside/>
   <div className="app-content">
      <div className="row">
      <div className="col-12">
         <div className="card">
           <div className="card-header">
              <h4>ข้อมูล LandScape หน่วยงาน {userData.facultyName} ปี {years}</h4>
            </div>
          <Tab>
            <div label="ข้อมูลทั่วไป" className=" border-top">
               <TabActivityInfo /> 
            </div>
            <div label="แผนภาพองค์กร" className=" border-top">
              <TabActivityLocation /> 
            </div>
            <div label="โครงสร้างองค์กร" className=" border-top">
               <TabActivityOrganization /> 
            </div>
            <div label="กิจกรรมแหล่งปล่อย" className=" border-top">
               <TabActivity /> 
            </div>
            <div label="สรุปผลการคำนวณ" className=" border-top">
                <TabActivitySummary /> 
            </div>
            <div label="รายงาน" className=" border-top">
              <TabActivityReport /> 
            </div>
          </Tab>
          </div>
        </div>
        </div>
        </div>

   <NewFooter/>
   </div>
   </div>

    </div>
  );
}

export default ActivityDetail;
