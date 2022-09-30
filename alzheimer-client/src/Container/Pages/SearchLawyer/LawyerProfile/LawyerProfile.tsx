import React, { useEffect, useState } from "react";
import "./LawyerProfile.scss";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import SearchLawyer1 from "../../../../Assets/search_main.png";
import Quote from "../../../../Components/Quote/Quote";
import locationIcon from "../../../../Assets/location_icon2.png";
import Button from "../../../../Components/Button/Button";
import RatingStar from "../../../../Components/RatingStar/RatingStar";
import ReviewPopUp from "./ReviewPopUp/ReviewPopUp";
import Loader from "../../../../util/loader";
import AuthApi from "../../../../api/auth";
import { IUser, USER_ROLE } from "../../../../interfaces";
import Avatar from "../../../../Assets/avatar.png";
import useAuth from "../../../../hooks/useAuth";
import { errorNotify, successNotify } from "../../../../util/toast";
import ChatApi from "../../../../api/chat";
import useSelectedChat from "../../../../hooks/useSelectedChat";
import {IConversation} from "../../Chat/Chat";
import useSocket from "../../../../hooks/useSocket";

const LawyerProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { auth } = useAuth();
  const { socket } = useSocket()
  const [loading, setLoading] = useState(false);
  const [popupLoader, setPopUpLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [rating, setRating] = useState(0);
  const [buttonLoader, setButtonLoader] = useState(false);
  const { setSelectedChat } = useSelectedChat();

  const giveReviewModal = () => {
    setPopUpLoader(true);

    setTimeout(() => {
      setPopUpLoader(false);
    }, 2000);

    setShowModal(true);
  };

  useEffect(() => {
    setLoading(true);
    AuthApi.getLawyerById(id!).then((res) => {
      setUser(res.data.lawyer);
      setRating(res.data.rating);
      setLoading(false);
    });
  }, []);

  const onMessageClickHandler = async () => {
    setButtonLoader(true);
    try {
      const res = await ChatApi.createConversations(id!);
      setButtonLoader(false);
      if (res.data.alreadyCreated) {
        setSelectedChat((chat: IConversation) => {
          if (chat) socket?.leaveRoom(chat._id)
          return res.data.conversation
        });
        navigate("/chat");
      } else {
        successNotify(res.data.message);
        navigate("/chat");
      }
    } catch (e: any) {
      setButtonLoader(false);
      errorNotify(e.response.data.message);
    }
  };

  return (
    <React.Fragment>
      <ReviewPopUp
        show={showModal}
        lawyerId={id!}
        setShow={setShowModal}
        popUpLoading={popupLoader}
      />
      <Container fluid>
        <Row>
          <Col md={5} className={"register_section1"}>
            <div>
              <h1>Profile</h1>
            </div>
          </Col>
          <Col md={7} className={"LawyerRegister1_img"}>
            <img src={SearchLawyer1} alt={"home"} />
          </Col>
        </Row>
      </Container>
      <Container>
        <div className={"search_main"}>
          <h3>PROFILE DETAIL</h3>
          {loading ? (
            <Loader />
          ) : (
            <div className={"lawyer_details"}>
              <Row className={"align-items-center"}>
                <Col md={2} className={"text-center"}>
                  <img
                    src={
                      user?.profilePicture ? user.profilePicture.url : Avatar
                    }
                    alt={"Lawyer_detail_img"}
                    className={"Lawyer_detail_img"}
                  />
                </Col>
                <Col md={7}>
                  <h6>{user?.name}</h6>
                  <p>
                    <img
                      src={locationIcon}
                      alt={"locationIcon"}
                      className={"locationIcon"}
                    />
                    {user?.address}
                  </p>
                  <div className={"ratings"}>
                    <RatingStar rating={rating} />
                    <p onClick={() => navigate(`/reviews/${user?._id}`)}>
                      REVIEWS
                    </p>
                  </div>
                </Col>
              </Row>
              <p>{user?.bio}</p>

              {auth && auth.role === USER_ROLE.CAREGIVER ? (
                <div>
                  <Button type={"button"} onClick={() => console.log("")}>
                    Download CV
                  </Button>
                  <Button type={"button"} onClick={onMessageClickHandler}>
                    {buttonLoader ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Message"
                    )}
                  </Button>
                  <Button type={"button"} onClick={giveReviewModal}>
                    Give Reviews
                  </Button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </Container>
      <Quote />
    </React.Fragment>
  );
};
export default LawyerProfile;
