const { Router } = require("express");
const {postReviewPetHandler, getAllReviewPetHandler, getReviewsPetHandler} = require("../Handlers/reviewAndComentsPetHnadle/reviewAndComentsPetHnadle");

const routerReviewPet = Router();

routerReviewPet.get("/allReview/:id", getAllReviewPetHandler);

routerReviewPet.get("/Review/:identificacion", getReviewsPetHandler)

routerReviewPet.post("/newReview", postReviewPetHandler);



module.exports = routerReviewPet ;