import express, { NextFunction , Request, Response} from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  editPost,
  posts,
  sleep,
} from "./fakedb";
import {protectRoute} from "./middleware";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

// TODO: Obviously use a more secure signing key than "secret"
app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", protectRoute, async (req, res) => {
  // Sleep delay goes here
  await sleep(1000);
  res.json(posts);
});


app.get("/api/posts/:id", (req, res) => {
  const id:number = Number(req.params.id);

  if(posts.length < id) {
    return res.json({message:"Incorrect Id"});
  }

  const post = posts[id - 1];
  const userData = findUserById(post.userId);
  const userName = userData.email.split("@")[0];
 
  res.json({...post,userName});
});

/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 */
app.post("/api/posts", protectRoute,  (req, res) => {

  const incomingPost = req.body;
  addPost(incomingPost);
  res.status(200).json({ success: true });
});

app.post("/api/posts/edit", (req, res) => {
  const incomingPost = req.body;
  editPost(incomingPost);
  res.status(200).json({ success: true });

})

app.listen(port, () => console.log("Server is running"));
