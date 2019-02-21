var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res) {
 // get data from form and add to campgrounds 
    req.body.campground.author = {
        id: req.user._id,
        username: req.user.username
    };
    Campground.create(req.body.campground, function(err, newlyCreated) {
        if(err) {
            res.redirect("/campgrounds/new");
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }  
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new") 
});

router.get("/:id", function(req, res) {
 //find campground with provided ID
 Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
     if(err) {
         req.flash("error", "Campground not found!");
         res.redirect("/campgrounds");
     } else {
        res.render("campgrounds/show", {campground: foundCampground});
     }
 });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", {campground: foundCampground});   
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp) {
        if(err) {
            res.flash("error", err.message);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE CAMPGROUND

router.delete("/:id", middleware.checkCampgroundOwnership,function(req, res) {
    Campground.findByIdAndDelete(req.params.id, function(err, removedCamp) {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            Comment.deleteMany( {_id: { $in: removedCamp.comments } } , function(err) {
                if(err) {
                    console.log(err);
                } else {
                    req.flash("success", "Campground deleted!")
                    res.redirect("/campgrounds");
                }
            });
        }
    });
});



module.exports = router;