import useStyles from "./styles";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Link,
  Typography,
} from "@material-ui/core";
import { ThumbUpAltOutlined, EditOutlined } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  deletePostAsync,
  getSinglePostByIdAsync,
  likePostAsync,
  setCurrentPostId,
} from "../../../features/posts/postSlice";

const Post = ({ post }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const editHandler = () => {
    dispatch(setCurrentPostId(post._id));
  };

  const deleteHandler = () => {
    dispatch(deletePostAsync(post._id));
  };

  const handleLikePost = () => {
    dispatch(likePostAsync(post._id));
  };

  const openPostDetailsPage = () => {
    dispatch(getSinglePostByIdAsync({ id: post._id, history }));
  };

  return (
    <Card className={classes.card} raised>
      <CardActionArea onClick={openPostDetailsPage}>
        <CardMedia
          component="img"
          alt={post.title}
          height="300"
          image={post.selectedFile}
          title="Contemplative Reptile"
        ></CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h1">
            {post.creatorName}
          </Typography>
          <Divider />
          <Typography gutterBottom variant="body1" component="h2">
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message.split(" ").splice(0, 20).join(" ")}...
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={handleLikePost}
          startIcon={<ThumbUpAltOutlined />}
          size="small"
          color="primary"
        >
          {post.likes.length}
        </Button>
        <Button onClick={deleteHandler} size="small" color="primary">
          Delete
        </Button>
        <Button
          size="small"
          className={classes.editButton}
          onClick={editHandler}
        >
          <EditOutlined color="action" />
        </Button>
      </CardActions>
      <div className={classes.cardFooter}>
        {/* <hr /> */}
        {post.tags.map((tag, index) => (
          <Link
            component="button"
            variant="body2"
            key={index}
            className={classes.cardFooterTags}
          >{`#${tag} `}</Link>
        ))}
      </div>
    </Card>
  );
};

export default Post;
