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
      const sortedActivities = res.data.map(activity => ({
        ...activity,
        headcategories: activity.headcategories.sort((a, b) => a.id - b.id)
      }));
      setActivities(sortedActivities);

      // Initialize quantities array with default values
      const initialQuantities = sortedActivities.map(activity =>
        activity.headcategories.map(headCategory =>
          headCategory.data_scopes.map(data_scope => data_scope.quantity)
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

  const handleQuantityChange = (e, dataIndex, headIndex, activityIndex) => {
    const newQuantities = [...quantities];
    // Update the quantity value
    newQuantities[activityIndex][headIndex][dataIndex] = e.target.value;
    // Set the new quantities state
    setQuantities(newQuantities);
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
                        {headCategory.data_scopes.map((data_scope, dataIndex) => {
                          // ตรวจสอบว่าเป็นแถวแรกของรายการหรือไม่
                          const isFirstRow =
                            dataIndex === 0 ||
                            headCategory.data_scopes[dataIndex - 1].name !==
                              data_scope.name;
                          // Calculate total quantity per year
                          const totalYearQuantity = headCategory.data_scopes
                            .filter((item) => item.name === data_scope.name)
                            .reduce((total, item) => total + parseFloat(item.quantity), 0);
                          return (
                            <React.Fragment key={dataIndex}>
                              {isFirstRow && (
                                <tr className="text-center">
                                  <td>{data_scope.name}</td>
                                  <td>{data_scope.lci}</td>
                                  {Thmonths.map((Thmonth) => {
                                    const quantityData = headCategory.data_scopes.find(
                                      (item) =>
                                        item.month === Thmonth.id &&
                                        item.name === data_scope.name
                                    );
                                    return (
                                      <td key={Thmonth.id}>
                                        <input
                                          type="number"
                                          style={{
                                            borderRadius: "10px",
                                            border: "1px solid gray",
                                            width: "90px",
                                            padding: "5px",
                                          }}
                                          value={quantityData ? quantityData.quantity : ""}
                                          onFocus={(e) => {
                                            e.target.style.backgroundColor = "#78BB29";
                                          }}
                                          onChange={(e) => handleQuantityChange(e, dataIndex, headIndex, activityIndex)}
                                        />
                                      </td>
                                    );
                                  })}
                                  <td>{totalYearQuantity}</td>
                                  {activity.name === 'scope1' 
                                 
                                  ?
                                  <td>{(parseFloat(totalYearQuantity * data_scope.EF)/ 1000).toFixed(2)}</td>
                                  :
                                  <td>{(parseFloat(totalYearQuantity * data_scope.kgCO2e)/ 1000).toFixed(2)}</td>
                                  }
                                  

                                  
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
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

<table>
  <thead>
    <tr>
      <th colSpan={2}>รายงานการปล่อยและดูดกลับก๊าซเรือนกระจกขององค์กร </th>
      <th>TCFO_R_02
Version 03: 24/4/2019</th>
    </tr>
    <tr>
      <th>องค์กร</th>
      <th>ปป</th>
      <th>หน้าที่</th>
    </tr>
    <tr>
      <th>หน่วยงานทดสอบ</th>
      <th>ป</th>
      <th></th>
    </tr>
  </thead>
</table>