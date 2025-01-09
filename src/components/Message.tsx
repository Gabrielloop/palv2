import React from "react";
import { MessageProps } from "../@types/componentsType";

const Message: React.FC<MessageProps> = ({ text, type }) => {
  switch (type) {
    case "error":
      return <div className="msg msg-error">{text}</div>;
    case "warning":
      return <div className="msg msg-warning">{text}</div>;
    case "information":
      return <div className="msg msg-information">{text}</div>;
    case "success":
      return <div className="msg msg-success">{text}</div>;
    default:
      return <div>{text}</div>;
  }
};

export default Message;
