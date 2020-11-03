var express = require("express");
const {
  Create_movie,
  Upload_movie_photo,
  Get_all_movie,
  Get_movie_by_id,
  Update_movie_by_id,
  Delete_movie_by_id,
} = require("../controllers/movieController/movieController");
var router = express.Router();
var auth = require("../middlewares/auth");
const upload = require("../middlewares/multer");
/* create movie */
router.post("/", auth.enhance, Create_movie);
//upload image
router.get("/photo/:id", upload("movies").single("file"), Upload_movie_photo);
//Get all movie
router.get("/", auth.enhance, Get_all_movie);
//Get movie by id
router.get("/:id", auth.enhance, Get_movie_by_id);
//update movie by id
router.patch("/:id", auth.enhance, Update_movie_by_id);
//delete movie by id
router.delete("/:id", auth.enhance, Delete_movie_by_id);


module.exports = router;
