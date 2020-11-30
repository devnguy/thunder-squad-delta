import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";

import "./PostModal.css";
import BookCover from "../../Assets/Book Cover.png";
import Lottie from "react-lottie";
import * as LoadingAnimation from "../../Assets/Animations/Loading.json";

import Dropdown from "../Dropdown/Dropdown";
import CustomInputField from "../CustomInputField";
import Button from "../Button";
import ThumbButton from "../ThumbButton";
import useApi from "../../Api/useApi";
import requests from "../../Api/requests";

const conditions = ["Great", "Good", "Fair", "Poor"];

const PostModal = ({ onClose }) => {
  const suggestion = useApi(requests.searchGoogleBooks);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [condition, setCondition] = useState("Select");
  const [points, setPoints] = useState("");
  const [thumbsUp, setThumbsUp] = useState(false);
  const [thumbsDown, setThumbsDown] = useState(false);
  const [suggestionVisible, setSuggestionVisible] = useState(false);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
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
    if (title !== "" && author !== "") {
      setThumbsUp(false);
      setThumbsDown(false);
      setSuggestionVisible(true);
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
      searchTimerRef.current = setTimeout(() => {
        let concatTitle = title.replace(/\s+/g, "+").toLowerCase();
        let concatAuthor = author.replace(/\s+/g, "+").toLowerCase();
        suggestion.request(concatTitle, concatAuthor);
      }, 2000);
    } else {
      setSuggestionVisible(false);
    }
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
      setUserPrompt("Is this the book you'd like to post?");
    }
  }, [suggestion.loading, suggestion.error]);

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
                  <p id="conditionLabel">Condition: </p>
                </div>
                <Dropdown
                  options={conditions}
                  title="Select"
                  style={{ width: "50%" }}
                  onSelect={onSelectCondition}
                />
              </div>
              <CustomInputField
                name="Points"
                onChange={(e) => setPoints(e.target.value)}
                value={points}
              />
            </div>
            <Button color="red">Post Book</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PostModal;
