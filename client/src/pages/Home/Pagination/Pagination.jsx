import React from "react";
import useStyles from "./styles";
import Pagination from "@material-ui/lab/Pagination";
import { Paper } from "@material-ui/core";
import {
  getAllPostsAsync,
  totalNumberPagesSelector,
} from "../../../features/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

export default function PaginationControlled({ page }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const totalPages = useSelector(totalNumberPagesSelector);
  const history = useHistory();

  const handleChange = (event, page) => {
    dispatch(getAllPostsAsync({ page, history }));
  };

  return (
    <Paper className={classes.root}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
      />
    </Paper>
  );
}
