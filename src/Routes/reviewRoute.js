const { Router } = require("express");
const {  getReviewsAlojamientoHandler, postReviewHandler, getAllReviewHousingHandler} = require("../Handlers/reviewAndComents/reviewAndComentsHandler");

const routerReview = Router();

routerReview.get("/allReview/:id", getReviewsAlojamientoHandler);


routerReview.get("/allReviewHousing/:idAlojamiento", getAllReviewHousingHandler);


routerReview.post("/newReview", postReviewHandler);



module.exports = routerReview ;