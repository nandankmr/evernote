import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTages } from "../helpers";
import { ListItem } from "@material-ui/core";

class SidebarItemComponent extends React.Component {
  render() {
    const { _index, _note, classes, selectedNoteIndex } = this.props;
    return (
      <div>
        <ListItem
          className={classes.listItem}
          selected={_index === selectedNoteIndex}
          alignItems="flex-start"
        >
          <div
            className={classes.textSection}
            onClick={() => this.selectNote(_note, _index)}
          >
            <ListItemText
              primary={_note.title}
              secondary={removeHTMLTages(_note.body).substring(0, 30) + "..."}
            ></ListItemText>
          </div>
          <DeleteIcon
            onClick={() => this.deleteNote(_note, _index)}
            className={classes.deleteIcon}
          />
        </ListItem>
      </div>
    );
  }

  selectNote = (n, i) => {
    this.props.selectNote(n, i);
  };
  deleteNote = (n, i) => {
    if (window.confirm(`Are you sure you want to delete ${n.title}?`))
      this.props.deleteNote(n, i);
  };
}

export default withStyles(styles)(SidebarItemComponent);
