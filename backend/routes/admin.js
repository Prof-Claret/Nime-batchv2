import express from "express";
import Anime from "../models/Anime.js";
import Episode from "../models/Episode.js";
import auth from "../middleware/auth.js";
import { body } from "express-validator";
import validate from "../middleware/validateInput.js";

const router = express.Router();

// create anime (validate)
router.post("/anime",
  auth,
  body('title').isString().isLength({ min: 1 }),
  body('slug').optional().isString(),
  body('coverUrl').optional().isURL(),
  body('genres').optional().isArray(),
  body('status').optional().isString(),
  body('synopsis').optional().isString(),
  validate,
  async (req, res) => {
    const { title, slug, coverUrl, genres, status, synopsis } = req.body;
    const anime = new Anime({ title, slug, coverUrl, genres, status, synopsis });
    await anime.save();
    res.json(anime);
  }
);

// add episode (validate)
router.post("/anime/:id/episode",
  auth,
  body('episodeNumber').isNumeric(),
  body('title').optional().isString(),
  body('downloadLinks').isArray(),
  validate,
  async (req, res) => {
    const { episodeNumber, title, downloadLinks } = req.body;
    const ep = new Episode({ anime: req.params.id, episodeNumber, title, downloadLinks, uploadedBy: req.user.id });
    await ep.save();
    await Anime.findByIdAndUpdate(req.params.id, { $push: { episodes: ep._id } });
    res.json(ep);
  }
);

export default router;
