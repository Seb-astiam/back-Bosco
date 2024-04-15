const { Router } = require("express");
const {  getReviewsAlojamientoHandler, postReviewHandler} = require("../Handlers/reviewAndComents/reviewAndComentsHandler");

const routerReview = Router();

routerReview.get("/allReview/:id", getReviewsAlojamientoHandler);



routerReview.post("/newReview", postReviewHandler);



module.exports = routerReview ;