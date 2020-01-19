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

const styles = theme => ({
  card: {
    minWidth: 275
  },
  root: {
    flexGrow: 1
  },
  paper: {
    height: "100%",
    padding: theme.spacing(10),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      page: 1
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const page = this.state.page;
    const url = `https://jsonplaceholder.typicode.com/photos/?_page=${page}&_limit=9`;
    setTimeout(() => {
      fetch(url)
        .then(res => res.json())
        .then(json => {
          this.setState({
            isLoaded: true,
            items: this.state.items.concat(json),
            page: page + 1
          });
        });
    }, 1500);
  };

  render() {
    const { classes } = this.props;

    const blog = this.state.items;

    if (this.state.isLoaded) {
      return (
        <React.Fragment>
          <InfiniteScroll
            dataLength={this.state.items.length}
            next={this.loadData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            <GridList cols={3}>
              {blog.map(blog => {
                return (
                  <GridListTile
                    variant="outlined"
                    className={classes.paper}
                    key={blog.id}
                    xs
                  >
                    <img
                      src={blog.thumbnailUrl}
                      alt=""
                      key={blog.id}
                      number={blog.id}
                    >
                      {blog.body}
                    </img>
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

Images.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Images);
