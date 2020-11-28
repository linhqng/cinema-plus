const express = require("express");
const auth = require("../middlewares/auth");
const mail = require("../utils/mail");

const router = new express.Router();

const createMailOptions = (data) => {
  const { to, host, movie, date, time, cinema, link } = data;

  const htmlContent = `
                <h1><strong>Reservation For Your Movie</strong></h1>
                <p>Hi ${host}, Thank you for your booking, this is your reservation </p>
                <p>Movie name: ${movie}</p>
                <p>Date: ${date}</p>
                <p>Time: ${time}</p>
                <p>Cinema name: ${cinema}</p>
                <p>Checkin: ${link}</p>
                <br/>
              `;
  return {
    from: "nguyenquanglinh17cntt2@gmail.com",
    to: to,
    subject: "Cinema + Invitation",
    html: htmlContent,
  };
};

// Send Invitation Emails
router.post("/", async (req, res) => {
  const confirmData = req.body;
  const mailOptions = createMailOptions(confirmData);
  return mail
    .sendEMail(mailOptions)
    .then(() => ({
      success: true,
      msg: `The Invitation to ${mailOptions.to} was sent!`,
    }))
    .then((result) => res.send(result))
    .catch((exception) => ({ success: false, msg: exception }));
});
module.exports = router;
