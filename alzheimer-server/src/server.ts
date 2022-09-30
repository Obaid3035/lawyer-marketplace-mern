import App from "./app";
import AuthController from "./controller/auth.controller";
import LawyerController from "./controller/lawyer.controller";
import ReviewController from "./controller/review.controller";
import AdminController from "./controller/admin/admin.controller";
import ChatController from "./controller/chat.controller";
import HomeController from "./controller/cms/home.controller";
import AboutController from "./controller/cms/about.controller";
import FooterController from "./controller/cms/footer.controller";
import JoinController from "./controller/cms/join.controller";
import LawyerJoinController from "./controller/cms/lawyerJoin.controller";
import PrivacyPolicyController from "./controller/cms/privacyPolicy.controller";


const app = new App([
    new AuthController(),
    new LawyerController(),
    new ReviewController(),
    new AdminController(),
    new ChatController(),
    new HomeController(),
    new AboutController(),
    new FooterController(),
    new JoinController(),
    new LawyerJoinController(),
    new PrivacyPolicyController()
])
app.bootstrap()
