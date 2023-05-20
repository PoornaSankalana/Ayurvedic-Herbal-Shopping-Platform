import { Router } from "express";
const reviewRoute = Router();
import reviewController from "../controllers/review.js";

reviewRoute.post("/api/review/create", reviewController.createReview);
reviewRoute.get("/api/review/getAll", reviewController.getReviews);
reviewRoute.get("/api/review/get/:id", reviewController.getOneReview);
reviewRoute.put("/api/review/update/:id", reviewController.updateReview);
reviewRoute.delete(
	"/api/review/delete/:id",
	reviewController.deleteReview,
);
export default reviewRoute;
