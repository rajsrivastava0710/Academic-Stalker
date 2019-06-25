var express=require("express");
var router = express.Router();
var passport=require("passport");
var User=require("../models/user")

router.get("/",function(req,res){
	res.render("landing");
});


//Auth

//Auth Routes
//REGISTER
router.get("/register",function(req,res){
	res.render("register");
});

router.post("/register",function(req,res){
	var newUser = new User({ username : req.body.username});
	User.register(newUser, req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/academics");
		});
	});
});

//lOGIN

router.get("/login",function(req,res){
	res.render("login");
})

//using middleware
router.post("/login",passport.authenticate("local",
	{
		successRedirect: "/academics",
		failureRedirect: "/login"
	}), function(req,res){
});

//logout

router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/academics");
});

//middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;