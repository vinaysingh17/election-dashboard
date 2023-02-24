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
import { getVoterList } from "Utils/Api";

function VotorList() {
  const [votorListData, setVotorListData] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    getVoterList(page, (res) => {
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
                <CardTitle tag="h4">Votor List</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>AC_NO</th>
                      <th>Booth_No</th>
                      <th>EPIC_No</th>
                      <th>Relative_Name</th>
                      <th>Sec_No</th>
                      <th>Voter_Name</th>
                      <th>Voter_No</th>
                      <th>age</th>
                      <th>sex</th>
                      <th className="text-right">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {votorListData?.map((item) => {
                      return (
                        <tr>
                          <td>{item.AC_NO}</td>
                          <td>{item.Booth_No}</td>
                          <td>{item.EPIC_No}</td>
                          <td>{item.Relative_Name}</td>
                          <td>{item.Sec_No}</td>
                          <td>{item.Voter_Name}</td>
                          <td>{item.Voter_No}</td>
                          <td>{item.age}</td>
                          <td>{item.sex}</td>
                          <td>{item.Salary}</td>
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

export default VotorList;
