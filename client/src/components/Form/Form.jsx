import useStyles from "./styles";
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import FileBase from "react-file-base64";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPostAsync,
  editPostAsync,
  allPostsSelector,
  setCurrentPostId,
} from "../../features/posts/postSlice";
import ChipInput from "material-ui-chip-input";
import { userSelector } from "../../features/auth/authSlice";

const Form = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const currentPostId = useSelector((state) => state.posts.currentPostId);
  const posts = useSelector(allPostsSelector);

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });

  const handleChangeInput = (e) => {
    setPostData((postData) => ({
      ...postData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddTags = (tag) => {
    console.log(tag);
    setPostData((postData) => ({ ...postData, tags: [...postData.tags, tag] }));
  };

  const handleDeleteTags = (tag) => {
    setPostData((postData) => ({
      ...postData,
      tags: postData.tags.filter((item) => item !== tag),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentPostId) {
      dispatch(editPostAsync({ currentPostId, postData }));
      console.log(postData);
    } else {
      dispatch(
        createPostAsync({
          ...postData,
          creatorName: `${user.firstName} ${user.lastName}`,
        })
      );
    }

    clearForm();
  };

  const clearForm = () => {
    setPostData({
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };

  const cancelEdit = () => {
    dispatch(setCurrentPostId(null));
  };

  useEffect(() => {
    currentPostId
      ? setPostData(posts.find((post) => post._id === currentPostId))
      : clearForm();
  }, [currentPostId, posts]);

  if (!user) {
    return (
      <Paper className={classes.pleaseLogin}>
        <Typography variant="h6" component="h3">
          Please Login to create posts, like, and comment!!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={6}>
      <form className={`${classes.form} ${classes.root}`}>
        {currentPostId ? (
          <Box display="flex" justifyContent="space-between">
            <Typography color="textSecondary" variant="h6">
              "Editing Your Post"
            </Typography>
            <IconButton onClick={cancelEdit} size="small" color="secondary">
              <Clear />
            </IconButton>
          </Box>
        ) : (
          <Typography color="textPrimary" variant="h6">
            "Create Your Post"
          </Typography>
        )}
        <TextField
          autoComplete="off"
          size="small"
          fullWidth
          onChange={handleChangeInput}
          name="title"
          variant="outlined"
          label="Title"
          value={postData.title}
        />
        <TextField
          autoComplete="off"
          size="small"
          fullWidth
          onChange={handleChangeInput}
          name="message"
          variant="outlined"
          rows={4}
          multiline
          label="Message"
          value={postData.message}
        />
        <ChipInput
          fullWidth
          variant="outlined"
          size="small"
          label="Add Tags"
          value={postData.tags}
          onAdd={(tag) => handleAddTags(tag)}
          onDelete={(tag) => handleDeleteTags(tag)}
        />
        <div className={classes.fileInput}>
          <Typography color="secondary" variant="subtitle2" gutterBottom>
            Add image for your post !!
          </Typography>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <div className={classes.buttonGroup}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            variant="text"
            size="small"
            color="primary"
            onClick={clearForm}
          >
            Clear form
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default Form;
