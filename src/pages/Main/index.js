import React, { useState, useEffect } from "react";
import "./main.css";
import Sidebar from "../../components/Sidebar";
import mainImg from "../../image/image-removebg-preview 1.svg";
import vector from "../../image/Vector (1).svg";
import notVector from "../../image/notvector.svg";
import backarrow from "../../image/backarrow.png";

const Main = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [pocketNotes, setPocketNotes] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showEmptyHome, setShowEmptyHome] = useState(false);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    if (window.innerWidth < 768) {
      setIsSmallScreen(true);
      setShowEmptyHome(true);
    }
  };

  useEffect(() => {
    if (isSmallScreen) {
      document.querySelector(".main_emptyhome_div").style.display =
        showEmptyHome ? "flex" : "none";
      document.querySelector(".main_navbar_div").style.display = showEmptyHome
        ? "none"
        : "block";
      document.querySelector(".main_emptyhome_div").style.width = "100%";
    } else {
      document.querySelector(".main_emptyhome_div").style.display = "flex";
      document.querySelector(".main_navbar_div").style.display = "block";
    }
  }, [isSmallScreen, showEmptyHome]);

  useEffect(() => {
    const storedNotes = localStorage.getItem("pocketNotes");
    if (storedNotes) {
      setPocketNotes(JSON.parse(storedNotes));
    }
  }, []);

  const handleBack = () => {
    setShowEmptyHome(false);
    setSelectedNote(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newContent.trim() !== "" && selectedNote) {
      const currentDate = new Date();
      const timestamp = currentDate.toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      const updatedContent = [
        ...selectedNote.content,
        { text: newContent, timestamp: timestamp },
      ];
      const updatedNote = { ...selectedNote, content: updatedContent };
      const updatedNotes = pocketNotes.map((note) =>
        note.title === selectedNote.title ? updatedNote : note
      );

      localStorage.setItem("pocketNotes", JSON.stringify(updatedNotes));

      setPocketNotes(updatedNotes);
      setSelectedNote(updatedNote);
      setNewContent("");
    }
  };

  return (
    <div className="main_div">
      <div className="main_navbar_div">
        <Sidebar
          pocketNotes={pocketNotes}
          handleNoteClick={handleNoteClick}
          setPocketNotes={setPocketNotes}
        />
      </div>
      <div className="main_emptyhome_div">
        {selectedNote ? (
          <>
            <div className="side_content_main_di">
              {isSmallScreen && (
                <h1 className="arrow" onClick={handleBack}>
                  <img src={backarrow} alt="..." />
                </h1>
              )}
              <div
                className="side_content_img_div"
                style={{ backgroundColor: selectedNote.bgclr }}
              >
                <h1 className="ab">
                  {selectedNote.title.slice(0, 2).toUpperCase()}
                </h1>
              </div>
              <div className="side_content_text_div">
                <h1 className="side_content_text">{selectedNote.title}</h1>
              </div>
            </div>
            {selectedNote.content.length > 1 && (
              <ul>
                {selectedNote.content.map((item, index) => (
                  <div className="single_note" key={index}>
                    <li>{item.text}</li>
                    <div style={{ paddingTop: "10px", textAlign: "right" }}>
                      {item.timestamp}
                    </div>
                  </div>
                ))}
              </ul>
            )}
            <div className="add_new_div">
              <form onSubmit={handleSubmit}>
                <div style={{ position: "relative" }}>
                  <textarea
                    type="text"
                    placeholder="Enter Text Here..."
                    className="inputarea"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                  />
                  <button
                    type="submit"
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "5px",
                      transform: "translateY(180%)",
                      backgroundColor: "transparent",
                      border: "none",
                      padding: "5px",
                      cursor: "pointer",
                    }}
                    disabled={newContent.length < 1}
                  >
                    <img
                      src={newContent.length < 1 ? notVector : vector}
                      alt="Send"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <>
            <img src={mainImg} alt="..." />
            <h3 className="main_img_title">Pocket Notes</h3>
            <p className="main_img_content">
              Send and receive messages without keeping your phone online. Use
              Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
