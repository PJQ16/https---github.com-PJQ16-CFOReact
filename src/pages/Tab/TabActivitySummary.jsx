import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../config";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from '@mui/x-charts';

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
  marginLeft: 10,
  whiteSpace: "pre-wrap",
}));

const StyledPieChart = styled(PieChart)(({ theme }) => ({
  width: "100%",
  height: "auto",
  [theme.breakpoints.up("sm")]: {
    width: "50%",
  },
  [theme.breakpoints.up("md")]: {
    width: "40%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "30%",
  },
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function TabActivitySummary() {
  const { years, id,fac_id } = useParams();
  const [scopeData, setScopeData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    fetchDataScope();
  }, []);

  const fetchDataScope = async () => {
    try {
      const res = await axios.get(
        config.urlApi + `/datascope/summary/${years - 543}/${id}`
      );
      setScopeData(res.data);

      const total = res.data.reduce(
        (acc, item) => acc + parseFloat(item.tco2e),
        0
      );
      setTotalValue(total);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: err.message,
      });
    }
  };

  const filteredScopes = scopeData.filter(
    (item) =>
      item.name === "scope1" || item.name === "scope2" || item.name === "scope3"
  );

  const totalFilteredValue = filteredScopes.reduce(
    (acc, item) => acc + parseFloat(item.tco2e),
    0
  );

  const percentages = filteredScopes.map((item) => ({
    label: item.name,
    percentage: ((parseFloat(item.tco2e) / totalFilteredValue) * 100).toFixed(
      2
    ),
  }));

  const filteredScopes2 = scopeData.filter(
    (item) => item.name === "scope1" || item.name === "scope2"
  );

  const totalFilteredValue2 = filteredScopes2.reduce(
    (acc, item) => acc + parseFloat(item.tco2e),
    0
  );
  const percentages2 = filteredScopes2.map((item) => ({
    label: item.name,
    percentage: ((parseFloat(item.tco2e) / totalFilteredValue2) * 100).toFixed(
      2
    ),
  }));

  const colorCharts = [
    "#C89AF2", "#EFCEE5", "#FBEDD4", "#D7F3EA", "#B6E5E1",
  ];

  
  const data = scopeData.map((item, index) => ({
    years: item.years,
    tco2e: item.tco2e,
    name: item.name,
    colors:colorCharts[index+1]
  }));

  const tco2eValues = data.map(item => parseFloat(item.tco2e).toFixed(2));
  const labels = data.map(item => item.name);
  
  useEffect(() => {
    fetchDataInfo();
  }, []);

  const fetchDataInfo = async () => {
    try {
      const res = await axios.get(config.urlApi + `/activity/showPeriod/${fac_id}/${years - 543}`);
      setInfos(res.data);
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: e.message
      });
    }
  };

  return (
    <div>
       <p className="h2 ms-3">สรุปผลการคำนวณ</p>
       {scopeData.length  > 0 ? ( 
      <div className="row">
       
            <div className="col-md-6 p-3">
              <div className="">
                <div className="card-body">
                  
                <BarChart
                width={500}
                height={400}
                series={[
                  {
                    data: tco2eValues,
                    label: 'tCO2e',
                    id: 'tco2eId',
                    color: '#C89AF2' // This might be overridden by slotProps
                  }
                ]}
                xAxis={[{ data: labels, scaleType: 'band' }]}
              />
                  
                  
                
                </div>
              </div>
            </div>
            
            <div className="col-md-6 p-3">
            <div className="card-body">
            <div className="table-responsive">
            <table className="table table-striped ">
                    <thead>
                      <tr className="text-center">
                        <th className="text-white" style={{backgroundColor:'#473c98'}}>ขอบเขต</th>
                        <th className="text-white" style={{backgroundColor:'#473c98'}}>Organization Greenhouse Gas Emissions</th>
                        <th className="text-white" style={{backgroundColor:'#473c98'}}>Ratio Scope 1 and 2</th>
                        <th className="text-white" style={{backgroundColor:'#473c98'}}>Ratio Scope 1 and 2 3</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scopeData.map((item, index) => (
                        <tr className="text-center" key={index}>
                          <td>{item.name}</td>
                          <td>{parseFloat(item.tco2e).toFixed(2)}</td>
                          <td>
                            {(isNaN(
                              percentages2.find((p) => p.label === item.name)
                                ?.percentage
                            )
                              ? "0.00"
                              : percentages2.find((p) => p.label === item.name)
                                  ?.percentage) || "0.00"}
                          </td>
                          <td>
                            {(isNaN(
                              percentages.find((p) => p.label === item.name)
                                ?.percentage
                            )
                              ? "0.00"
                              : percentages.find((p) => p.label === item.name)
                                  ?.percentage) || "0.00"}
                          </td>
                        </tr>
                      ))}
                      <tr className="text-center">
                        <td>ผลรวม Scope 1 & 2</td>
                        <td>
                          {scopeData
                            .reduce((acc, item) => {
                              if (
                                item.name === "scope1" ||
                                item.name === "scope2"
                              ) {
                                return acc + parseFloat(item.tco2e);
                              }
                              return acc;
                            }, 0)
                            .toFixed(2)}
                        </td>
                        <td>100</td>
                        <td>-</td>
                      </tr>
                      <tr className="text-center">
                        <td>ผลรวม Scope 1 & 2 & 3</td>
                        <td>
                          {scopeData
                            .reduce((acc, item) => {
                              if (
                                item.name === "scope1" ||
                                item.name === "scope2" ||
                                item.name === "scope3"
                              ) {
                                return acc + parseFloat(item.tco2e);
                              }
                              return acc;
                            }, 0)
                            .toFixed(2)}
                        </td>
                        <td>-</td>
                        <td>100</td>
                      </tr>
                     
                    </tbody>
                  </table>

                  <div className="table-responsive">
                   <table className="table table-bordered">
                   <tr className="alert-success">
                        <td>Carbon intensity <br/>(Scope 1 + Scope 2)</td>
                        <td>
                        {infos.length > 0 && infos[0].employee_amount > 0 
                          ? (scopeData.reduce((acc, item) => {
                              if (item.name === "scope1" || item.name === "scope2") {
                                return acc + parseFloat(item.tco2e);
                              }
                              return acc;
                            }, 0) / parseFloat(infos[0].building_area)).toFixed(2)
                          : "N/A"}
                      </td>
                        <td>TonCO2eq/m<sup>2</sup></td>
                        <td>
                          {infos.length > 0 && infos[0].employee_amount > 0 
                            ? (scopeData.reduce((acc, item) => {
                                if (item.name === "scope1" || item.name === "scope2") {
                                  return acc + parseFloat(item.tco2e);
                                }
                                return acc;
                             
                            }, 0) / parseFloat(infos[0].employee_amount)).toFixed(2)
                            : "N/A"}
                        </td>

                        <td>TonCO2eq/People</td>
                      </tr>
                      <tr className="alert-success">
                      <td>Carbon intensity <br/> (Scope 1 + Scope 2 + Scope 3)</td>
                        <td>{infos.length > 0 && infos[0].employee_amount > 0
                        ?(scopeData.reduce((acc, item) => {
                              if (
                                item.name === "scope1" ||
                                item.name === "scope2" ||
                                item.name === "scope3"
                              ) {
                                return acc + parseFloat(item.tco2e);
                              }
                              return acc;
                            }, 0) / parseFloat(infos[0].building_area)).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>TonCO2eq/m<sup>2</sup></td>
                        <td>{infos.length > 0 && infos[0].employee_amount > 0
                        ?(scopeData.reduce((acc, item) => {
                              if (
                                item.name === "scope1" ||
                                item.name === "scope2" ||
                                item.name === "scope3"
                              ) {
                                return acc + parseFloat(item.tco2e);
                              }
                              return acc;
                            }, 0) / parseFloat(infos[0].employee_amount)).toFixed(2)
                            : "N/A"}
                        </td>
                        <td>TonCO2eq/People</td>
                      </tr>
                  </table>
                  </div>
                  </div>
            </div>
            </div>

            <div className="col-md-6 p-3">
              <div className="">
                <div className="card-body">
                  <StyledPieChart
                    margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
                    series={[
                      {
                        data: scopeData.map((item, index) => ({
                          id: item.id,
                          value: parseFloat(item.tco2e),
                          label: item.name,
                          color: colorCharts[index % colorCharts.length],  // Set color for each pie slice
                        })),
                        arcLabel: (item) => {
                          const percentage = percentages.find(
                            (p) => p.label === item.label
                          )?.percentage;
                          return isNaN(parseFloat(percentage))
                            ? ""
                            : `${percentage} %`;
                        },
                        highlightScope: {
                          faded: "global",
                          highlighted: "item",
                        },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: "gray",
                        },
                        innerRadius: 100,
                        outerRadius: 180,
                        paddingAngle: 3,
                        cornerRadius: 10,
                        endAngle: 360,
                      },
                    ]}
                    slotProps={{
                      legend: {
                        direction: 'row',
                        position: { vertical: "top", horizontal: "middle" },
                        padding: 0,
                      },
                    }}
                  >
                    <PieCenterLabel>ผลการคำนวณ ปี {years} </PieCenterLabel>
                  </StyledPieChart>
                </div>
              </div>
            </div>
          </div>
      ) 
      :
      (
        <>
          ไม่พบข้อมูล
        </>
      )
    }
        </div>

  );
}
