import React, { useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "./App.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { grey } from "@material-ui/core/colors";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  link: {
    display: "block",
    width: "30vw",
    transitionDuration: "0.3s",
    height: "30vw",
    color: "#faebd7",
    textDecoration: "none",
    marginTop: "2vw",
    background: "#262625",
    fontFamily: "Roboto"
  },

  card: {
    display: "block",
    width: "30vw",
    transitionDuration: "0.3s",
    height: "30vw",
    color: "#faebd7",
    textDecoration: "none",
    marginTop: "2vw",
    background:
      "#262625 linear-gradient(225deg, #4287f5 9px, rgba(0,0,0,0.000) 0)",
    padding: "0vw",
    fontFamily: "Roboto"
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

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      page: 1
    };

    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const page = this.state.page;
    const url = `https://jsonplaceholder.typicode.com/posts/?_page=${page}&_limit=9"`;

    setTimeout(() => {
      fetch(url)
        .then(res => res.json())
        .then(json => {
          this.setState({
            items: this.state.items.concat(json),
            page: this.state.page + 1,
            isLoaded: true
          });
        });
    }, 1500);
  };

  render() {
    const { classes } = this.props;

    if (this.state.isLoaded) {
      return (
        <React.Fragment>
          <style>{"body { background-color: #222831; }"}</style>
          <InfiniteScroll
            dataLength={this.state.items.length}
            next={this.loadData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            <GridList cols={3}>
              {this.state.items.map((i, index) => {
                return (
                  <GridListTile className={classes.paper} xs>
                    <Card className={classes.card} variant="outlined">
                      <CardHeader>
                        <p>{i.title}</p>
                      </CardHeader>
                      <CardContent
                        styles={{
                          textColor: "#faebd7",
                          fontFamily: "-apple-system"
                        }}
                      >
                        <p>{i.body}</p>
                      </CardContent>
                    </Card>
                  </GridListTile>
                );
              })}
            </GridList>
          </InfiniteScroll>
        </React.Fragment>
      );
    } else {
      return <h4>Loading...</h4>;
    }
  }
}

Posts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Posts);
