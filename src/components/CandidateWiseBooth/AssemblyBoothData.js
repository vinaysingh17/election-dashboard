import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
import { GetAssemblyBoothData } from "Utils/Api";
import { CandidateWinnerDetailPositionWise } from "Utils/Api";
import { getCandidateList } from "Utils/Api";
import { getBoothList } from "Utils/Api";
import { getVoterList } from "Utils/Api";
import { FindNameByNo } from "Utils/BoothList";

function AssemblyBoothData() {
  const [votorListData, setVotorListData] = useState([]);
  const [year, setYear] = useState(2019);
  const [totalData, setTotalData] = useState([]);
  useEffect(() => {
    GetAssemblyBoothData((res) => {
      console.log(res, "<<<getassemblyboothdata");
      setVotorListData(res);
      findMax(res);
    });
  }, [year]);

  const findMax = (data) => {
    let max = 1;
    data.map((item) => {
      if (item._id.Booth_No > max) {
        console.log(max, "<<<<thisismax");
        max = item._id.Booth_No;
      }
    });
    setTotalData(max);
  };
  console.log(totalData, "<<< thisistotaldata");
  const filterData = (booth, year) => {
    let item = votorListData.filter((item) => {
      if (item._id.Booth_No == booth && item._id.Year == year) return true;
    });
    console.log(item[0], "<<<item[0");
    if (!item[0]) return null;
    return item[0]?._id.Winner;
  };
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
                      <th>Booth No</th>
                      <th>Booth Name</th>
                      <th>2019</th>
                      <th>2018</th>
                      <th>2014</th>
                      <th>2013</th>
                    </tr>
                  </thead>
                  <tbody>
                    {new Array(totalData + 1).fill(0).map((item, index) => {
                      if (index == 0) return null;
                      console.log(filterData(index, 2019));
                      if (filterData(index, 2019)) return null;
                      return (
                        <tr>
                          <td>{index}</td>
                          <td>{FindNameByNo(index)}</td>
                          <td>{filterData(index, 2019)}</td>
                          <td>{filterData(index, 2018)}</td>
                          <td>{filterData(index, 2014)}</td>
                          <td>{filterData(index, 2013)}</td>
                          <td>
                            <Link to={`admin-booth-dashboard/${index}`}>
                              Detail
                            </Link>
                          </td>
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

export default AssemblyBoothData;
