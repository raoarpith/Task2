import React from "react";
import logo from "./logo.svg";
import Nav from "./Nav";
import Images from "./Images";
import Posts from "./Posts";
import "./App.css";
import ToDo from "./to-do";
import { BrowserRouter, Route, Link } from "react-router-dom";
import SinglePost from "./SinglePost";
import { lightBlue } from "@material-ui/core/colors";
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div style={{ backgroundColor: lightBlue }}>
        <Route path="/posts" exact component={Posts} />
        <Route path="/posts/:id" component={SinglePost} />
        <Route path="/images" component={Images} />
        <Route path="/to-do" component={ToDo} />
      </div>
    </BrowserRouter>
  );
}

export default App;
