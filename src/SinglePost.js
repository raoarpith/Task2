import React, { useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "./App.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { grey } from "@material-ui/core/colors";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import InfiniteScroll from "react-infinite-scroll-component";
import Posts from "./Posts";
import { render } from "@testing-library/react";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  card: {
    display: "block",
    width: "30vw",
    transitionDuration: "0.3s",
    height: "45vw",
    color: "#faebd7",
    marginBottom: "1000vw",
    textDecoration: "none",
    background: "#f5f5f5"
  },
  root: {
    flexGrow: 1
  },
  paper: {
    height: "100%",
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class SinglePost extends React.Component {
  constructor(props) {
    super(props);

    const reqDet = props.match;
    this.state = {
      id: reqDet.params.id,
      posts: JSON,
      comments: []
    };
  }

  componentDidMount() {
    const postId = this.state.id;
    const urlPostsDetails = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    const urlComments = `https://jsonplaceholder.typicode.com/comments?postId=${postId}&_limit=20`;

    fetch(urlPostsDetails)
      .then(res => res.json())
      .then(json => {
        this.setState({
          posts: json
        });
      });

    fetch(urlComments)
      .then(res => res.json())
      .then(json => {
        this.setState({
          comments: json
        });
      });
  }

  render() {
    const commentList = this.state.comments.map((i, index) => {
      return <li>{i.body}</li>;
    });

    return (
      <React.Fragment>
        <Grid container justify="left">
          <Grid item xs={10}>
            <Typography variant="h4">
              <b>{this.state.posts.title}</b>
            </Typography>

            <Typography variant="p">{this.state.posts.body}</Typography>
            <h3>Comments:</h3>
            <ul>{commentList}</ul>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

SinglePost.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SinglePost);
