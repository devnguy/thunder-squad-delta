import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";

import "./PostModal.css";
import Lottie from "react-lottie";
import * as LoadingAnimation from "../../Assets/Animations/Loading.json";

import Dropdown from "../Dropdown/Dropdown";
import CustomInputField from "../CustomInputField";
import Button from "../Button";
import ThumbButton from "../ThumbButton";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";

const conditions = ["Great", "Good", "Fair", "Poor"];

const PostModal = ({ postBookVariant = false, onClose, onSubmit }) => {
  const suggestion = useApi(requests.searchGoogleBooks);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [condition, setCondition] = useState("Select");
  const [points, setPoints] = useState("");
  const [thumbsUp, setThumbsUp] = useState(false);
  const [thumbsDown, setThumbsDown] = useState(false);
  const [suggestionVisible, setSuggestionVisible] = useState(false);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [readyToReport, setReadyToReport] = useState(false);
  const [userPrompt, setUserPrompt] = useState(
    "Provide some basic information"
  );
  const searchTimerRef = useRef(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const onSelectCondition = (condition) => {
    setCondition(condition);
  };

  const searchSuggestions = () => {
    setThumbsUp(false);
    setThumbsDown(false);
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }
    searchTimerRef.current = setTimeout(() => {
      setSuggestionVisible(true);
      let concatTitle = title.replace(/\s+/g, "+").toLowerCase();
      let concatAuthor = author.replace(/\s+/g, "+").toLowerCase();
      suggestion.request(concatTitle, concatAuthor);
    }, 2000);
  };

  const checkSuggestionWindow = () => {
    if (title === "" || author === "") {
      setSuggestionVisible(false);
      setUserPrompt("Provide some basic information");
    }
  };

  useEffect(() => {
    if (title !== "" && author !== "") {
      searchSuggestions();
    } else {
      setSuggestionVisible(false);
      setReadyToSubmit(false);
      setReadyToReport(false);
      setUserPrompt("Provide some basic information");
    }
  }, [title, author]);

  useEffect(() => {
    if (suggestion.error) {
      setUserPrompt("No Records Found. Try Again?");
    } else if (suggestion.loading) {
      setUserPrompt("Looking for Database Matches...");
    } else if (suggestion.data.length === 0) {
      setUserPrompt("Provide some basic information");
    } else {
      setUserPrompt("Is this the book you're looking for?");
    }
    setReadyToSubmit(false);
    setReadyToReport(false);
  }, [suggestion.loading, suggestion.error, suggestion.data]);

  return (
    <div id="postModalBody">
      <div id="postBookHeaderContainer">
        <p id="postBookHeader">
          {postBookVariant ? "Post Book" : "Post to Wishlist"}
        </p>
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
            onBlur={checkSuggestionWindow}
            value={title}
          />
          <CustomInputField
            name="Author"
            onChange={(e) => setAuthor(e.target.value)}
            onBlur={checkSuggestionWindow}
            value={author}
          />
          <p id="bookSuggestionHeading">{userPrompt}</p>
          {suggestionVisible && suggestion.loading && (
            <Lottie
              options={defaultOptions}
              height={120}
              width={400}
              isStopped={false}
              isPaused={false}
            />
          )}
          {suggestionVisible &&
            suggestion.data.length > 0 &&
            !suggestion.loading && (
              <>
                <div id="bookSuggestionContainer">
                  <img
                    id="suggestedBookCover"
                    src={suggestion.data[0].image}
                    alt=""
                  />
                  <div id="suggestedBookInfoContainer">
                    <p id="suggestedBookTitle">{suggestion.data[0].title}</p>
                    <p id="suggestedBookAuthor">{suggestion.data[0].author}</p>
                    <div style={{ overflow: "scroll" }}>
                      <p id="suggestedBookDesc">
                        {suggestion.data[0].description}
                      </p>
                    </div>
                  </div>
                </div>
                <div id="thumbsContainer">
                  <ThumbButton
                    icon={faThumbsUp}
                    active={thumbsUp}
                    color="#12BA85"
                    backgroundColor="rgba(18, 186, 133, 0.2)"
                    onClick={() => {
                      setThumbsUp(true);
                      setThumbsDown(false);
                      setReadyToSubmit(true);
                      setReadyToReport(false);
                    }}
                  />
                  <ThumbButton
                    icon={faThumbsDown}
                    active={thumbsDown}
                    color="#D8315B"
                    backgroundColor="rgba(216, 49, 91, 0.2)"
                    onClick={() => {
                      setThumbsUp(false);
                      setThumbsDown(true);
                      setReadyToSubmit(false);
                      setReadyToReport(true);
                    }}
                  />
                </div>
              </>
            )}
        </div>
        {readyToSubmit && (
          <>
            <div id="lowerFieldsContainer">
              <div id="conditionContainer">
                <div id="conditionLabelContainer">
                  <p id="conditionLabel">
                    {postBookVariant ? "Condition:" : "Desired Condition:"}
                  </p>
                </div>
                <Dropdown
                  options={conditions}
                  title="Select"
                  style={{ width: "50%" }}
                  onSelect={onSelectCondition}
                  color={postBookVariant ? "blue" : "red"}
                />
              </div>
              <CustomInputField
                name="Points"
                onChange={(e) => setPoints(e.target.value)}
                value={points}
              />
            </div>
            <Button
              color={postBookVariant ? "red" : "blue"}
              onClick={() => onSubmit(condition, points, suggestion.data[0])}
            >
              {postBookVariant ? "Post Book" : "Add to Wishlist"}
            </Button>
          </>
        )}
        {readyToReport && (
          <>
            <div id="reportSectionContainer">
              <p className="reportSectionHeading">Make sure you've:</p>
              <ul style={{ margin: "0px", padding: "0px", listStyle: "none" }}>
                <li className="reportSectionBulletItem">
                  • Spelled the author and title correctly
                </li>
                <li className="reportSectionBulletItem">
                  • Left spaces between every word in your search
                </li>
                <li className="reportSectionBulletItem">
                  • Still no luck? Let us know and submit a report
                </li>
              </ul>
            </div>
            <Button>Submit Report</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PostModal;
