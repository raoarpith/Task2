import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "./App.css";
import { render } from "@testing-library/react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { ListItem } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },

  formDiv: {
    paddingTop: 1000
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },

  grid: {
    marginLeft: 100,
    marginRight: 100
  }
}));

class ToDo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskList: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
  }

  render() {
    const classes = this.props;

    const List = this.state.taskList.map((task, index) => {
      return (
        <React.Fragment>
          <Grid item xs={6}>
            <li key={index}>{task}</li>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={(event, index) => this.deleteButton(event, index)}
              variant="contained"
              color="secondary"
            >
              Delete To-do
            </Button>
          </Grid>
        </React.Fragment>
      );
    });

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                name="newToDo"
                id="standard-full-width"
                style={{ marginLeft: 15, marginRight: 15 }}
                placeholder="Add to-do here"
                helperText="self-explanatory"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6}>
              <h1>
                <Button variant="contained" type="submit" color="primary">
                  Add to-do
                </Button>
              </h1>
            </Grid>
          </Grid>
        </form>

        <Grid container spacing={3}>
          {List}
        </Grid>
      </React.Fragment>
    );
  }
  handleSubmit(e) {
    e.preventDefault();
    const taskDesc = e.target.elements.newToDo.value;
    if (taskDesc.length > 0) {
      this.setState({
        taskList: this.state.taskList.concat([taskDesc])
      });
      e.target.reset();
    }
  }

  deleteButton = (event, index) => {
    let taskArray = [...this.state.taskList];
    taskArray.splice(index, 1);
    this.setState({ taskList: taskArray });
  };
}

export default withStyles(useStyles)(ToDo);
