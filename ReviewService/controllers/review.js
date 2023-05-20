import Review from "../models/review.js";

const reviewController = {
	createReview: async (req, res) => {
		try {
			console.log(req.body.cartItems);
			const { rating, discription } = req.body;
			if (!rating || !discription)
				return res
					.status(400)
					.json({ msg: "Please fill in all fields." });

			const newReview = new Review({
				rating,
				discription,
			});
			console.log(newReview);
			await newReview.save();
			console.log(req.body);
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},

	getReviews: async (req, res) => {
		try {
			const reviews = await Review.find();
			res.json({ message: "Review fetch success", data: reviews });
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},

	getOneReview: async (req, res) => {
		const id = req.params.id;
		try {
			const review = await Review.findOne({ _id: id });
			res.json({ message: "Review fetch success", data: review });
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},

	updateReview: async (req, res) => {
		try {
			const id = req.params.id;
			const { rating, discription } = req.body;

			await Review.findOneAndUpdate(
				{ _id: id },
				{ rating, discription },
			);
			res.json({
				message: "Review update success",
				data: { rating, discription },
			});
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},

	deleteReview: async (req, res) => {
		try {
			const id = req.params.id;

			await Review.findByIdAndDelete({ _id: id });
			res.json({ message: "delete success !" });
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},
};
export default reviewController;
