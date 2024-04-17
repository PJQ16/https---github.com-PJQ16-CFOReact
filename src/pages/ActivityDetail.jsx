import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Tab from "../components/Tab";
import TabActivityInfo from "./Tab/TabActivityInfo";
import TabActivityLocation from "./Tab/TabActivityLocation";
import TabActivityOrganization from "./Tab/TabActivityOrganization";
import TabActivity from "./Tab/TabActivity";
import TabActivitySummary from "./Tab/TabActivitySummary";
import TabActivityReport from "./Tab/TabActivityReport";
import config from "../config";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { UserContext } from '../components/MyContext';

function ActivityDetail() {
  
   const {id,fac_id} = useParams();
   const {userData} = useContext(UserContext);

   

  return (
    <div>
      <Navbar />
      <Layout>
       <div className="p-5">
          <Tab>
            <div label="ข้อมูลทั่วไป">
           <TabActivityInfo/>
            </div>
            <div label="แผนภาพองค์กร">
            <TabActivityLocation/>
            </div>
            <div label="โครงสร้างองค์กร">
            <TabActivityOrganization/>
            </div>
            <div label="กิจกรรมการปล่อยก๊าซเรือนกระจก" >
            <TabActivity />
            </div>
            <div label="สรุปผลการคำนวณ">
            <TabActivitySummary/>
            </div>
            <div label="รายงาน">
            <TabActivityReport/>
            </div>
          </Tab>
          </div>
      </Layout>
      <Footer />
    </div>
  );
}

export default ActivityDetail;
