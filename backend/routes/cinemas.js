var express = require("express");
const {
  Create_a_cinema,
  Upload_cinema_photo,
  Get_all_cinemas,
  Get_cinema_by_id,
  Update_cinema_by_id,
  Delete_cinema_by_id,
} = require("../controllers/cinemaController/cinemaController");
const auth = require("../middlewares/auth");
var router = express.Router();

/* GET all cinemas. */
router.get("/", auth.enhance, Get_all_cinemas);
// Create a cinema
router.post("/", auth.enhance, Create_a_cinema);
//Up load photo cinemas
router.post("/photo/:id", auth.enhance, Upload_cinema_photo);
//Get_cinema_by_id
router.get("/:id", auth.enhance, Get_cinema_by_id);
//Up date cinemas by id
router.patch("/:id", auth.enhance, Update_cinema_by_id);
//delete cinema by id
router.delete("/:id", auth.enhance, Delete_cinema_by_id);
module.exports = router;
