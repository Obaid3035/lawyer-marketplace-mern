import React from 'react';
import './PrivacyPolicy.scss';
import {Col, Container, Row} from "react-bootstrap";
import privacyImg1 from "../../../Assets/search_main.png";
import Quote from "../../../Components/Quote/Quote";

const PrivacyPolicy = () => {
    return (
        <React.Fragment>
            <Container fluid>
                <Row className={'h-100'}>
                    <Col md={5} className={'about_section1'}>
                        <div>
                            <h1>Privacy & Policy</h1>
                        </div>
                    </Col>
                    <Col md={7} className={'about_section1_img'}>
                        <img src={privacyImg1} alt={'privacy'} />
                    </Col>
                </Row>
            </Container>
            <Container className={'privacy_policy'}>
                <p>This Privacy Policy describes how your personal information is collected, used, and shared. </p>

                <p>
                    This privacy policy applies to all visitors, and our website users, members and customers using or accessing our website
                    <span> www.alzheimersnexus.com </span> (the “Site”).
                </p>

                <hr />

                <h5>WHO WE ARE</h5>
                <p>We are Alzheimer’s Nexus, LLC. You can find more information about on our <span> company website. </span></p>
                <h5>WHAT PERSONAL INFORMATION WE COLLECT</h5>
                <p>When you visit our website, we automatically collect non-personally identifying information and personally identifying
                    information about your device, including information about your web browser, IP address, time zone. Additionally,
                    as you browse the Site, we collect information about the individual web pages or products that you view,
                    what websites or search terms referred you to the Site,
                    and information about how you interact with the Site.</p>
                <h6>Cookies</h6>
                <p>“Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier.
                    We use cookies across our sites to help identify and track visitors. Visitors who do not wish to have cookies placed
                    on their computers should set their browsers to refuse cookies before using our websites,
                    with the drawback that certain features may not function properly without the aid of cookies.</p>
                <h6>Comments</h6>
                <p>When you leave comments on the site, we collect the data shown in the comments form, and also your IP address and
                    browser user agent string to help spam detection.</p>

                <hr />

                <h5>WHO WE SHARE YOUR DATA WITH?</h5>
                <p>We do not share, sell, trade or otherwise transfer your data with third parties in a way as to reveal any of your personal information.
                    However, some data is transferred and/or stored with third-party
                    services we use to operate our websites.</p>
                <h5>HOW SECURE IS MY INFORMATION?</h5>
                <p>To protect your personal information, we take reasonable precautions and follow industry best practices to make
                    sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed. </p>
                <p>
                    If you provide us with your credit card information, the information is encrypted using secure socket layer technology (SSL).
                </p>
                <h5>WHAT RIGHTS YOU HAVE OVER YOUR DATA</h5>
                <p>If you want to confirm what personal data we may have about you or wish to modify it or know the purpose of the collecting and processing or to stop data sharing and processing please contact us at <span> alzheimersnexus@gmail.com </span></p>
                <p>
                    You can also request information about your personal data consent source (if you haven’t provided it directly to us or use our products and services) or how long it will be stored. Also, you have the right to ensure, if the data is not needed for the purpose you can ask to delete the data or cease processing it. You can also request to cease using your data for direct marketing purposes. You may withdraw your consent at any time by clicking the “unsubscribe” link that can be found in our emails.
                </p>
                <p>
                    If you think we haven’t complied with data protection laws of your country, you have a right to lodge a complaint with your data protection authority. Within the technical limits, on your request, we will provide you your personal data or to your data protection authority.
                </p>
                <p>
                    If we cannot provide you the requested data in a reasonable timeframe we will let you know the date when the data will be provided and if we deny your request for data we will provide a reason why we have denied the request.
                </p>

                <hr />

                <h5>CHILDREN’S ONLINE PRIVACY PROTECTION ACT COMPLIANCE</h5>
                <p>We do not knowingly collect personal information from children under the age of 13. If we determine we have collected personal information from a child younger than 13 years of age, we will take reasonable measures to remove that information from our systems. If you are under the age of 13, please do not submit any personal information through the Site, service, and Software.</p>
                <h5>THIRD PARTY LINKS</h5>
                <p>We may include or offer third party products or services on our website, these third-party sites have separate and independent privacy policies and we do not hold any liability or responsibility for the content and activities of these linked sites.</p>
                <h5>AFFILIATE DISCLOSURE</h5>
                <p>Some of the third-party links on our store might contain affiliate links. We earn a referral fee when you buy services from companies that we recommend. We only recommend products that we believe will add value to our customers. So, if you make a purchase after clicking an affiliate link, we’ll receive a commission from them.</p>

                <hr />

                <h5>REMARKETING OR TARGETED ADVERTISING</h5>
                <p>We share your Personal Information with third parties like Google Analytics, Google Adwords, Facebook, etc. to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at <span> https://www.networkadvertising.org/understanding-online-advertising/how-does-it-work. </span> </p>

                <p>You can opt out of targeted advertising by:</p>

                <ul>
                    <li>FACEBOOK</li>
                    <li>GOOGLE</li>
                    <li>BING</li>
                </ul>

                <h5>NEWSLETTER EMAILS</h5>
                <p>By becoming a site user, member, customer of Alzheimer’s Nexus you acknowledge and agree to be signed up for our newsletter. From time to time, we may want to contact you with information about product announcements, software updates, and special offers. You may opt-out of such communications at any time by clicking the “unsubscribe” link found within the emails. We will only send marketing communications to users l ocated in the EEA with their prior consent.</p>

                <h5>WILL THIS PRIVACY POLICY EVER CHANGE?</h5>
                <p>We may need to update this Policy to keep pace with changes in our Site, Software, and Services, our business, and laws applicable to us and you. We will, however, always maintain our commitment to respect your privacy. we will notify you by revising the “Last Updated” date at the bottom of this Privacy Policy and, in some cases, we may provide you with additional notice (such as adding a statement to our homepage or sending you an email notification). Please note that your continued use of our Site, software, and services, after any change of policy means that you agree with the new policy and consent to be bound to it.</p>

                <h5>CONTACT US</h5>
                <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by email at <span> alzheimersnexus@gmail.com </span></p>

                <p style={{color: "#21556c", fontWeight: 600 }}>Last updated: 6 July 2022</p>
            </Container>
            <Quote />
        </React.Fragment>
    );
};

export default PrivacyPolicy;
