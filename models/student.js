var mongoose=require("mongoose");
var campgroundSchema = new mongoose.Schema({
	name:String,
	image:String,
	description:String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	},
	branch :String,
	roll :Number,
	username :String,
	mobile :Number,
	mark1 :Number,
	mark2 :Number,
	mark3 :Number,
	bio:String,
	github :String,
	facebook: String,
	sports :String,
	cultural :String,
	club:String,
	marks:Number,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment" //Name of model
		}
	]
});
 
module.exports= mongoose.model("Campground",campgroundSchema);
