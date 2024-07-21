const Models = require("../models/index.js");
const { sequelize } = require("../models/index.js");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { sendMail } = require("../library/nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signIn = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      errors: errors.array()[0],
    });
  } else {
    // CHECK USER BASE ON EMAIL
    var user = await sequelize.query(
      `SELECT * FROM users WHERE email='${req.body.email}'`,
      { type: QueryTypes.SELECT }
    );

    // CHECK ACTIVE USER
    if (!user[0].active) {
      return res.status(422).json({
        errors: {
          msg: "This email is not active, please check your email then click on the link",
          param: "email",
        },
      });
    }

    // CHECK USER REGISTERED BY GOOGLE OR FACEBOOK
    if (!user[0].password) {
      return res.status(422).json({
        errors: {
          msg: "Please login by google or facebook",
          param: "email",
        },
      });
    }

    // CHECK USER EXISTS
    if (user.length > 0) {
      const password = await bcrypt.compare(
        req.body.password,
        user[0].password
      );

      // CHECK INVALID PASSWORD
      if (password) {
        const user_variable = {
          id: user[0].id,
          name: user[0].name,
          email: user[0].email,
        };
        const token = jwt.sign(user_variable, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        // UPDATE TOKEN USER AND COUNT LOGIN
        await Models.users.update(
          {
            token: token,
            count_login: user[0].count_login + 1,
          },
          {
            where: {
              id: user[0].id,
            },
          }
        );

        // SAVE TOKEN TO SESSION TABLE
        await Models.sessions.create({
          user_id: user[0].id,
          token: token,
        });

        return res.status(200).json({
          msg: "Successfully logged in",
          data: user_variable,
          token: token,
        });
      } else {
        return res.status(422).json({
          errors: {
            msg: "Incorrect password",
            param: "password",
          },
        });
      }
    } else {
      return res.status(422).json({
        errors: {
          msg: "Email doesn't registered",
          param: "email",
        },
      });
    }
  }
};

exports.signInByGoogle = async (req, res) => {
  try {
    // REQUEST BODY
    const { name, email } = req.body;

    // CHECK ERROR FROM GOOGLE API BASE ON PAYLOAD AVAILABLE OR NOT
    if (!name || !email) {
      return res.status(422).json({
        msg: "Sign In by google failed",
      });
    }

    // CHECK USER BASE ON EMAIL
    const user = await sequelize.query(
      `SELECT * FROM users WHERE email = "${email}"`,
      { type: QueryTypes.SELECT }
    );

    // CHECK USER EXISTS
    if (user.length > 0) {
      // UPDATE USER
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

      // CHECK USER BASE ON EMAIL
      var user_info = await sequelize.query(
        `SELECT * FROM users WHERE email = "${email}"`,
        { type: QueryTypes.SELECT }
      );

      // CREATE TOKEN FOR COOKIE BROWSER
      var user_variable = {
        id: user_info[0].id,
        name: user_info[0].name,
        email: user_info[0].email,
      };
    } else {
      // CREATE USER
      const response = await Models.users.create({
        name: name,
        email: email,
        active: 1,
      });

      // CHECK USER BASE ON ID AFTER CREATE
      var user_info = await sequelize.query(
        `SELECT * FROM users WHERE id = "${response.id}"`,
        { type: QueryTypes.SELECT }
      );

      // CREATE TOKEN FOR COOKIE BROWSER
      var user_variable = {
        id: user_info[0].id,
        name: user_info[0].name,
        email: user_info[0].email,
      };
    }

    const token_cookie = jwt.sign(user_variable, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // UPDATE TOKEN USER AND COUNT LOGIN
    await Models.users.update(
      {
        token: token_cookie,
        count_login: user_info[0].count_login + 1,
      },
      {
        where: {
          email: email,
        },
      }
    );

    // SAVE TOKEN TO SESSION TABLE
    await Models.sessions.create({
      user_id: user_info[0].id,
      token: token_cookie,
    });

    return res.status(200).json({
      msg: "Signin by google successfully",
      data: user_variable,
      token: token_cookie,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

exports.signInByFacebook = async (req, res) => {
  try {
    // REQUEST BODY
    const { name, email } = req.body;

    // CHECK ERROR FROM GOOGLE API BASE ON PAYLOAD AVAILABLE OR NOT
    if (!name || !email) {
      return res.status(422).json({
        msg: "Sign In by google failed",
      });
    }

    // CHECK USER BASE ON EMAIL
    const user = await sequelize.query(
      `SELECT * FROM users WHERE email = "${email}"`,
      { type: QueryTypes.SELECT }
    );

    // CHECK USER EXISTS
    if (user.length > 0) {
      // UPDATE USER
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

      // CHECK USER BASE ON EMAIL
      var user_info = await sequelize.query(
        `SELECT * FROM users WHERE email = "${email}"`,
        { type: QueryTypes.SELECT }
      );

      // CREATE TOKEN FOR COOKIE BROWSER
      var user_variable = {
        id: user_info[0].id,
        name: user_info[0].name,
        email: user_info[0].email,
      };
    } else {
      // CREATE USER
      const response = await Models.users.create({
        name: name,
        email: email,
        active: 1,
      });

      // CHECK USER BASE ON ID AFTER CREATE
      var user_info = await sequelize.query(
        `SELECT * FROM users WHERE id = "${response.id}"`,
        { type: QueryTypes.SELECT }
      );

      // CREATE TOKEN FOR COOKIE BROWSER
      var user_variable = {
        id: user_info[0].id,
        name: user_info[0].name,
        email: user_info[0].email,
      };
    }

    const token_cookie = jwt.sign(user_variable, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // UPDATE TOKEN USER AND COUNT LOGIN
    await Models.users.update(
      {
        token: token_cookie,
        count_login: user_info[0].count_login + 1,
      },
      {
        where: {
          email: email,
        },
      }
    );

    // SAVE TOKEN TO SESSION TABLE
    await Models.sessions.create({
      user_id: user_info[0].id,
      token: token_cookie,
    });

    return res.status(200).json({
      msg: "Signin by facebook successfully",
      data: user_variable,
      token: token_cookie,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

exports.signUp = async (req, res) => {
  // VALIDATION
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      errors: errors.array()[0],
    });
  } else {
    try {
      // REQUEST BODY
      const { name, email, password, password_confirmation } = req.body;

      // SAVE TO DATABASE
      const encrypt_password = await bcrypt.hash(password_confirmation, 10);
      const response = await Models.users.create({
        name: name,
        email: email,
        password: encrypt_password,
      });

      // CREATE VERIFICATION TOKEN
      const token = jwt.sign({ user_id: response.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // SEND EMAIL VERIFICATION
      const templateEmail = {
        from: `INCIT`,
        to: email,
        subject: `Email Verification`,
        html: `
                    <p style="text-align:center;margin-bottom:20px;">---------------------------------------------------------------------------------</p>
                    <p style="text-align:center;margin-bottom:20px;">Please click <b>link</b> bellow to verify your email</p>
                    <div style="width:100%;text-align:center;">
                        <a href="${process.env.CLIENT_URL}/verification_user/${token}" style="color:blue;">${process.env.CLIENT_URL}/verification_user/${token}</a>
                    </div>
                    <p style="text-align:center;margin-top:20px;">---------------------------------------------------------------------------------</p>
                `,
      };
      const result = await sendMail(templateEmail);

      // RESPONSE
      return res.status(200).json({
        msg: "User add successfully",
        data: response,
        send_email_link: result.success,
      });
    } catch (error) {
      return res.status(500).json({
        msg: error,
      });
    }
  }
};

exports.sendMailMore = async (req, res) => {
  try {
    // REQUEST BODY
    const { email } = req.body;

    // CHECK USER BASE ON EMAIL
    const response = await sequelize.query(
      `SELECT * FROM users WHERE email = "${email}"`,
      { type: QueryTypes.SELECT }
    );

    // CREATE VERIFICATION TOKEN
    const token = jwt.sign(
      { user_id: response[0].id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // SEND EMAIL VERIFICATION
    const templateEmail = {
      from: `INCIT`,
      to: email,
      subject: `Email Verification`,
      html: `
                    <p style="text-align:center;margin-bottom:20px;">---------------------------------------------------------------------------------</p>
                    <p style="text-align:center;margin-bottom:20px;">Please click <b>link</b> bellow to verify your email</p>
                    <div style="width:100%;text-align:center;">
                        <a href="${process.env.CLIENT_URL}/verification_user/${token}" style="color:blue;">${process.env.CLIENT_URL}/verification_user/${token}</a>
                    </div>
                    <p style="text-align:center;margin-top:20px;">---------------------------------------------------------------------------------</p>
                `,
    };
    const result = await sendMail(templateEmail);

    // RESPONSE
    return res.status(200).json({
      msg: "Email verification send successfully",
      data: response,
      send_email_link: result.success,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

exports.signUpByGoogle = async (req, res) => {
  try {
    // REQUEST BODY
    const { name, email } = req.body;

    // CHECK USER BASE ON EMAIL
    const user = await sequelize.query(
      `SELECT * FROM users WHERE email = "${email}"`,
      { type: QueryTypes.SELECT }
    );

    // CHECK USER EXISTS
    if (user.length > 0) {
      // UPDATE USER
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

      // CHECK USER BASE ON EMAIL
      var user_info = await sequelize.query(
        `SELECT * FROM users WHERE email = "${email}"`,
        { type: QueryTypes.SELECT }
      );

      // CREATE TOKEN FOR COOKIE BROWSER
      var user_variable = {
        id: user_info[0].id,
        name: user_info[0].name,
        email: user_info[0].email,
      };
    } else {
      // CREATE USER
      const response = await Models.users.create({
        name: name,
        email: email,
        active: 1,
      });

      // CHECK USER BASE ON ID AFTER CREATE
      var user_info = await sequelize.query(
        `SELECT * FROM users WHERE id = "${response.id}"`,
        { type: QueryTypes.SELECT }
      );

      // CREATE TOKEN FOR COOKIE BROWSER
      var user_variable = {
        id: user_info[0].id,
        name: user_info[0].name,
        email: user_info[0].email,
      };
    }

    const token_cookie = jwt.sign(user_variable, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // UPDATE TOKEN USER AND COUNT LOGIN
    await Models.users.update(
      {
        token: token_cookie,
        count_login: user_info[0].count_login + 1,
      },
      {
        where: {
          email: email,
        },
      }
    );

    // SAVE TOKEN TO SESSION TABLE
    await Models.sessions.create({
      user_id: user_info[0].id,
      token: token_cookie,
    });

    return res.status(200).json({
      msg: "Signup by google successfully",
      data: user_variable,
      token: token_cookie,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

exports.signUpByFacebook = async (req, res) => {
  try {
    // REQUEST BODY
    const { name, email } = req.body;

    // CHECK ERROR FROM GOOGLE API BASE ON PAYLOAD AVAILABLE OR NOT
    if (!name || !email) {
      return res.status(422).json({
        msg: "Sign In by google failed",
      });
    }

    // CHECK USER BASE ON EMAIL
    const user = await sequelize.query(
      `SELECT * FROM users WHERE email = "${email}"`,
      { type: QueryTypes.SELECT }
    );

    // CHECK USER EXISTS
    if (user.length > 0) {
      // UPDATE USER
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

      // CHECK USER BASE ON EMAIL
      var user_info = await sequelize.query(
        `SELECT * FROM users WHERE email = "${email}"`,
        { type: QueryTypes.SELECT }
      );

      // CREATE TOKEN FOR COOKIE BROWSER
      var user_variable = {
        id: user_info[0].id,
        name: user_info[0].name,
        email: user_info[0].email,
      };
    } else {
      // CREATE USER
      const response = await Models.users.create({
        name: name,
        email: email,
        active: 1,
      });

      // CHECK USER BASE ON ID AFTER CREATE
      var user_info = await sequelize.query(
        `SELECT * FROM users WHERE id = "${response.id}"`,
        { type: QueryTypes.SELECT }
      );

      // CREATE TOKEN FOR COOKIE BROWSER
      var user_variable = {
        id: user_info[0].id,
        name: user_info[0].name,
        email: user_info[0].email,
      };
    }

    const token_cookie = jwt.sign(user_variable, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // UPDATE TOKEN USER AND COUNT LOGIN
    await Models.users.update(
      {
        token: token_cookie,
        count_login: user_info[0].count_login + 1,
      },
      {
        where: {
          email: email,
        },
      }
    );

    // SAVE TOKEN TO SESSION TABLE
    await Models.sessions.create({
      user_id: user_info[0].id,
      token: token_cookie,
    });

    return res.status(200).json({
      msg: "Signup by facebook successfully",
      data: user_variable,
      token: token_cookie,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

exports.verificationEmail = async (req, res) => {
  try {
    // VERIFY TOKEN
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    var user = await sequelize.query(
      `SELECT * FROM users WHERE id = '${decoded.user_id}'`,
      { type: QueryTypes.SELECT }
    );

    // CHECK INVALID TOKEN
    if (!user) {
      return res.status(400).json({ error: "Invalid token" });
    }

    // UPDATE USER ACTIVE
    await Models.users.update(
      {
        active: 1,
      },
      {
        where: {
          id: user[0].id,
        },
      }
    );

    // CREATE TOKEN FOR COOKIE BROWSER
    const user_variable = {
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
    };
    const token_cookie = jwt.sign(user_variable, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // UPDATE TOKEN USER AND COUNT LOGIN
    await Models.users.update(
      {
        token: token_cookie,
        count_login: user[0].count_login + 1,
      },
      {
        where: {
          id: user[0].id,
        },
      }
    );

    // SAVE TOKEN TO SESSION TABLE
    await Models.sessions.create({
      user_id: user[0].id,
      token: token_cookie,
    });

    return res.status(200).json({
      msg: "Email verified successfully",
      data: user_variable,
      token: token_cookie,
    });
  } catch (error) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }
};

exports.signOut = async (req, res) => {
  try {
    const { email } = req.params;

    // UPDATE COUNT LOGIN AND LAST LOGOUT TIME
    await Models.users.update(
      {
        time_logout: new Date(),
      },
      {
        where: {
          email: email,
        },
      }
    );

    // RESPONSE
    return res.status(200).json({
      msg: "Logout successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
