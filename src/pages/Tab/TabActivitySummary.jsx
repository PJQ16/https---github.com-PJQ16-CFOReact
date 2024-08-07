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
  const { years, id } = useParams();
  const [scopeData, setScopeData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

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

  const colors = [
    "#0E3B43", "#357266", "#A3BBAD", "#65532F", "#312509",
];

const data = scopeData.map((item, index) => ({
    years: item.years,
    tco2e: item.tco2e,
    name: item.name,
}));

const tco2eValues = data.map(item => parseFloat(item.tco2e).toFixed(2));
const labels = data.map(item => item.name);

  return (
    <div>
      <div className="row">
        <p className="h2 ms-3">สรุปผลการคำนวณ</p>
        <div className="d-flex flex-row justify-content-evenly">
          <div className="d-flex  flex-column">
            <div className="col-md-12 p-3">
              <div className="card shadow border-0">
                <div className="card-body ">
                <BarChart
    width={500}
    height={400}
    series={[
        {
            data: tco2eValues,
            label: 'tCO2e',
            id: 'tco2eId'
        }
    ]}
    xAxis={[{ data: labels, scaleType: 'band' }]}
/>
                </div>
              </div>
            </div>

            <div className="col-md-12 p-3 w-100">
              <div className="card shadow border-0">
                <div className="card-body">
                  <StyledPieChart
                    margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
                    slotProps={{
                      legend: {
                        direction: "row",
                        position: { vertical: "top", horizontal: "middle" },
                        padding: 0,
                      },
                    }}
                    series={[
                      {
                        data: scopeData.map((item) => ({
                          id: item.id,
                          value: parseFloat(item.tco2e),
                          label: item.name,
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
                  >
                    <PieCenterLabel>ผลการคำนวณ ปี {years} </PieCenterLabel>
                  </StyledPieChart>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 m-3">
            <div className="card border-0 shadow">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-striped table-hover vh-100">
                    <thead>
                      <tr className="text-center">
                        <th>ขอบเขต</th>
                        <th>Organization Greenhouse Gas Emissions</th>
                        <th>Ratio Scope 1 and 2</th>
                        <th>Ratio Scope 1 and 2 3</th>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
