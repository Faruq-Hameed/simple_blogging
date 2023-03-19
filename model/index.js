const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    }]
},
    { timestamps: true }

);

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    body: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: true
    }]
},
    { timestamps: true }
)

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    },
    body: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)


const User = mongoose.model("User", userSchema);
const Blog = mongoose.model("Blog", blogSchema);
const Comment = mongoose.model("Comment", commentSchema);



module.exports = { User, Blog, Comment }
