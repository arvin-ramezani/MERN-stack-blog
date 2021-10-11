import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../components/Form/Form.jsx";
import Posts from "../../components/Posts/Posts.jsx";
import {
  getAllPostsAsync,
  getPostsBySearchAsync,
  stateStatus,
} from "../../features/posts/postSlice";
import Pagination from "./Pagination/Pagination.jsx";
import useStyles from "./styles";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();

  let urlTitle = query.get("searchQuery");
  let urlTags = query.get("tags");
  const page = Number(query.get("page")) || 1;
  const status = useSelector(stateStatus);

  const [searchedTags, setSearchedTags] = useState([]);
  const [searchedTitle, setSearchedTitle] = useState("");

  const searchTitleHandler = (e) => {
    setSearchedTitle(e.target.value);
  };

  const handleAddChip = (chip) => {
    setSearchedTags((searchedTags) => [...searchedTags, chip]);
  };

  const handleDeleteChip = (chip) => {
    setSearchedTags((searchedTags) =>
      searchedTags.filter((tag) => tag !== chip)
    );
  };

  const handleSearch = (e) => {
    (searchedTitle.trim() || searchedTags) &&
      dispatch(
        getPostsBySearchAsync({
          title: searchedTitle,
          tags: searchedTags.join(","),
          history,
        })
      );
  };

  const handleKeyPress = (e) => {
    e.keyCode === 13 && handleSearch();
  };
  console.log(urlTitle, urlTags);

  useEffect(() => {
    (!urlTags || !urlTitle) && dispatch(getAllPostsAsync({ page, history }));
  }, [dispatch, page, history, urlTags, urlTitle]);

  return (
    <Container maxWidth="lg">
      <Grid container className={classes.container} spacing={5}>
        {status === "loading" ? (
          <CircularProgress className={classes.progress} />
        ) : (
          <>
            <Grid item xs={12} sm={6} md={9}>
              <Posts />
            </Grid>
            <Grid className={classes.formContainer} item xs={12} sm={6} md={3}>
              <Paper elevation={5} className={classes.searchContainer}>
                <TextField
                  label="Search By Title"
                  variant="outlined"
                  fullWidth
                  onChange={searchTitleHandler}
                  size="small"
                />
                <ChipInput
                  value={searchedTags}
                  onAdd={handleAddChip}
                  onDelete={handleDeleteChip}
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="Search By Tags"
                />
                <Button
                  onKeyDown={handleKeyPress}
                  onClick={handleSearch}
                  variant="contained"
                  fullWidth
                  color="primary"
                  size="small"
                >
                  Search
                </Button>
              </Paper>
              <Form />
              <Pagination page={page} />
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
