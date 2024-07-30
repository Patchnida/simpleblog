

import connectToDb from '../mongoDB';
import { Post } from '@/models/post.model';
import { User } from '@/models/user.model';

export const getPosts = async (req, res) => {
  try {
    await connectToDb()
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};

export const getPost = async (slug) => {
  try {
    await connectToDb();
    const post = await Post.findOne({ slug });
    return post;
  } catch (err) {
    console.log(err);
    // throw new Error("Failed to fetch post!");
  }
};

export const getUser = async (id) => {
  noStore ()
  try {
    await connectToDb();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    // throw new Error("Failed to fetch user!");
  }
};

export const getUsers = async () => {
  try {
    await connectToDb();
    const users = await User.find();
    return users;
  } catch (err) {
    console.log(err);
    // throw new Error("Failed to fetch users!");
  }
};