const {
  signIn,
  signInByGoogle,
  signInByFacebook,
  signUp,
  signUpByGoogle,
  signUpByFacebook,
  sendMailMore,
  verificationEmail,
  signOut,
} = require("../controllers/AuthController.js");
let router = require("express").Router();

const { signInVal, signUpVal } = require("../validation/AuthVal.js");

router.post("/api/auth/signin", signInVal, signIn);
router.post("/api/auth/signin_by_google", signInByGoogle);
router.post("/api/auth/signin_by_facebook", signInByFacebook);
router.post("/api/auth/signup", signUpVal, signUp);
router.post("/api/auth/signup_by_google", signUpByGoogle);
router.post("/api/auth/signup_by_facebook", signUpByFacebook);
router.post("/api/auth/send_mail_more", sendMailMore);
router.get("/api/auth/verification/:token", verificationEmail);
router.get("/api/auth/signout/:email", signOut);

module.exports = router;
