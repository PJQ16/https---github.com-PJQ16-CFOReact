import React, { useState } from "react";
import Content from "../components/Content";
import Tab from "../components/Tab";
import TabContent1 from "./Tab/TabContent1";
import TabContent2 from "./Tab/TabContent2";
import NewNavbar from "../components/NewNavbar";
import Aside from "../components/Aside";
import NewFooter from "../components/NewFooter";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState(null);

  const Headcard = [
    {
       id: 1,
       img: 'img/img01.jpg',
       title: 'คาร์บอนฟุตพริ้นท์ขององค์กร (Carbon Footprint for Organization: CFO)',
       detail: 'คาร์บอนฟุตพริ้นท์ขององค์กร คือ ปริมาณก๊าซเรือนกระจกที่ปล่อยออกมาจากกิจกรรมต่างๆ ขององค์กร เช่น การเผาไหม้ของเชื้อเพลิง การใช้ไฟฟ้า การจัดการของเสีย และการขนส่ง วัดออกมาในรูปตันคาร์บอนไดออกไซด์เทียบเท่า โดยพิจารณาจาก 3 ส่วนหลัก แบ่งเป็น SCOPE ดังนี้',
       moreinfo: [
         'SCOPE 1: การคำนวณคาร์บอนฟุตพริ้นท์ทางตรง (Direct GHG Emissions) จากกิจกรรมต่างๆ ขององค์กรโดยตรง เช่น การเผาไหม้ของเครื่องจักร การใช้พาหนะขององค์กร (ที่องค์กรเป็นเจ้าของเอง) การใช้สารเคมีในการบำบัดน้ำเสีย การรั่วซึม/รั่วไหล จากกระบวนการหรือกิจกรรม เป็นต้น',
         'SCOPE 2: การคำนวณคาร์บอนฟุตพริ้นท์ทางอ้อมจากการใช้พลังงาน (Energy Indirect GHG Emissions) ได้แก่ การซื้อพลังงานมาใช้ในองค์กร ได้แก่ พลังงานไฟฟ้า พลังงานความร้อน พลังงานไอน้ำ เป็นต้น',
         'SCOPE 3: การคำนวณคาร์บอนฟุตพริ้นท์ทางอ้อมด้านอื่น ๆ (Other indirect GHG emissions) การเดินทางของพนักงานด้วยพาหนะที่ไม่ใช่ขององค์กร การเดินทางไปสัมมนานอกสถานที่ การใช้วัสดุอุปกรณ์ต่างๆ เป็นต้น'
       ],
        reference:'ที่มา: องค์การบริหารจัดการก๊าซเรือนกระจก (องค์การมหาชน) (TGO)'
    },
    {
        id: 2,
        img: 'img/img02.jpg',
       title: 'ก๊าซเรือนกระจก(Greenhouse Gas: GHG) ',
       detail: 'ก๊าซเรือนกระจก คือ สารประกอบในรูปของก๊าซในบรรยากาศ ทั้งที่มีอยู่ในธรรมชาติและสร้างขึ้นโดยมนุษย์ซึ่งสามารถดูดซับและปล่อยรังสีที่ความยาวคลื่นอยู่ในช่วงความถี่ของรังสีอินฟาเรดที่ถูกปล่อยออกมาจากพื้นผิวโลกชั้นบรรยากาศ ซึ่งตามขอบเขตของ CFO พิจารณา ก๊าซเรือนกระจกจำนวน 7 ชนิด ได้แก่  ก๊าซคาร์บอนไดออกไซด์ (CO2) ก๊าซมีเทน (CH4) ก๊าซไนตรัสออกไซด์ (N2O) ก๊าซไฮโดรฟลูออโรคาร์บอน (HFCs) ก๊าซเพอร์ฟลูออโรคาร์บอน (PFCs) ก๊าซซัลเฟอร์เฮกซะฟลูออไรด์ (SF6) และก๊าซไนโตรเจนไตรฟลูออไรด์ (NF3)',
       moreinfo: [
         'ก๊าซคาร์บอนไดออกไซด์ (CO2) ก๊าซคาร์บอนไดออกไซด์ (CO2) เรียกสั้นๆ ว่า “ก๊าซคาร์บอน” เป็นก๊าซที่เกิดได้ทั้งธรรมชาติและการกระทำของมนุษย์ เช่นการเผาไหม้ ไอเสียจากรถยนต์ การใช้สารดับเพลิงในถังดับเพลิง เป็นก๊าซที่ถูกนำมาใช้เป็นตัวเปรียบเทียบกับ ปริมาณความเป็นอันตรายต่อการเกิดสภาวะโลกร้อนของก๊าซชนิดอื่นๆ มีอายุสะสมเฉลี่ยในชั้นบรรยากาศ 200-450 ปี',
         'ก๊าซมีเทน (CH4) เป็นก๊าซที่เกิดขึ้นจากของเน่าเสีย ซึ่งเกิดได้ทั้งธรรมชาติและกิจกรรมของมนุษย์ เช่น นาข้าว ฟาร์มปศุสัตว์ หลุมฝังกลบขยะ ระบบบำบัดน้ำเสีย ก๊าซนี้นำมาใช้เป็นก๊าซเชื้อเพลิงให้ความร้อนได้ สร้างผลกระทบทำให้เกิดสภาวะเรือนกระจกได้มากกว่า ก๊าซคาร์บอนฯ ได้ถึงประมาณ 25 เท่า มีอายุสะสมเฉลี่ยในชั้นบรรยากาศประมาณ 12 ปี',
         'ก๊าซไนตรัสออกไซด์ (N2O)มีแหล่งกำเนิดจาก 2 แหล่ง คือ จากธรรมชาติ เช่น การระบายก๊าซไนตรัสออกไซด์ออกจากทะเลมหาสมุทร จากแบคทีเรียในดิน การระเบิดของภูเขาไฟ การใช้ปุ๋ยเคมี ส่วนผสมบางอย่างในไอเสียของรถยนต์ และอุตสาหกรรมที่ใช้กรดไนตริกในกระบวนการผลิต สามารถสร้างผลกระทบทำให้เกิดสภาวะเรือนกระจกได้มากกว่า ก๊าซคาร์บอนฯ ได้มากถึงประมาณ 298 เท่า มีอายุสะสมเฉลี่ยในชั้นบรรยากาศประมาณ 114 ปี',
         'ก๊าซไฮโดรฟลูออโรคาร์บอน (HFCs) เป็นก๊าซเรือนกระจกที่มนุษย์สังเคราะห์ขึ้น ใช้ในระบบทำความเย็นต่าง ๆ และเป็นสารที่ถูกนำมาใช้แทนก๊าซคลอโรฟลูออโรคาร์บอน (CFCs) ซึ่งเป็นสารที่ใช้อยู่ในเครื่องปรับอากาศ ตู้เย็น สเปรย์ และน้ำยาดับเพลิง มีศักยภาพในการกักเก็บความร้อนที่สูงมาก และทำให้เกิดภาวะเรือนกระจกได้มากกว่าก๊าซคาร์บอนไดออกไซด์ ประมาณ 124 ถึง 14,800 เท่า มีอายุสะสมเฉลี่ยในชั้นบรรยากาศ 2-19 ปี',
         'ก๊าซเพอร์ฟลูออโรคาร์บอน (PFCs)เป็นก๊าซเรือนกระจกที่มนุษย์สังเคราะห์ขึ้น มาจากภาคอุตสาหกรรมเป็นหลัก โดยถูกใช้เป็นตัวทำละลายและสารตั้งต้นในการผลิต รวมถึงผลผลิตพลอยได้จากกระบวนการต่าง ๆ จากภาคอุตสาหกรรม เช่น การถลุงอะลูมิเนียม การผลิตสารกึ่งตัวนำ มีศักยภาพในการกักเก็บความร้อนที่สูงมาก และทำให้เกิดสภาวะเรือนกระจกได้มากกว่าก๊าซคาร์บอนไดออกไซด์ ประมาณ 7,390 ถึง 12,200 เท่า มีอายุสะสมเฉลี่ยในชั้นบรรยากาศมากกว่า 1,000 ปี',
         'ก๊าซซัลเฟอร์เฮกซะฟลูออไรด์ (SF6) เป็นก๊าซที่มีอยู่ในตู้ควบคุมไฟฟ้า นำมาใช้เพื่อเป็นฉนวนไฟฟ้าป้องกันการเกิดประกายไฟจากอุปกรณ์สวิทช์ไฟฟ้าแรงสูง หรือช่วยในการระบายความร้อนจากอุปกรณ์ไฟฟ้าแรงสูง ยางรถยนต์ และในอุตสาหกรรมแมกนีเซียม สร้างผลกระทบได้มากกว่าก๊าซคาร์บอนฯ ถึง 22,800 เท่า มีอายุสะสมเฉลี่ยในชั้นบรรยากาศประมาณ 3,200 ปี',
         'ก๊าซไนโตรเจนไตรฟลูออไรด์ (NF3) เป็นก๊าซที่ไม่ได้เกิดขึ้นเองตามธรรมชาติ ใช้ประกอบในการผลิตอุปกรณ์อิเล็กโทรนิคส์หรือวงจรรวมขนาดเล็กสำหรับคอมพิวเตอร์ สร้างผลกระทบมากกว่าก๊าซคาร์บอน ประมาณ 17,200 เท่า'

       ]
    },
    {
        id: 3,
        img: 'img/img03.jpg',
        title: 'ค่าศักยภาพในการทำให้เกิดภาวะโลกร้อน (GWP)',
        detail: 'ค่าศักยภาพในการทำให้โลกร้อน ประเมินได้จากการวัดหรือคำนวณปริมาณก๊าซเรือนกระจกแต่ละชนิดที่เกิดขึ้นจริง และแปลงค่าให้อยู่ในรูปของก๊าซคาร์บอนไดออกไซด์เทียบเท่า ซึ่งในที่นี้ใช้ค่าศักยภาพในการทำให้โลกร้อนในรอบ 100 ปี ของ IPCC (Intergovernmental panel on climate change) (GWP100) รายงาน The Fifth Assessment Report of the IPCC (AR5)',
        moreinfo: [],
        gridData:(
          <table className="table table-bordered">
            <thead>
              <tr>
                <th colSpan={2}>GWP <sub>100</sub></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ที่มา</td>
                <td>IPCC, AR5</td>
              </tr>
              <tr>
                <td>CO<sub>2</sub></td>
                <td>1</td>
              </tr>
              <tr>
              <td>Fossil CH<sub>4</sub> </td>
              <td>30</td>
              </tr>
              <tr>
                <td>CH <sub>4</sub></td>
                <td>28</td>
              </tr>
              <tr>
                <td>N<sub>2</sub>O</td>
                <td>265</td>
              </tr>
              <tr>
                <td>SF<sub>6</sub></td>
                <td>23,500</td>
              </tr>
              <tr>
                <td>NF<sub>3</sub></td>
                <td>16,100</td>
              </tr>
            </tbody>
          </table>
        ),
        reference:'ที่มา: องค์การบริหารจัดการก๊าซเรือนกระจก (องค์การมหาชน) (TGO)'
    },
    {
        id: 4,
        img: 'img/img04.jpg',
       title: 'การดูดกลับและกักเก็บก๊าซเรือนกระจก',
       detail: 'การดูดกลับก๊าซเรือนกระจกที่อยู่ในชั้นบรรยากาศไปกักเก็บไว้ในแหล่งกักเก็บก๊าซเรือนกระจกทั้งทางชีวภาพ (Biological sinks) และทางวิศวกรรมเคมี (Chemical engineering) เพื่อดูดซับและกักเก็บในระยะยาว',
       moreinfo: [
        'การปลูกต้นไม้', 'การติดตั้งเทคโนโลยีดักจับคาร์บอนเพื่อนำไปใช้ประโยชน์หรือกักเก็บ (Carbon Capture, Utilization and Storage: CCUS)'
       ]
    },
    {
      id: 5,
      img: 'img/img09.jpg',
     title: 'ประโยชน์ของการประเมินคาร์บอนฟุตพริ้นท์องค์กร (CFO)',
     detail: '',
     moreinfo: [
      '1. ช่วยให้องค์กรทราบถึงปริมาณก๊าซเรือนกระจกที่เกิดจากกิจกรรมต่าง ๆ ขององค์กรตนเอง สามารถจำแนกสาเหตุของการปล่อยก๊าซเรือนกระจกที่มีนัยสำคัญ และสามารถระบุและหาวิธีจัดการกิจกรรมที่ส่งผลกระทบต่อสิ่งแวดล้อมได้อย่างเหมาะสม', 
      '2. สามารถนำข้อมูลมาใช้ประกอบการตัดสินใจกำหนดแผน แนวทางการจัดการ และเพิ่มประสิทธิภาพ ในการลดปริมาณการปล่อยก๊าซเรือนกระจก ช่วยลดต้นทุนในด้านพลังงาน ทรัพยากร และทำให้การดำเนินธุรกิจเป็นไปอย่างยั่งยืน',
      '3. ใช้ในการขับเคลื่อนให้เกิดการบริหารจัดการลดการปล่อยก๊าซเรือนกระจกขององค์กร เพื่อประโยชน์ส่วนรวมของมหาวิทยาลัย และระดับประเทศไทย',
      '4. สร้างภาพลักษณ์ให้แก่องค์กรในการมีส่วนร่วมใส่ใจลดโลกร้อน และช่วยส่งเสริมให้มหาวิทยาลัยบรรลุเป้าหมายการเป็น Carbon Naturality และ Net Zero Emissions ในที่สุด'
     ]
    }
  ];

  const HeadDesciption = [
    {
      id: 1,
      img: 'img/img05.jpg',
      title: 'ข้อมูลเชื้อเพลิง',
      detail: 'ให้แยกตามประเภทการเบิกจ่าย',
      moreinfo: [
        'การเบิกจ่ายเป็นรายครั้ง คือ การเบิกจ่ายจากใบเสร็จรับเงิน/ใบสำคัญจ่ายเงิน/เอกสารหลักฐานอื่นๆ ',
        'การเบิกจ่ายแบบ Feet car (โดยให้แยกตามชนิดของเชื้อเพลิงที่ใช้ในเดือนนั้นๆ โดยแยกเป็นข้อมูลปี 2565 และปี 2566)'
      ]
    },
    {
      id: 2,
      img: 'img/img06.jpg',
      title: 'ข้อมูลการใช้สารเคมีจากห้องปฏิบัติการ',
      detail: 'ข้อมูลปริมาณการใช้สารเคมี ที่มีในการทดลอง ทำแลปวิจัย ในห้องปฏิบัติการ โดยจะคิดเฉพาะก๊าซเรือนกระจก 7 ชนิด ได้แก่',
      moreinfo: [
        'ก๊าซคาร์บอนไดออกไซด์ (CO2)',
        'ก๊าซมีเทน (CH4)',
        'ไนตรัสออกไซด์ (N2O)',
        'ไฮโดรฟลูออโรคาร์บอน (HFCs)',
        'เพอร์ฟลูออโรคาร์บอน (PFCs)',
        'ซัลเฟอร์เฮกซะฟลูออไรด์ (SF6)',
        'ไนโตรเจนไตรฟลูออไรด์ (NF3)'
      ]
    },
    {
      id: 3,
      img: 'img/img07.jpg',
      title: 'การใช้สารทำความเย็น',
      detail: 'ข้อมูลปริมาณสารทำความเย็นของอุปกรณ์แต่ละชนิด โดยสามารถหาได้จาก Nameplate ของอุปกรณ์ (ยกเว้นเครื่องปรับอากาศที่มีการใช้สารทำความเย็น R22)',
      moreinfo: [
        'การใช้งานอุปกรณ์ โดยข้อมูลดังกล่าวจะเป็นตัวกำหนดสัดส่วนการรั่วซึมของสารทำความเย็นในแต่อุปกรณ์ซึ่งระบุไว้ในตาราง',
        'ชนิดอุปกรณ์: ระบบปรับอากาศ (Residential and Commercial AC), Air Dryer, Gas Dryer (Stand-alone commercial), ตู้เย็น/ตู้แช่/ตู้กดน้ำ (Domestic Refrigeration)',
        'ชนิดสารทำความเย็นและปริมาณสารทำความเย็น โดยจะระบุใน Nameplate ของอุปกรณ์ ส่วนปริมาณสารทำความเย็น ในการกรอกข้อมูลจะคิดในส่วนของปริมาณการรั่วซึมตามเงื่อนไขที่ระบุไว้'
      ]
    },
    {
      id: 4,
      img: 'img/img08.jpg',
      title: 'การเดินทางไป - กลับของพนักงาน',
      detail: 'ให้ทำการสร้างแบบสอบถามออนไลน์ โดยใช้ข้อมูลในไฟล์ Excel ไฟล์ชื่อ "ข้อมูลสร้างแบบฟอร์มออนไลน์_Employee" ไปสร้างต้นแบบใน Google form หรือ MS Form จากนั้นทำการ Export ข้อมูลออกมาเป็นไฟล์ Excel และทำการกรองข้อมูลปริมาณการใช้เชื้อเพลิงแต่ละชนิด เมื่อได้ผลลัพท์แล้วให้นำข้อมูลปริมาณเชื้อเพลิงที่ได้แยกตามชนิดเชื้อเพลิงมากรอกลงใน sheet "Employee" โดยที่ข้อมูลจะทำการลิ้งค์ไปที่ sheet หลัก',
      moreinfo: []
    }
  ];

  const handleModalOpen = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className='app'>
      <div id="app">
        <div className="main-wrapper">
          <NewNavbar />
          <Aside />
          <div className="app-content">
            <section className="section">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4>คาร์บอนฟุตพริ้นท์ในระดับองค์กร (Carbon Footprint for Organization: CFO)</h4>
                      <span>
                        คือ การประเมินปริมาณการปล่อยและดูดกลับก๊าซเรือนกระจกที่เกิดจากกิจกรรมต่าง ๆ ที่เกี่ยวข้องกับองค์กรในแต่ละปีทั้งทางตรงและทางอ้อม
                      </span>
                    </div>
                    <div className="card-body">
                      <ul className="nav nav-pills pb-3" id="myTab3" role="tablist">
                        <li className="nav-item">
                          <a className="nav-link active" id="home-tab3" data-toggle="tab" href="#tab1" role="tab" aria-controls="home" aria-selected="true">ข้อมูลทั่วไป</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" id="profile-tab3" data-toggle="tab" href="#tab2" role="tab" aria-controls="profile" aria-selected="false">คำอธิบายสำหรับกรอกข้อมูล</a>
                        </li>
                      </ul>
                      <div className="tab-content border-top p-3" id="myTabContent3">
                        <div className="tab-pane fade show active p-0" id="tab1" role="tabpanel" aria-labelledby="home-tab3">
                          <div className="row">
            
                          
                            {Headcard.map((item) => (
                              <div key={item.id} className="col-lg-4 col-md-12 col-12 col-sm-12">
                              		<div className="card card-secondary">
                                  <img src={`${item.img}`} alt=""   class="img2" height={400} />
                                  <div className="card-body text-secondar">
                                  <h6 className="bl_font">{item.title}</h6>
                                  </div>
                                      
                                    <div className="card-footer">
                                      <Link onClick={() => handleModalOpen(item)} className="text-decoration-none text-white" data-toggle="modal" data-target={`#moreInfo`}><button type="button" class="btn btn-primary btn-rounded w-md waves-effect m-b-5"><i class="fa fa-sign-out" data-toggle="tooltip" title="" data-original-title=" fa-sign-out"></i> อ่านเพิ่มเติม</button>  </Link>
                                      </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="tab-pane fade p-0" id="tab2" role="tabpanel" aria-labelledby="profile-tab3">
                        <div className="row">
                        {HeadDesciption.map((item) => (
                              <div key={item.id} className="col-lg-4 col-md-12 col-12 col-sm-12">
                              		<div className="card card-secondary">
                                  <img src={`${item.img}`} alt=""   class="img2" height={400} />
                                  <div className="card-body text-secondar">
                                  <h6 className="bl_font">{item.title}</h6>
                                  </div>
                                      
                                    <div className="card-footer">
                                      <Link onClick={() => handleModalOpen(item)} className="text-decoration-none text-white" data-toggle="modal" data-target={`#moreInfo`}><button type="button" class="btn btn-primary btn-rounded w-md waves-effect m-b-5"><i class="fa fa-sign-out" data-toggle="tooltip" title="" data-original-title=" fa-sign-out"></i> อ่านเพิ่มเติม</button>  </Link>
                                      </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <NewFooter />
        </div>
      </div>
      {selectedItem && (
        <Modal title={selectedItem.title} id='moreInfo'>
          <p>{selectedItem.detail}</p>
          <ul>
            {selectedItem.moreinfo.map((info, index) => (
              <>
                <li className="my-2" key={index}>{info}</li>
                <hr/>
              </>
            ))}
             <p>{selectedItem.gridData}</p>
             <p className="text-danger">{selectedItem.reference}</p>
          </ul>
        </Modal>
      )}
    </div>
  );
}
