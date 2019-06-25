var express    =require("express"),
    methodOverride  =require("method-override"),
    bodyParser =require("body-parser"),
    mongoose   =require("mongoose"),
    cookieParser = require("cookie-parser"),
    session=     require("express-session"),
    Campground =require("./models/student"),
    Comment    =require("./models/comment"),
    User       =require("./models/user"),
 	passport   =require("passport"),
    LocalStrategy=require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose"),
    seedDB     =require("./seeds"),
    app        =express();

//Requiring routes
var commentRoutes    = require("./routes/comments");
var campgroundRoutes = require("./routes/students");
var indexRoutes      = require("./routes/index");
mongoose.connect("mongodb://localhost/miniproject",{useNewUrlParser:true});

app.use(methodOverride("_method"));

// app.use( bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");

app.locals.moment = require('moment');
// seedDB();

app.use(cookieParser('secret'));

//Passport Auth:

app.use(require("express-session")({
    secret:"secret",
    resave: false ,
    saveUninitialized: false
}));


// app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
 passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

//middleware and the fn provided will be called for every route
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	next();
});
//whatever in res.locals is whats available in our template


app.use("/academics/:id/comments",commentRoutes);
app.use("/academics" , campgroundRoutes);
app.use("/",indexRoutes);


//........//





app.listen(3000,function(){
	
	console.log("The server has started");
});