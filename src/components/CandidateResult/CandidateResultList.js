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
import { getCandidateList } from "Utils/Api";
import { getBoothList } from "Utils/Api";
import { getVoterList } from "Utils/Api";

function CandidateList() {
  const [votorListData, setVotorListData] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    getCandidateList(page, (res) => {
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
                <CardTitle tag="h4">Candidate Result</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Year</th>
                      <th>Position</th>
                      <th>Candidate</th>
                      <th>Party</th>
                      <th>Votes</th>
                      <th>Votes_percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {votorListData?.map((item) => {
                      return (
                        <tr>
                          <td>{item.Year}</td>
                          <td>{item.Position}</td>
                          <td>{item.Candidate}</td>
                          <td>{item.Party}</td>
                          <td>{item.Votes}</td>
                          <td>{item.Votes_percentage}</td>

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
        </Row>
      </div>
    </>
  );
}

export default CandidateList;
