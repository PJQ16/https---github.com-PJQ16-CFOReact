import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";
import Content from "../components/Content";
import Tab from "../components/Tab";
import TabContent1 from "./Tab/TabContent1";
import TabContent2 from "./Tab/TabContent2";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Layout>
        <Sidebar />
        <Content>
          <Tab>
            <div label="สำหรับการปล่อยก๊าซเรือนกระจก">
                <TabContent1/>
            </div>
            <div label="สำหรับการกรอกข้อมูล">
                <TabContent2/>
            </div>
          </Tab>
        </Content>
      </Layout>
      <Footer />
    </div>
  );
}
