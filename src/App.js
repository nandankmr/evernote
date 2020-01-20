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
      notes: [
        {
          id: "1",
          title: "Welcome to Notebook",
          body:
            "<h1>Welcome to your personal Notebook!</h1><h2>Steps for creating a note:</h2><ol><li><strong>click 'New notes' button on the top left</strong></li><li><strong>Enter note title</strong></li><li><strong>click 'Submit Note'</strong></li><li><strong>Congrats! You have created your note...</strong></li></ol><br/><h2>Start writing in the text area on the right side.</h2><h2>To delete a note, click on the delete icon of the note.</h2>"
        },
        {
          id: "2",
          title: "About",
          body:
            "<h1>About this App:</h><h2>\tThis is a web app that can be used to create notes.</h2><h2>\tEach note has a title and a body. Currently, new notes are stored in RAM because this app is not connected to a database to store the notes. </h2><p><br></p><h2><br></h2><h2>\tTechnologies used:</h2><ul><li><strong>HTML</strong></li><li><strong>CSS</strong></li><li><strong>React JS (A front end JavaScript framework)</strong></li><li><strong>Visual Studio Code (For coding)</strong></li><li><strong>Google Chrome (For testing)</strong></li></ul><br><br></p><h2>Suggested browser:- Google Chrome</h2><br><h3><strong><em><u>Disclaime</u>r:-  </em>This web app is not responsive. Use it on desktop only.</strong></h3>"
        },
        {
          id: "3",
          title: "Contact",
          body:
            "<h1>Get in Touch:</h1><p><br></p><h2>\tEmail:Nandankmrjha@gmail.com</h2>"
        }
      ]
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
    // const { notes } = this.state;
    // firebase.firestore().collection('notes').map
    // console.log(notes);
    // if (notes.length > 0 && !this.state.selectedNote)
    //   this.setState({
    //     selectedNote: notes[0],
    //     selectedNoteIndex: 0
    //   });
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
            updateValue={this.updateValue}
          />
        ) : (
          <h1 style={{ textAlign: "center", margin: "0", color: "#444" }}>
            Create a New Note to see the Contents
          </h1>
        )}
      </div>
    );
  }

  footerStyle = {};

  headerStyle = {
    backgroundColor: "#8395a7",
    color: "#182C61",
    margin: 0,
    textAlign: "center",
    padding: "0.5rem",
    marginBottom: "0.5rem",
    borderBottom: "1px solid #341f97",
    transform: "scaleX(1.5)"
  };

  updateValue = (title, body) => {
    firebase
      .firestore()
      .collection("notes")
      .doc(this.state.selectedNote.id)
      .update({ title, body });
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

    firebase
      .firestore()
      .collection("notes")
      .doc(note.id)
      .delete();
    if (this.state.notes.length > 0 && !this.state.selectedNote)
      this.setState({
        selectedNote: this.state.notes[this.state.notes.length - 1],
        selectedNoteIndex: this.state.notes.length - 1
      });
  };

  newNote = async title => {
    const note = {
      title,
      body: "",
      timeStamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    const newFromDB = await firebase
      .firestore()
      .collection("notes")
      .add(note);
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.indexOf(
      this.state.notes.filter(n => n.id === newFromDB.id)[0]
    );
    this.setState({selectedNote:this.state.notes[newNoteIndex], selectedNoteIndex:newNoteIndex})
  };

  selectNote = (n, i) => {
    this.setState({ selectedNote: n, selectedNoteIndex: i });
  };
}
export default App;
