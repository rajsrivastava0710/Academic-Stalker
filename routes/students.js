var express=require("express");
var router = express.Router();
var Campground =require("../models/student");
var middleware = require("../middleware");

//INDEX-show all cg
router.get("/",function(req,res){
	// GET the campgrounds through database
	// Count number of entries in our model:
	var numuser;
Campground.countDocuments({}, function(err, count) {
    if (err) {
     return handleError(err) 
     } 
     numuser=count;
});
	Campground.find({}).sort({name: 1}).exec(function(err,allCampgrounds){
		if(err){
			console.log(err);
		}
		else{ 
			res.render("students/index",{campgrounds:allCampgrounds,numuser:numuser});
		}
	});
});

//CREATE -add new cg to db
router.post("/",middleware.isLoggedIn,function(req,res){
	// var oldname=req.body.name;
	// if(!oldname){
	// var name = oldname;
	// }else{
	// var name= oldname[0].toUpperCase()+oldname.slice(1);
	// }
	var name=req.body.name;
	var image=req.body.image;
	var description=req.body.description;
	var author={
		id: req.user._id
	};
	var bio=req.body.bio;
	var username=req.user.username;
	var roll= req.user.username;
	var mobile=req.body.mobile;
	var branch=req.body.branch;
	var mark1=req.body.mark1;
	var mark2=req.body.mark2;
	var mark3=req.body.mark3;
	var sports=req.body.sports;
	var cultural=req.body.cultural;
	var github=req.body.github;
	var facebook=req.body.facebook;
	var club=req.body.club;
	var marks=0;
	var newCampground={bio:bio,club:club,marks:marks,facebook:facebook,cultural:cultural,sports:sports,github:github,mark1:mark1,mark2:mark2,mark3:mark3,mobile:mobile,name:name,branch:branch,image:image,description:description,author:author,username:username,roll:roll};
	// campgrounds.unshift(newCampgrounds);
	//Carete new cg and sav eto db

	// console.log(req.user);
	Campground.create(newCampground,function(err,campground){
		if(err){
			console.log(err);
		}
		else{
			// console.log(campground);
			res.redirect("/academics");	
		}
	});
	
});

//NEW-show form to create new cg
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("students/new",{user: req.user.username});
});

//SHOW-shows info about particular
router.get("/:id",function(req,res){
	//find correct id
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){	
		if(err){
			console.log(err);
		}
		else{
			res.render("students/show",{campground: foundCampground});	
		}
	});
	
});

//EDIT
router.get("/:id/edit" ,middleware.checkCampgroundAuthorisation, function(req,res){
	//is user loggedin
		Campground.findById(req.params.id,function(err,foundCampground){
			res.render("students/edit",{campground:foundCampground});
		}); 	
});

//UPDATE
router.put("/:id" , middleware.checkCampgroundAuthorisation , function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err){
			consolel.log(err);
			res.redirect("/");
		}
		else{
			res.redirect("/academics/"+req.params.id);
		}

	});
});

//DELETE

router.delete("/:id" , middleware.checkCampgroundAuthorisation , function(req,res){
    //findByIdAnd Remove
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
        	console.log(err);
            res.redirect("/");
        }
        else{
            res.redirect("/academics");
        }
    });
});


module.exports = router;