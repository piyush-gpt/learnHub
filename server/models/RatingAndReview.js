const mongoose = require( "mongoose");

const ratingandreview=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        trim:true,
        required:true
    },
    course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},

})

exports. RatingAndReview =mongoose.model("RatingAndReview",ratingandreview);