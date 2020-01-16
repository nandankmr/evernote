import React from "react";
import ReactQuill from "react-quill";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { TextField } from "@material-ui/core";

class EditorComponent extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.editorContainer}>
        <TextField
          variant="outlined"
          label="Title"
          style={this.titleStyle}
          value={this.props.selectedNote.title}
          onChange={e => this.updateTitle(e.target.value)}
        />

        <ReactQuill
          value={this.props.selectedNote.body}
          onChange={val => this.updateBody(val)}
          placeholder="Start Writing"
        ></ReactQuill>
      </div>
    );
  }

  titleStyle = {
    marginTop: "1vh",
    width: "70vw"
  };

  updateTitle = async val => {
    this.props.updateTitle(val);
  };

  updateBody = async val => {
    this.props.updateBody(val);
  };
}

export default withStyles(styles)(EditorComponent);
