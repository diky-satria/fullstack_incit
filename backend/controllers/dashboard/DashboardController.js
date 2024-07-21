const { sequelize } = require("../../models/index.js");
const { QueryTypes } = require("sequelize");

exports.dashboard = async (req, res) => {
  try {
    // TOTAL USER SIGNUP
    const total_user = await sequelize.query(
      `SELECT count(id) as total_user FROM users`,
      {
        type: QueryTypes.SELECT,
      }
    );

    // TOTAL USER ACTIVE SESISON TODAY
    const total_user_active_today = await sequelize.query(
      `SELECT count(*) as total from (
        SELECT user_id FROM sessions
        WHERE createdAt >= CURDATE()
        AND createdAt < DATE_ADD(CURDATE(), INTERVAL 1 DAY)
        group by user_id
      ) as sessions`,
      {
        type: QueryTypes.SELECT,
      }
    );

    // TOTAL USER ACTIVE SESISON TODAY
    const avg = await sequelize.query(
      `SELECT count(*) as total from (
        SELECT user_id, COUNT(user_id) AS active_users FROM sessions WHERE createdAt >= CURDATE() - INTERVAL 7 DAY GROUP BY user_id
      ) as sessions`,
      {
        type: QueryTypes.SELECT,
      }
    );
    const avg_user_active_last_7_days = avg[0].total / 7;

    // ALL USER
    const user = await sequelize.query(
      `SELECT id, email, count_login, time_logout, createdAt FROM users ORDER BY id DESC`,
      {
        type: QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      msg: "Success",
      total_user: total_user[0].total_user,
      data: user,
      total_user_active_today: total_user_active_today[0].total,
      avg_user_active_last_7_days: Math.round(avg_user_active_last_7_days),
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server error",
    });
  }
};
