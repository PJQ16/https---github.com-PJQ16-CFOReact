import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { useParams } from "react-router-dom";
import Accordion from "../../components/Accordion";

function TabActivity() {
  const [activities, setActivities] = useState([]);
  const [quantities, setQuantities] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchDataApi();
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
  };
  const handlerSaveData = async (
    event,
    quantityDataId,
    quantityDataQuantity
  ) => {
    try {
      event.preventDefault();
      if (quantityDataQuantity === "" || quantityDataQuantity === null || isNaN(quantityDataQuantity)) {
        Swal.fire({
          icon: "warning",
          title: "เตือน!!",
          text: "กรุณากรอกปริมาณ หรือ เท่ากับ 0",
        });
        return; // หยุดการทำงานของฟังก์ชันทันทีหากไม่มีค่า quantityDataQuantity
      }
        const payload = {
          id: quantityDataId, // ใช้ค่า quantityDataId ใน payload
          quantity: quantityDataQuantity, // เพิ่ม quantityDataQuantity เข้าไปใน payload
        };
        await axios.put(config.urlApi + '/scope/updateQuantity',payload)
        fetchDataApi();
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: e.message,
      });
    }
  };
  
  return (
    <div>
      {activities.length === 0 ? (
        <p>Loading...</p>
      ) : (
        activities.map((activity, activityIndex) => (
          <div key={activityIndex}>
            <p>{activity.name}</p>
            <div className="accordion" id={`accordion${activity.name}`}>
              {activity.headcategories.map((headCategory, headIndex) => (
                <Accordion
                  key={headCategory.id}
                  id={`collapse${headCategory.id}`}
                  title={headCategory.head_name}
                  expanded={headCategory.id === 0}
                >
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
                                  total + parseFloat(item.quantity),
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
                                        </td>
                                      );
                                    })}
                                    <td>{parseFloat(totalYearQuantity).toFixed(2)}</td>
                                    {activity.name === "scope1" ? (
                                      <td>
                                        {(
                                          parseFloat(
                                            totalYearQuantity * data_scope.EF
                                          ) / 1000
                                        ).toFixed(2)}
                                      </td>
                                    ) : (
                                      <td>
                                        {(
                                          parseFloat(
                                            totalYearQuantity *
                                              data_scope.kgCO2e
                                          ) / 1000
                                        ).toFixed(2)}
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
    </div>
  );
}

export default TabActivity;
