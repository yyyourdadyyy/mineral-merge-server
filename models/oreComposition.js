import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
    {
        username: { type: String },
        title: { type: String, required: true },
        text: { type: String, required: true },
        imgUrl: { type: String, default: '' },
        views: { type: Number, default: 0 },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    },
    { timestamps: true },
)
export default mongoose.model('Post', PostSchema)
// import mongoose from "mongoose";

// const CompositionSchema = new mongoose.Schema({
//     place: {
//         type: Number,
//         required: true
//       },
//       percentage: {
//         type: Number,
//         required: true
//       }

// },
// {timestamps: true}
// )
// export default mongoose.model('createOreComp', CompositionSchema);