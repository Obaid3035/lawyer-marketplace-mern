import React, { useState, useEffect } from "react";
import "./Reviews.scss";
import Avatar from "../../../../../Assets/avatar.png";
import { Col, Container, Row } from "react-bootstrap";
import RatingStar from "../../../../../Components/RatingStar/RatingStar";
import Quote from "../../../../../Components/Quote/Quote";
import Pagination from "../../../../../Components/Pagination/Pagination";
import Loader from "../../../../../util/loader";
import ReviewApi from "../../../../../api/review";
import { IUser } from "../../../../../interfaces";
import { useParams } from "react-router-dom";
import { errorNotify } from "../../../../../util/toast";
import {timeAgo} from "../../../../../util/helper";

export interface IReview {
  _id: string;
  rating: number;
  description: string;
  caregiver: IUser;
  lawyer: IUser;
  createdAt: string;
}

const Reviews = () => {
  const [page, setPage] = useState(0);
  const { id } = useParams();
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [reviewsCount, setReviewsCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    ReviewApi.getAllReviews(id!, page)
      .then((res) => {
        setReviews(res.data.data);
        setReviewsCount(res.data.count);
        setLoading(false);
      })
      .catch((e: any) => {
        errorNotify(e.response.data.message);
        setLoading(false);
      });
  }, [page]);

  return (
    <React.Fragment>
      <Container className={"all_reviews"}>
        <h2>Reviews</h2>

        {loading ? (
          <Loader />
        ) : (
          <Row className={"justify-content-center"}>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <Col key={review._id} md={11} className={"particular_review"}>
                  <Row>
                    <Col md={1}>
                      <div className={"avatar_column"}>
                        <img
                          src={
                            review.caregiver.profilePicture
                              ? review.caregiver.profilePicture.url
                              : Avatar
                          }
                          alt={"avatar"}
                        />
                      </div>
                    </Col>
                    <Col md={9}>
                      <h6>{review.caregiver.name}</h6>
                      <p>{review.description}</p>
                      <hr />
                      <small>{timeAgo(review.createdAt)}</small>
                    </Col>
                    <Col md={2} className={"stars_col"}>
                      <RatingStar rating={review.rating} />
                    </Col>
                  </Row>
                </Col>
              ))
            ) : (
              <p className={"text-center"}>No Review Found</p>
            )}
          </Row>
        )}

        <Pagination
          page={page}
          setPage={setPage}
          totalPage={Math.ceil(reviewsCount / 3)}
        />
      </Container>
      <Quote />
    </React.Fragment>
  );
};
export default Reviews;
