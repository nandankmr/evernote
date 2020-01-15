import React from "react";
import ReactQuill from "react-quill";
import debounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { TextField } from "@material-ui/core";

class EditorComponent extends React.Component {
  // state = {
  //   title: this.props.selectedNote.title,
  //   text: this.props.selectedNote.body
  // };

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
    width:'70vw'
  };

  updateTitle = async val => {
    this.props.updateTitle(val);
  };

  updateBody = async val => {
    // await this.setState({ text: val });
    this.props.updateBody(val);
    this.update();
  };

  update = debounce(() => {
    // console.log(this.state.text);

    //todo
  }, 1500);
}

export default withStyles(styles)(EditorComponent);
