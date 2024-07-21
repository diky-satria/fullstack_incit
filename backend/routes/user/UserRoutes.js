const {
  resetPassword,
  resetName,
  listOfName,
  updateName,
} = require("../../controllers/user/UserController.js");
const VerifyUser = require("../../middleware/VerifyUser");
let router = require("express").Router();

const {
  resetPasswordVal,
  resetNameVal,
} = require("../../validation/user/UserVal.js");

router.patch(
  `/api/user/reset_password/:email`,
  VerifyUser,
  resetPasswordVal,
  resetPassword
);
router.patch(
  `/api/user/reset_name/:email`,
  VerifyUser,
  resetNameVal,
  resetName
);
router.get(`/api/user/list_of_name/:id`, VerifyUser, listOfName);
router.get(`/api/user/update_name/:id`, VerifyUser, updateName);

module.exports = router;
