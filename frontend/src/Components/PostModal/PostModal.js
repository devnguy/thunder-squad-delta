import React, { useState } from "react";
import Button from "../Button";
import CustomInputField from "../CustomInputField";
import "./PostModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../Dropdown/Dropdown";

const conditions = ["Great", "Good", "Fair", "Poor"];

const PostModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [ISBN, setISBN] = useState("");
  const [condition, setCondition] = useState("Select");
  const [points, setPoints] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div id="postModalBody">
      <div id="postBookHeaderContainer">
        <p id="postBookHeader">Post Book</p>
        <div id="closeModalIcon">
          <FontAwesomeIcon
            icon={faTimesCircle}
            size="2x"
            color="#000000"
            onClick={onClose}
          />
        </div>
      </div>
      <div id="postBookFieldsContainer">
        <div id="upperFieldsContainer">
          <CustomInputField
            name="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <CustomInputField
            name="Author"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
          <p id="or">OR</p>
          <CustomInputField
            name="ISBN"
            onChange={(e) => setISBN(e.target.value)}
            value={ISBN}
          />
        </div>
        <div id="lowerFieldsContainer">
          <div id="conditionContainer">
            <div id="conditionLabelContainer">
              <p id="conditionLabel">Condition: </p>
            </div>
            <Dropdown options={conditions} title="Select" />
          </div>
          <div style={{ width: "80%", marginBottom: "3px", marginTop: "3px" }}>
            <CustomInputField
              name="Points"
              onChange={(e) => setPoints(e.target.value)}
              value={points}
            />
          </div>
        </div>
        <Button color="red">Post Book</Button>
      </div>
    </div>
  );
};

export default PostModal;
