import { Router } from 'express'
import {
    createPost,
    getAll,
    getById,
    getMyPosts,
    removePost,
    updatePost,
    getPostComments,
} from '../controllers/posts.js'
import { checkAuth } from '../utils/checkAuth.js'
const router = new Router()

// Create Post
// http://localhost:3002/api/posts
router.post('/', checkAuth, createPost)

export default router;