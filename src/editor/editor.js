import React from "react";
import ReactQuill from "react-quill";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { TextField } from "@material-ui/core";
import debounce from "../helpers";

class EditorComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      id: ""
    };
  }

  componentDidMount() {
    this.setState({
      title: this.props.selectedNote.title,
      body: this.props.selectedNote.body,
      id: this.props.selectedNote.id
    });
  }

  componentDidUpdate() {
    if (this.props.selectedNote.id !== this.state.id)
      this.setState({
        title: this.props.selectedNote.title,
        body: this.props.selectedNote.body,
        id: this.props.selectedNote.id
      });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.editorContainer}>
        <TextField
          variant="outlined"
          label="Title"
          style={this.titleStyle}
          value={this.state.title}
          onChange={e => this.updateValue(e.target.value, this.state.body)}
        />

        <ReactQuill
          value={this.state.body}
          onChange={val => this.updateValue(this.state.title, val)}
          placeholder="Start Writing"
        ></ReactQuill>
      </div>
    );
  }

  titleStyle = {
    marginTop: "1vh",
    width: "70vw"
  };

  updateValue = async (title, body) => {
    this.setState({ title, body });
    this.update();
  };

  update = debounce(() => {
    this.props.updateValue(this.state.title, this.state.body);
  }, 1500);
}

export default withStyles(styles)(EditorComponent);
