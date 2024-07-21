const { body } = require("express-validator");

exports.resetPasswordVal = [
  body("old_password")
    .notEmpty()
    .withMessage("Old password is required")
    .isLength({ min: 8 })
    .withMessage("Old password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Old password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Old password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Old password must contain at least one digit")
    .matches(/[@$!%*?&#]/)
    .withMessage("Old password must contain at least one special character"),
  body("new_password")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("New password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("New password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("New password must contain at least one digit")
    .matches(/[@$!%*?&#]/)
    .withMessage("New password must contain at least one special character"),
  body("new_password_confirmation")
    .notEmpty()
    .withMessage("New password confirmation is required")
    .isLength({ min: 8 })
    .withMessage("New password confirmation must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage(
      "New password confirmation must contain at least one lowercase letter"
    )
    .matches(/[A-Z]/)
    .withMessage(
      "New password confirmation must contain at least one uppercase letter"
    )
    .matches(/\d/)
    .withMessage("New password confirmation must contain at least one digit")
    .matches(/[@$!%*?&#]/)
    .withMessage(
      "New password confirmation must contain at least one special character"
    )
    .custom((new_password_confirmation, { req }) => {
      if (new_password_confirmation !== req.body.new_password) {
        throw new Error("New password confirmation is wrong");
      }
      return true;
    }),
];

exports.resetNameVal = [
  body("name").notEmpty().withMessage("Name is required"),
];
