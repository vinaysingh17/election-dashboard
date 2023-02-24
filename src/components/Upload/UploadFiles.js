import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Line, Pie } from "react-chartjs-2";
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
} from "reactstrap";
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";
import { uploadVoterList } from "Utils/Api";
import { uploadBoothList } from "Utils/Api";
import { candidateListUpload } from "Utils/Api";
import NotificationAlert from "react-notification-alert";
import { uploadBoothResult } from "Utils/Api";
const successMessage = "File Successfully uploaded.";
const errorMessage = "Error while uploading file !!";
function UploadFiles() {
  const notificationAlert = React.useRef();
  const [items, setItems] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [votorListRowCount, setvotorListRowCount] = useState(0);
  const [boothResultRowCount, setboothResultRowCount] = useState(0);
  const [candidateListRowCount, setcandidateListRowCount] = useState(0);
  const [boothListRowCount, setboothListRowCount] = useState(0);

  const notify = (place, success, msg) => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (success) {
      case 1:
        type = "primary";
        break;
      case "SUCCESS":
        type = "success";
        break;
      case "ERROR":
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>{msg}</div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlert.current.notificationAlert(options);
  };
  const readExcel = (file, setValue) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      // alert("sdf")
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);

        console.log(data, "<<<<<data");
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      console.log("exceldata", d);
      setExcelData(d);
      setValue(d.length);
    });
  };
  const uploadFile = () => {
    function split(array, n) {
      let [...arr] = array;
      var res = [];
      while (arr.length) {
        res.push(arr.splice(0, n));
      }
      return res;
    }
    const data = split(excelData, 50000);
    console.log(data[6], "<<<split", 6);
    // return null;

    uploadVoterList(data[0], (res) => {
      console.log(res);
      if (res.success) notify("tr", "SUCCESS", successMessage);
      else notify("tr", "ERROR", errorMessage);
    });
  };
  const uploadBooth = () => {
    uploadBoothList(excelData, (res) => {
      console.log(res);
      if (res.success) notify("tr", "SUCCESS", successMessage);
      else notify("tr", "ERROR", errorMessage);
    });
  };
  const uploadCandidateList = () => {
    candidateListUpload(excelData, (res) => {
      console.log(res);
      if (res.success) notify("tr", "SUCCESS", successMessage);
      else notify("tr", "ERROR", errorMessage);
    });
  };
  const uploadBoothResultList = () => {
    uploadBoothResult(excelData, (res) => {
      console.log(res);
      if (res.success) notify("tr", "SUCCESS", successMessage);
      else notify("tr", "ERROR", errorMessage);
    });
  };

  // Notification

  return (
    <>
      <div className="content">
        <NotificationAlert ref={notificationAlert} />
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Upload Votor List</p>
                      <p className="card-category">
                        {votorListRowCount > 0 &&
                          `Rows Count: ${votorListRowCount}`}
                      </p>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <input
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      readExcel(file, setvotorListRowCount);
                    }}
                  />
                </div>
              </CardFooter>
              {votorListRowCount > 0 && (
                <CardFooter>
                  <Button color="primary" size="lg" block onClick={uploadFile}>
                    Upload
                  </Button>{" "}
                </CardFooter>
              )}
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Upload Booth Data</p>
                      <p className="card-category">
                        {boothListRowCount > 0 &&
                          `Rows Count: ${boothListRowCount}`}
                      </p>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <input
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      readExcel(file, setboothListRowCount);
                    }}
                  />
                </div>
              </CardFooter>
              {boothListRowCount > 0 && (
                <CardFooter>
                  <Button color="primary" size="lg" block onClick={uploadBooth}>
                    Upload
                  </Button>{" "}
                </CardFooter>
              )}
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">
                        Upload Candidate List Data
                      </p>
                      <p className="card-category">
                        {candidateListRowCount > 0 &&
                          `Rows Count: ${candidateListRowCount}`}
                      </p>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <input
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      readExcel(file, setcandidateListRowCount);
                    }}
                  />
                </div>
              </CardFooter>
              {candidateListRowCount > 0 && (
                <CardFooter>
                  <Button
                    color="primary"
                    size="lg"
                    block
                    onClick={uploadCandidateList}
                  >
                    Upload
                  </Button>{" "}
                </CardFooter>
              )}
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Upload Booth Result Data</p>
                      <p className="card-category">
                        {boothResultRowCount > 0 &&
                          `Rows Count: ${boothResultRowCount}`}
                      </p>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <input
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      readExcel(file, setboothResultRowCount);
                    }}
                  />
                </div>
              </CardFooter>
              {boothResultRowCount > 0 && (
                <CardFooter>
                  <Button
                    color="primary"
                    size="lg"
                    block
                    onClick={uploadBoothResultList}
                  >
                    Upload
                  </Button>{" "}
                </CardFooter>
              )}
            </Card>
          </Col>
          {/* <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <CardTitle tag="p">$ 1,345</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> Last day
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Errors</p>
                      <CardTitle tag="p">23</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-clock" /> In the last hour
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Followers</p>
                      <CardTitle tag="p">+45K</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update now
                </div>
              </CardFooter>
            </Card>
          </Col> */}
        </Row>
      </div>
    </>
  );
}

export default UploadFiles;
