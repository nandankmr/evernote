import React from "react";
import Sidebar from "./sidebar/sidebar";
import EditorComponent from "./editor/editor";
import "./App.css";

const firebase = require("firebase");

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: []
    };
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(doc => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });

        this.setState({ notes });

        console.log(notes);
        if (notes.length > 0 && !this.state.selectedNote)
          this.setState({
            selectedNote: notes[notes.length - 1],
            selectedNoteIndex: notes.length - 1
          });
      });
  };

  render() {
    return (
      <div className="app-container">
        <header>
          <h1 style={this.headerStyle}>Notebook!</h1>
        </header>
        <Sidebar
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          selectNote={this.selectNote}
          newNote={this.newNote}
          deleteNote={this.deleteNote}
        />
        {this.state.selectedNote ? (
          <EditorComponent
            selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            updateBody={this.updateBody}
            updateTitle={this.updateTitle}
          />
        ) : (
          <h1 style={{ textAlign: "center", margin: "0", color: "#333" }}>
            Create a New Note to see the Contents
          </h1>
        )}
      </div>
    );
  }

  headerStyle = {
    backgroundColor: "#8395a7",
    color: "#182C61",
    margin: 0,
    textAlign: "center",
    padding: "0.5rem",
    marginBottom: "0.5rem",
    borderBottom: "1px solid #341f97"
  };

  updateTitle = title => {
    this.setState({
      notes: this.state.notes.map((note, index) => {
        if (index === this.state.selectedNoteIndex) note.title = title;
        return note;
      })
    });
  };
  deleteNote = async (note, index) => {
    if (index === this.state.selectedNoteIndex)
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    console.log(index, this.state.selectedNoteIndex);

    if (index < this.state.selectedNoteIndex) {
      await this.setState({
        selectedNoteIndex: this.state.selectedNoteIndex - 1
      });
    }

    await this.setState({
      notes: this.state.notes.filter((n, i) => i !== index)
    });

    if (this.state.notes.length > 0 && !this.state.selectedNote)
      this.setState({
        selectedNote: this.state.notes[this.state.notes.length - 1],
        selectedNoteIndex: this.state.notes.length - 1
      });
  };

  updateBody = body => {
    console.log("updated");
    this.setState({
      notes: this.state.notes.map((note, index) => {
        if (index === this.state.selectedNoteIndex) note.body = body;
        return note;
      })
    });
    // firebase.firestore()
    //   .collection("notes")
    //   .doc(this.state.selectedNote.id)
    //   .update({ title: this.state.selectedNote.title, body ,timeStamp:firebase.firestore.FieldValue.serverTimestamp()});
  };

  newNote = async title => {
    const note = {
      title,
      body: ""
    };

    await this.setState({ notes: [...this.state.notes, note] });

    this.selectNote(
      this.state.notes[this.state.notes.length - 1],
      this.state.notes.length - 1
    );
  };

  selectNote = (n, i) => {
    this.setState({ selectedNote: n, selectedNoteIndex: i });
  };
}
export default App;
