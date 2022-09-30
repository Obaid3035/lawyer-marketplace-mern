import React, { useEffect, useState } from "react";
import "./SearchLawyer.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import SearchLawyer1 from "../../../Assets/search_main.png";
import Quote from "../../../Components/Quote/Quote";
import locationImg from "../../../Assets/location3.png";
import locationIcon from "../../../Assets/location_icon2.png";
import Lawyer1 from "../../../Assets/lawyer1.png";
import Button from "../../../Components/Button/Button";
import Pagination from "../../../Components/Pagination/Pagination";
import RatingStar from "../../../Components/RatingStar/RatingStar";
import Loader from "../../../util/loader";
import AuthApi from "../../../api/auth";
import { errorNotify } from "../../../util/toast";
import { IUser } from "../../../interfaces";
import Avatar from "../../../Assets/avatar.png";

const SearchLawyer = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const addressQuery = searchParams.get("address");
  const [users, setUsers] = useState<IUser[]>([]);
  const [userCount, setUserCount] = useState(0);
  const latQuery = searchParams.get("lat");
  const lngQuery = searchParams.get("lng");

  useEffect(() => {
    setLoading(true);
    AuthApi.getAllLawyer(latQuery!, lngQuery!, page, 3)
      .then((res) => {
        setUsers(res.data.data);
        setUserCount(res.data.count);
        setLoading(false);
      })
      .catch((e: any) => {
        errorNotify(e.response.data.message);
        setLoading(false);
      });
  }, []);

  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col md={5} className={"register_section1"}>
            <div>
              <h1>Search</h1>
            </div>
          </Col>
          <Col md={7} className={"LawyerRegister1_img"}>
            <img src={SearchLawyer1} alt={"home"} />
          </Col>
        </Row>
      </Container>

      <Container>
        <div className={"search_main"}>
          <div className={"location_search"}>
            <img src={locationImg} alt="Search" />
            <h5>{addressQuery}</h5>
          </div>
          <h3>RESULT</h3>

          {loading ? (
            <Loader />
          ) : (
            <Row>
              {users?.length > 0 ? (
                users?.map((user) => {
                  return (
                    <Col md={4}>
                      <div className={"lawyer_find"}>
                        <Row>
                          <Col md={4} className={"text-center"}>
                            <img
                              src={
                                user?.profilePicture?.url
                                  ? user?.profilePicture?.url
                                  : Avatar
                              }
                              alt={"Lawyer1"}
                              className={"lawyer_img"}
                            />
                          </Col>
                          <Col md={8}>
                            <h6>{user.name}</h6>
                            <p>
                              <img
                                src={locationIcon}
                                alt={"locationIcon"}
                                className={"locationIcon"}
                              />
                              {user.address}
                            </p>
                            <RatingStar rating={user.averageRating} />
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <p className={"my-3"}>{user.bio && user.bio.substring(0,50) + "..."}</p>
                          </Col>
                        </Row>
                        <Button
                          type={"button"}
                          onClick={() =>
                            navigate(`/lawyer-profile/${user._id}`)
                          }
                        >
                          View Details
                        </Button>
                      </div>
                    </Col>
                  );
                })
              ) : (
                <h5 className="text-center">Lawyers Not Found</h5>
              )}
            </Row>
          )}

          <Pagination
            page={page}
            setPage={setPage}
            totalPage={Math.ceil(userCount / 3) + 1}
          />
        </div>
      </Container>
      <Quote />
    </React.Fragment>
  );
};
export default SearchLawyer;
