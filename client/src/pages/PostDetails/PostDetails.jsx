import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSinglePostByIdAsync,
  postDetailsSelector,
} from "../../features/posts/postSlice";
import useStyles from "./styles";
import { useHistory, useParams } from "react-router-dom";

const PostDetails = () => {
  const classes = useStyles();
  const { postId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const post = useSelector(postDetailsSelector);

  useEffect(() => {
    dispatch(getSinglePostByIdAsync({ id: postId, history }));
  }, [dispatch, history, postId]);

  if (!post)
    return (
      <div style={{ margin: "5rem auto" }}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress color="secondary" />
        </Box>
      </div>
    );

  return (
    <Grid
      container
      className={classes.gridContainer}
      justifyContent="space-around"
    >
      <Grid item className={classes.postDetails} md={6}>
        <Typography
          className={classes.postTitle}
          gutterBottom
          component="h3"
          variant="h1"
        >
          {post.title}
        </Typography>
        <div className={classes.postTags}>
          {post.tags.map((tag, index) => (
            <Link className={classes.postTag} component="button" key={index}>
              {`#${tag} `}
            </Link>
          ))}
        </div>
        <div className={classes.postMessage}>
          <Typography
            className={classes.postMessageText}
            gutterBottom
            variant="body2"
            component="p"
          >
            {post.message}
          </Typography>
        </div>
        <Divider />
        <div className={classes.postCreator}>
          <Typography component="h5" variant="h6">
            Created By:{" "}
            <span className={classes.postCreatorText}>{post.creatorName}</span>
          </Typography>
        </div>
        <div className={classes.postComments}>Comments...</div>
      </Grid>
      <Grid item className={classes.postImage} md={4}>
        <img src={post.selectedFile} alt={post.title} />
      </Grid>
    </Grid>
  );
};

export default PostDetails;
