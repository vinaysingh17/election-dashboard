/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import CandidateWinnerList from "components/CandidateWiseBooth/CandidateWinnerList";
import React, { useEffect, useState } from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
import { useParams } from "react-router-dom";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { partyWiseBoothWinBooth } from "Utils/Api";
import { partyWiseVoteGraphDataBooth } from "Utils/Api";
import { getAgeWiseData } from "Utils/Api";
import { getVoterByGenderBooth } from "Utils/Api";
import { getAgeWiseDataBooth } from "Utils/Api";
import { partyWiseVoteGraphData, partyWiseBoothWin } from "Utils/Api";
import { getVotersByGender } from "Utils/Api";
// core components
// import {
//   dashboard24HoursPerformanceChart,
//   dashboardNASDAQChart,
// } from "variables/charts.js";
const SELECT_BJP = "BJP";
const SELECT_JDS = "JDS";
const SELECT_INC = "INC";

function BoothDashboard() {
  const { id } = useParams();
  console.log(id, "<<<usePArams");
  const [GenderData, setGenderData] = useState([]);
  const [ageWiseData, setageWiseData] = useState([]);
  const [GraphpartyWiseVote, setGraphPartyWiseVote] = useState([]);
  const [partyWiseBoothResult, setPartyWiseBoothResult] = useState([]);
  const [selectedParty, setSelectedParty] = useState(SELECT_BJP);
  const [BoothNumber, setBoothNumber] = useState(id);
  const [handleSubmit, setHandleSubmit] = useState(id);

  // const [first, setfirst] = useState(second)
  const [total, setTotal] = useState(0);
  const [total2, setTotal2] = useState(0);
  useEffect(() => {
    getVoterByGenderBooth(BoothNumber, (res) => {
      setGenderData(res.data);
      console.log(res.data, "<<<< booth genderdata");
    });
    getAgeWiseDataBooth(BoothNumber, (res) => {
      console.log(res);
      setageWiseData(res);
    });

    partyWiseVoteGraphDataBooth(BoothNumber, (res) => {
      console.log(res);
      setGraphPartyWiseVote(res);
    });
    partyWiseBoothWinBooth(BoothNumber, (res) => {
      console.log("partywiseboothwin", res);
      setPartyWiseBoothResult(res);
    });
  }, [handleSubmit]);
  const GederDataFormat = () => {
    let to = 0;
    const data = GenderData?.map((item, index) => {
      // if (index == 0) return 0;
      to = item.count + to;
      return item.count;
    });
    setTotal(to);
    return data;
  };
  const AgeDataFormat = () => {
    let to = 0;
    const data = ageWiseData.map((item, index) => {
      if (index == 0) setTotal2(item.total);
      if (index > 0) return item.value;
    });
    // setTotal(to);
    return data;
  };
  const calcPercentage = (num, total) => {
    return parseFloat((num * 100) / total).toFixed(3) + "%";
  };
  const genderWiseDataRange = {
    data: (canvas) => {
      return {
        labels: [1, 2, 3, 4],
        datasets: [
          {
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157"], // male
            borderWidth: 0,
            // data: [1000, 4, 2, 1000],
            data: GederDataFormat(),
          },
        ],
      };
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      maintainAspectRatio: false,
      pieceLabel: {
        render: "percentage",
        fontColor: ["white"],
        precision: 2,
      },
      scales: {
        y: {
          ticks: {
            display: false,
          },
          grid: {
            drawBorder: false,
            display: false,
          },
        },
        x: {
          barPercentage: 1.6,
          grid: {
            drawBorder: false,
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      },
    },
  };
  const ageWiseDataRange = {
    data: (canvas) => {
      return {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [
          {
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: [
              "#e3e3e3",
              "#4acccd",
              "#fcc468",
              "#000",
              "#ef8157",
              "#85a",
              "#4da",
              "#fda",
              "#e8a",
            ], // male
            borderWidth: 0,
            // data: [1000, 4, 2, 1000],
            data: AgeDataFormat(),
          },
        ],
      };
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      maintainAspectRatio: false,
      pieceLabel: {
        render: "percentage",
        fontColor: ["white"],
        precision: 2,
      },
      scales: {
        y: {
          ticks: {
            display: false,
          },
          grid: {
            drawBorder: false,
            display: false,
          },
        },
        x: {
          barPercentage: 1.6,
          grid: {
            drawBorder: false,
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      },
    },
  };
  const matchText = (gen) => {
    if (gen == "O") return "Others";
    if (gen == "M") return "Male";
    if (gen == "F") return "Female";
    if (gen == "null" || gen == null) return "Null";
  };
  const checkSelectedParty = () => {
    if (selectedParty == SELECT_BJP) {
      return {
        data: GraphpartyWiseVote.map((item) => item.BJP),
        color: "#da5",
      };
    }
    if (selectedParty == SELECT_INC) {
      return {
        data: GraphpartyWiseVote.map((item) => item.INC),
        color: "#4ae",
      };
    }
    if (selectedParty == SELECT_JDS) {
      return {
        data: GraphpartyWiseVote.map((item) => item.JDS),
        color: "#6a5",
      };
    }
  };
  const checkSelectedPartyWiseBooth = () => {
    let fil1 = partyWiseBoothResult.filter(
      (item) => item._id.Winner == selectedParty
    );

    if (selectedParty == SELECT_BJP) {
      return {
        data: fil1.map((item) => item.count),
        color: "#da5",
      };
    }
    if (selectedParty == SELECT_INC) {
      return {
        data: fil1.map((item) => item.count),
        color: "#4ae",
      };
    }
    if (selectedParty == SELECT_JDS) {
      return {
        data: fil1.map((item) => item.count),
        color: "#6a5",
      };
    }
  };
  // console.log(AgeDataFormat(), "<<agedata");
  console.log(BoothNumber, "<<< Booth Number");
  const dashboardNASDAQChart = {
    data: (canvas) => {
      return {
        labels: ["2013", "2014", "2018"],
        datasets: [
          {
            data: checkSelectedParty().data,
            fill: false,
            // borderColor: "#51CACF",
            borderColor: checkSelectedParty().color,
            backgroundColor: "transparent",
            // pointBorderColor: "#51CACF",
            pointBorderColor: checkSelectedParty().color,
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            tension: 0.4,
          },
        ],
      };
    },
    options: {
      plugins: {
        legend: { display: false },
      },
    },
  };
  const partyWiseBoothData = {
    data: (canvas) => {
      return {
        labels: ["2013", "2014", "2018"],
        datasets: [
          {
            data: checkSelectedPartyWiseBooth().data,
            fill: false,
            // borderColor: "#51CACF",
            borderColor: checkSelectedPartyWiseBooth().color,
            backgroundColor: "transparent",
            // pointBorderColor: "#51CACF",
            pointBorderColor: checkSelectedPartyWiseBooth().color,
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            tension: 0.4,
          },
        ],
      };
    },
    options: {
      plugins: {
        legend: { display: false },
      },
    },
  };
  // console.log(GederDataFormat(), "<<<this is gender wise sample");
  return (
    <>
      <div className="content">
        <Row>
          {/* <Label for="examplePassword">Enter Booth Number</Label> */}
          <div
            className="dflex"
            style={{
              width: "90%",
              justifyContent: "space-between",
            }}
          >
            <div>
              <input
                style={{
                  width: "18rem",
                  height: "40px",
                }}
                min={1}
                onChange={(e) => {
                  setBoothNumber(e.target.value);
                }}
                type="Number"
                name="booth"
                id="examplePassword"
                placeholder="Booth Number"
              />

              <Button
                onClick={() => {
                  setHandleSubmit(BoothNumber);
                }}
              >
                Submit
              </Button>
            </div>
            <div style={{ fontSize: "20px" }}>Booth Number {handleSubmit}</div>
          </div>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Age Wise Votors</CardTitle>
                {/* <p className="card-category">Last Campaign Performance</p> */}
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <Pie
                  data={ageWiseDataRange.data}
                  // data={genderWiseDataRange.data}
                  options={ageWiseDataRange.options}
                />
              </CardBody>
              {ageWiseData.length && (
                <CardFooter>
                  <div className="dflex">
                    <div>
                      {ageWiseData.map((item, index) => {
                        if (index > 0 && index < 4) {
                          return (
                            <div className="legend dflex">
                              <div
                                className={`circlestyle ${"col" + index}`}
                              ></div>
                              {item.field}
                              {/* {GenderData[0]?.count} */}{" "}
                              {calcPercentage(item?.value, total2)}
                            </div>
                          );
                        }
                      })}
                    </div>
                    <div>
                      {ageWiseData.map((item, index) => {
                        if (index > 3 && index < 7) {
                          return (
                            <div className="legend dflex">
                              <div
                                className={`circlestyle ${"col" + index}`}
                              ></div>
                              {item.field}
                              {/* {GenderData[0]?.count} */}{" "}
                              {calcPercentage(item?.value, total2)}
                            </div>
                          );
                        }
                      })}
                    </div>
                    <div>
                      {ageWiseData.map((item, index) => {
                        if (index > 6 && index < 10) {
                          return (
                            <div className="legend dflex">
                              <div
                                className={`circlestyle ${"col" + index}`}
                              ></div>
                              {item.field}
                              {/* {GenderData[0]?.count} */}{" "}
                              {calcPercentage(item?.value, total2)}
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                  <hr />
                </CardFooter>
              )}
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Gender Voter Ration</CardTitle>
                {/* <p className="card-category">Last Campaign Performance</p> */}
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <Pie
                  data={genderWiseDataRange.data}
                  options={genderWiseDataRange.options}
                />
              </CardBody>
              {GenderData?.length && (
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-gray" />{" "}
                    {matchText(GenderData[0]?._id.sex)}
                    {/* {GenderData[0]?.count} */}{" "}
                    {calcPercentage(GenderData[0]?.count, total)}
                    {"  "}
                    {"  "}
                    <i className="fa fa-circle text-primary" />
                    {matchText(GenderData[1]._id.sex)}
                    {/* {GenderData[1]?.count} */}{" "}
                    {calcPercentage(GenderData[1]?.count, total)}
                    {"  "}
                    {"  "}
                    {GenderData.length > 2 && (
                      <>
                        <i className="fa fa-circle text-warning" />{" "}
                        {matchText(GenderData[2]?._id.sex)}
                        {/* {GenderData[2].count} */}{" "}
                        {calcPercentage(GenderData[2]?.count, total)}
                      </>
                    )}
                    {"  "}
                    {"  "}
                    {GenderData.length > 3 && (
                      <>
                        <i className="fa fa-circle text-danger" />{" "}
                        {matchText(GenderData[3]?._id.sex)}
                        {/* {GenderData[3].count} */}{" "}
                        {calcPercentage(GenderData[3]?.count, total)}
                      </>
                    )}
                  </div>
                  <hr />
                  {/* <div className="stats">
                  <i className="fa fa-calendar" /> Number of emails sent
                </div> */}
                </CardFooter>
              )}
            </Card>
          </Col>

          <Col md="8">
            <div>
              <Button
                style={{
                  background: "#da5",
                }}
                onClick={() => setSelectedParty(SELECT_BJP)}
              >
                BJP
              </Button>
              <Button
                style={{
                  background: "#6a5",
                }}
                onClick={() => setSelectedParty(SELECT_JDS)}
              >
                JDS
              </Button>
              <Button
                style={{
                  background: "#4ae",
                }}
                onClick={() => setSelectedParty(SELECT_INC)}
              >
                INC
              </Button>
            </div>
          </Col>
          <Col md="6">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">Party Wise Vote Share</CardTitle>
                <CardTitle tag="h5">{selectedParty}</CardTitle>
                {/* <p className="card-category">Line Chart with Points</p> */}
              </CardHeader>

              <CardBody>
                <Line
                  data={dashboardNASDAQChart.data}
                  options={dashboardNASDAQChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <div className="card-stats">
                  <i className="fa fa-check" /> Data information certified
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">Party Wise Booth Win</CardTitle>
                <CardTitle tag="h5"></CardTitle>
                <CardTitle tag="h5">{selectedParty}</CardTitle>
                {/* <p className="card-category">Line Chart with Points</p> */}
              </CardHeader>

              <CardBody>
                <Line
                  data={partyWiseBoothData.data}
                  options={partyWiseBoothData.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <div className="card-stats">
                  <i className="fa fa-check" /> Data information certified
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <CandidateWinnerList boothNumber={handleSubmit} />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default BoothDashboard;
