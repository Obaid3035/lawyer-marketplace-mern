import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "react-bootstrap";
// import CustomerImg from "../../../../Assets/lekin.png";
import RatingStar from "../../../../Components/RatingStar/RatingStar";
import './Testimonials.scss';
import { testimonialsApi } from '../../../../api/OurCustomerSays';

const Testimonials = () => {
    const settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <Container className={'testimonials_main'}>
            <h1>Our Customers Says</h1>
            <Slider {...settings}>
                {
                    testimonialsApi?.length > 0 ? testimonialsApi?.map((data, index) => {
                        const { customerImg, name, clientSays, rating, id } = data
                        return (
                            <div key={id} className={'customer_reviews'}>
                                <p>{clientSays}</p>
                                <div className={'text-center'}>
                                    <img src={customerImg} alt={'customer_img'} />
                                </div>
                                <div>
                                    <RatingStar rating={rating} />
                                </div>
                                <h6>{name}</h6>
                            </div>
                        )
                    }) :
                        <h5 className='mt-3 text-center'>No Testimonials Found</h5>
                }
            </Slider>
        </Container>
    );
};

export default Testimonials;
