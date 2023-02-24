import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";
import { getBoothResult } from "Utils/Api";
import { getBoothList } from "Utils/Api";
import { getVoterList } from "Utils/Api";

function BoothResult() {
  const [votorListData, setVotorListData] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    getBoothResult(page, (res) => {
      console.log(res.data, "<<<boothlist");
      if (res.success) setVotorListData(res.data);
    });
  }, [page]);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Booth Result</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th> AC_No</th>
                      <th>Booth_No</th>
                      <th>Year</th>
                      <th>Winner</th>
                      <th>BJP</th>
                      <th>BJP_PER</th>
                      <th>INC</th>
                      <th>INC_PER</th>
                      <th>JDS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {votorListData?.map((item) => {
                      return (
                        <tr>
                          <td>{item.AC_No}</td>
                          <td>{item.Booth_No}</td>
                          <td>{item.Year}</td>
                          <td>{item.Winner}</td>
                          <td>{item.BJP}</td>
                          <td>{item.BJP_PER}</td>
                          <td>{item.INC}</td>
                          <td>{item.INC_PER}</td>
                          <td>{item.JDS}</td>

                          {/* <td className="text-right">$36,738</td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    onClick={() => {
                      if (page > 0) {
                        setPage(page - 1);
                      }
                    }}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => {
                      setPage(+page + 1);
                    }}
                  >
                    Next
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Table on Plain Background</CardTitle>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th className="text-right">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-right">$36,738</td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                      <td className="text-right">$23,789</td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                      <td className="text-right">$56,142</td>
                    </tr>
                    <tr>
                      <td>Philip Chaney</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                      <td className="text-right">$38,735</td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                      <td className="text-right">$63,542</td>
                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                      <td className="text-right">$78,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-right">$98,615</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
      </div>
    </>
  );
}

export default BoothResult;
