import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { allPostsSelector } from "../../features/posts/postSlice";
import Post from "./Post/Post";

const useStyles = makeStyles((theme) => ({
  postsContainer: {
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2),
    },
  },
}));

const Posts = () => {
  const classes = useStyles();
  const posts = useSelector(allPostsSelector);

  return (
    <>
      <Grid className={classes.postsContainer} container spacing={3}>
        {posts.map((post) => (
          <Grid item key={post._id} xs={12} md={6} lg={4} m-x="auto">
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Posts;
