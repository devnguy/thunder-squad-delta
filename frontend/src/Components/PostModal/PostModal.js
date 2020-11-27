import React from "react";
import Button from "../Button";
import CustomInputField from "../CustomInputField";
import "./PostModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const PostModal = ({ onClose }) => {
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
          <CustomInputField name="Title" />
          <CustomInputField name="Author" />
          <p id="or">OR</p>
          <CustomInputField name="ISBN" />
        </div>
        <div id="lowerFieldsContainer">
          <CustomInputField name="Condition" />
          <CustomInputField name="Points" />
        </div>
        <Button color="blue">Post Book</Button>
      </div>
    </div>
  );
};

export default PostModal;
