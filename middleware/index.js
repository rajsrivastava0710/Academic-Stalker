//all middleware
var Campground =require("../models/student");
var Comment=require("../models/comment");
var middlewareObj={};

middlewareObj.checkCommentAuthorisation = function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err){
				res.redirect("back");
			}
			else{
		//does he own the comment
		//foundComment.author.id  -this is Mongoose object
		//req.user._id   - this is string
				if(req.user.username==999 ||(foundComment && foundComment.author.id.equals(req.user._id))){
					next();
				}
				else{
					res.redirect("back");
				}
			}
		}); 
	}
	else{
		res.redirect("back");
	}
}

middlewareObj.checkCommentDeleteAuthorisation = function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCampground){
			if(err){
				res.redirect("back");
			}
			else{
				Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err){
				res.redirect("back");
			}
			else{
				if((req.user.username==999)||(foundComment.author.id.equals(req.user._id) || foundCampground.author.id.equals(req.user._id))){
					next();
				}
				else{
					res.redirect("back");
				}
			}
		});
	}
});
	}
		else{
			res.redirect("back");
		}
}
		


middlewareObj.checkCampgroundAuthorisation = function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCampground){
			if(err){
				res.redirect("back");
				console.log(err);
			}
			else{
		//does he own the cg
		//foundCampground.author.id  -this is Mongoose object
		//req.user._id   - this is string
				if((req.user.username==999)||(foundCampground.author.id.equals(req.user._id))){
					next();
				}
				else{
					res.redirect("back");
				}
			}
		}); 
	}
	else{
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


module.exports = middlewareObj;


