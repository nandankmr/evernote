import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import List from "@material-ui/core/List";
import { Button, Divider } from "@material-ui/core";
import SidebarItemComponent from "../sidebaritem/sidebaritem";

class SidebarComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null
    };
  }

  render() {
    const { notes, classes, selectedNoteIndex } = this.props;

    return (
      <div className={classes.sidebarContainer}>
        <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>
          {this.state.addingNote ? "cancel" : "New Note"}
        </Button>

        {this.state.addingNote ? (
          <div>
            <input
              type="text"
              className={classes.newNoteInput}
              placeholder="Enter note title"
              onKeyUp={e => this.updateTitle(e.target.value)}
            />
            <Button className={classes.newNoteSubmitBtn} onClick={this.newNote}>
              Submit Note
            </Button>
          </div>
        ) : null}

        <List>
          {notes.map((_note, _index) => (
            <div key={_index}>
              <SidebarItemComponent
                _note={_note}
                _index={_index}
                selectedNoteIndex={selectedNoteIndex}
                selectNote={this.selectNote}
                deleteNote={this.deleteNote}
              />
              <Divider />
            </div>
          ))}
        </List>
      </div>
    );
  }

  selectNote = (n, i) => this.props.selectNote(n, i);
  deleteNote = (n,i) => this.props.deleteNote(n,i)
  newNote = () => {
    this.props.newNote(this.state.title);
    this.setState({ addingNote: !this.state.addingNote, title: null });

  };
  updateTitle = title => {
    this.setState({ title });

  };

  newNoteBtnClick = () => {
    this.setState({ addingNote: !this.state.addingNote, title: null });
    console.log("btn clicked");
  };
}

export default withStyles(styles)(SidebarComponent);
