import React, { useState, useRef, useEffect } from "react";
import "./sidebar.css";

const Sidebar = ({ pocketNotes, handleNoteClick, setPocketNotes }) => {
  const [showModal, setShowModal] = useState(false);
  const [newGroupTitle, setNewGroupTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const addNewGroup = () => {
    if (newGroupTitle.trim() !== "" && selectedColor !== "") {
      const newGroup = {
        title: newGroupTitle,
        content: [],
        bgclr: selectedColor,
      };

      // Update the component state
      const updatedPocketNotes = [...pocketNotes, newGroup];
      handleNoteClick(newGroup); // Trigger note click to display the newly added group
      // Update local storage
      localStorage.setItem("pocketNotes", JSON.stringify(updatedPocketNotes));
      // Update the component state with the new pocketNotes
      setPocketNotes(updatedPocketNotes);

      toggleModal();
    }
  };

  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  return (
    <>
      <div className="side_main_div">
        <header className="side_header">Pocket Notes</header>
        <div className="side_content">
          {pocketNotes.map((item, index) => {
            return (
              <div
                className="side_content_main_div"
                onClick={() => handleNoteClick(item)}
                key={index}
              >
                <div
                  className="side_content_img_div"
                  style={{ backgroundColor: item.bgclr }}
                >
                  <h1 className="ab">
                    {item.title?.slice(0, 2).toUpperCase()}
                  </h1>
                </div>
                <div className="side_content_text_div">
                  <h1 className="side_content_text">{item.title}</h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="side_addicon_div" onClick={toggleModal}>
        <h1
          style={{
            fontSize: "52px",
            cursor: "pointer",
          }}
          onClick={toggleModal}
        >
          +
        </h1>
      </div>
      {showModal && (
        <div className="modal" ref={modalRef}>
          <div className="modal-content">
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button className="clos" onClick={toggleModal}>
                X
              </button>
            </div>
            <h1 className="cr_nw_grp_txt">Create New group</h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1%",
              }}
            >
              <h3 className="cr_nw_grp_txt">GroupTitle</h3>
              <input
                className="ad_grp_inp"
                placeholder="Enter your title here"
                value={newGroupTitle}
                onChange={(e) => setNewGroupTitle(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                gap: "1%",
              }}
            >
              <p className="cr_nw_grp_txt">ChooseColor : </p>
              <div className="color-picker">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className={`color-circle ${
                      color === selectedColor ? "active" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  ></div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button onClick={addNewGroup} className="crt_grp">
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
