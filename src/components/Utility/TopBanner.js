import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./TopBanner.css";

const messages = ["Tech#1", "Tech#2", "Tech#3"];

const TopBanner = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const tout = setTimeout(() => {
      if (messageIndex !== messages.length - 1)
        setMessageIndex(messageIndex + 1);
    }, 1000);

    return () => clearTimeout(tout);
  }, [messageIndex]);

  return (
    <div
      id="top-banner"
      style={{ background: "url(/bg.svg)" }}
      className="top-banner"
    >
      <div className="top-banner__messages-container">
        <h1>Experience&nbsp;</h1>
        <div className="messages">
          <h1 style={{ opacity: "0", position: "relative" }}>
            {messages[messageIndex]}
          </h1>{" "}
          {/* should be equal to the longest message so as to acquire min length  */}
          {messages.map((message, index) => (
            <h1
              className={`message ${index === messageIndex && "current"}
              ${index > messageIndex && "next"}
              ${index < messageIndex && "previous"}`}
              key={index}
            >
              {message}
            </h1>
          ))}
        </div>
      </div>
      <Button
        variant="contained"
      >
        GET STARTED!
      </Button>
    </div>
  );
};

export default TopBanner;
