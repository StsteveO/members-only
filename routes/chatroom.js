var express = require("express");
var router = express.Router();
const intro_page_controller= require("../controller/introPageController");
const login_controller= require("../controller/loginController");
const sign_up_controller= require("../controller/signupController");
const log_out_controller= require("../controller/logOutController");
const comment_controller= require("../controller/commentController");
const account_controller= require("../controller/accountController");

//all url routes go in here 

//...../chatroom/
router.get("/:id/delete_account", account_controller.delete_account_GET);

router.post("/:id/delete_account", account_controller.delete_account_POST);

router.get("/:id/update_account_information", account_controller.update_account_information_GET);

router.post("/:id/update_account_information", account_controller.update_account_information_POST);

router.get("/:id/delete_comment", comment_controller.delete_comment_GET);

router.post("/:id/delete_comment", comment_controller.delete_comment_POST);

router.get("/", intro_page_controller.index); //intro page

router.post("/", intro_page_controller.share_comment_POST);

router.get("/no_account_found", account_controller.no_account_found_GET);

router.get("/login", login_controller.login_form_GET);

router.post("/login", login_controller.login_form_POST);

router.get("/sign_up", sign_up_controller.sign_up_form_GET);

router.post("/sign_up", sign_up_controller.sign_up_form_POST);

router.get("/log_out", log_out_controller.log_out_perform_GET);

module.exports = router;
