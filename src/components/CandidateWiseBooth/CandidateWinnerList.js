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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { CandidateWinnerDetailPositionWise } from "Utils/Api";
import { getCandidateList } from "Utils/Api";
import { getBoothList } from "Utils/Api";
import { getVoterList } from "Utils/Api";

function CandidateWinnerList() {
  const [votorListData, setVotorListData] = useState([]);
  const [year, setYear] = useState(2019);
  const [totalData, setTotalData] = useState([]);
  useEffect(() => {
    CandidateWinnerDetailPositionWise(year, (res) => {
      //   console.log(res.data, "<<<boothlist");
      setVotorListData(res.data);
      setTotalData(res.totalVotes);
    });
  }, [year]);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <UncontrolledDropdown group>
              <Button color="primary">Select Year</Button>
              <DropdownToggle caret color="primary" />
              <DropdownMenu>
                {[2013, 2018, 2019].map((item) => {
                  return (
                    <DropdownItem
                      onClick={() => {
                        setYear(item);
                        // alert("hello");
                      }}
                    >
                      {item}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
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
                          {/* <td>{item.Votes_percentage}</td> */}

                          {/* <td className="text-right">$36,738</td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export const CandidateWinnerListBooth = ({ booth = 1 }) => {
  function CandidateWinnerList() {
    const [votorListData, setVotorListData] = useState([]);
    const [year, setYear] = useState(2019);
    const [totalData, setTotalData] = useState([]);
    useEffect(() => {
      CandidateWinnerDetailPositionWise(booth, year, (res) => {
        //   console.log(res.data, "<<<boothlist");
        setVotorListData(res.data);
        setTotalData(res.totalVotes);
      });
    }, [year, booth]);

    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <UncontrolledDropdown group>
                <Button color="primary">Select Year</Button>
                <DropdownToggle caret color="primary" />
                <DropdownMenu>
                  {[2013, 2018, 2019].map((item) => {
                    return (
                      <DropdownItem
                        onClick={() => {
                          setYear(item);
                          // alert("hello");
                        }}
                      >
                        {item}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
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
                            {/* <td>{item.Votes_percentage}</td> */}

                            {/* <td className="text-right">$36,738</td> */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
};

export default CandidateWinnerList;
