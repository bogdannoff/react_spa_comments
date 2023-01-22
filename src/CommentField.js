import React, { Fragment } from "react";

const CommentField = ({ text }) => {
  function createMarkup() {
    return {
      __html: text,
    };
  }
  return <div dangerouslySetInnerHTML={createMarkup()}></div>;
};

export default CommentField;
