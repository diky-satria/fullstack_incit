const Models = require("../../models/index.js");
const { sequelize } = require("../../models/index.js");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      errors: errors.array()[0],
    });
  } else {
    // GET PARAMS AND BODY
    const { email } = req.params;
    const { old_password, new_password } = req.body;

    // CHECK USER BASE ON EMAIL
    const user = await sequelize.query(
      `SELECT * FROM users WHERE email = "${email}"`,
      { type: QueryTypes.SELECT }
    );

    // CHECK USER EXISTS
    if (user.length > 0) {
      const password = await bcrypt.compare(old_password, user[0].password);

      // CHECK INVALID PASSWORD
      if (password) {
        const check_new_password = await bcrypt.compare(
          new_password,
          user[0].password
        );

        if (check_new_password) {
          return res.status(422).json({
            errors: {
              msg: "New password can not be the same as old password",
              param: "new_password",
            },
          });
        }

        // SAVE NEW PASSWORD TO DATABASE
        const encrypt_password = await bcrypt.hash(new_password, 10);
        await Models.users.update(
          {
            password: encrypt_password,
          },
          {
            where: {
              email: req.params.email,
            },
          }
        );

        return res.status(200).json({
          msg: "Reset password successfully",
        });
      } else {
        return res.status(422).json({
          errors: {
            msg: "Old password is wrong",
            param: "old_password",
          },
        });
      }
    } else {
      return res.status(422).json({
        errors: {
          msg: "Email is not registered",
          param: "username",
        },
      });
    }
  }
};

exports.resetName = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      errors: errors.array()[0],
    });
  } else {
    try {
      // GET PARAMS AND BODY
      const { email } = req.params;
      const { name } = req.body;

      // CHECK USER BASE ON EMAIL
      const user = await sequelize.query(
        `SELECT * FROM users WHERE email = "${email}"`,
        { type: QueryTypes.SELECT }
      );

      // SAVE NEW NAME TO NAMES TABLE
      await Models.names.create({
        user_id: user[0].id,
        name: name,
      });

      // UPDATE NAME IN USERS TABLE
      await Models.users.update(
        {
          name: name,
        },
        {
          where: {
            email: email,
          },
        }
      );

      // CHECK USER BASE ON EMAIL FOR RESPONSE
      const user_response = await sequelize.query(
        `SELECT name FROM users WHERE email = "${email}"`,
        { type: QueryTypes.SELECT }
      );

      return res.status(200).json({
        msg: "Reset name successfully",
        data: user_response[0],
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Internal server error",
      });
    }
  }
};

exports.listOfName = async (req, res) => {
  try {
    // LIST OF NAME
    const name = await sequelize.query(
      `SELECT id, name FROM names WHERE user_id = ${req.params.id} ORDER BY id DESC`,
      {
        type: QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      msg: "Success",
      data: name,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server error",
    });
  }
};

exports.updateName = async (req, res) => {
  try {
    // GET PARAMS AND BODY
    const { id } = req.params;

    // CHECK NAMES BASE ON ID
    const name = await sequelize.query(
      `SELECT * FROM names WHERE id = "${id}"`,
      { type: QueryTypes.SELECT }
    );

    // UPDATE NAME IN USERS TABLE
    await Models.users.update(
      {
        name: name[0].name,
      },
      {
        where: {
          id: name[0].user_id,
        },
      }
    );

    // CHECK USERS BASE ON ID
    const user = await sequelize.query(
      `SELECT id, name, email FROM users WHERE id = "${name[0].user_id}"`,
      { type: QueryTypes.SELECT }
    );

    return res.status(200).json({
      msg: "Update name successfully",
      data: user[0],
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server error",
    });
  }
};
