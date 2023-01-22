import { useState, useRef } from "react";

const Editor = ({ initialText, register, setEditorText }) => {
  const [text, setText] = useState(initialText);
  const [selectionStart, setSelectionStart] = useState(initialText);
  const [selectionEnd, setSelectionEnd] = useState(initialText);

  const insertText = (textToInsert) => {
    const textBeforeCursorPosition = text.substring(0, selectionStart);
    const textAfterCursorPosition = text.substring(selectionEnd, text.length);
    const newText =
      textBeforeCursorPosition + textToInsert + textAfterCursorPosition;
    setEditorText(newText);
    setText(newText);
  };

  const onClick_a = () => {
    insertText('<a href="" title=""></a>');
  };
  const onClick_code = () => {
    insertText("<code></code>");
  };
  const onClick_i = () => {
    insertText("<i></i>");
  };
  const onClick_strong = () => {
    insertText("<strong></strong>");
  };

  const onChangeText = (e) => {
    setEditorText(e.target.value);
    setText(e.target.value);
  };
  const onClick_text = (e) => {
    setSelectionStart(e.target.selectionStart);
    setSelectionEnd(e.target.selectionEnd);
  };

  const myFunc = (e) => {
    const c = 1;
  };

  return (
    <div className="">
      <div className="d-flex my-1 gap-1">
        <button
          type="button"
          className="btn btn-outline-secondary m-1"
          onClick={onClick_a}
        >
          [a]
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary m-1"
          onClick={onClick_code}
        >
          [code]
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary m-1"
          onClick={onClick_i}
        >
          [i]
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary m-1"
          onClick={onClick_strong}
        >
          [strong]
        </button>
      </div>
      <textarea
        {...register("text", {
          validate: (v) => myFunc(v),
          required: true,
          maxLength: 100,
        })}
        className="form-control"
        id="text"
        rows="3"
        value={initialText}
        onChange={(e) => onChangeText(e)}
        onMouseUp={(e) => onClick_text(e)}
      ></textarea>
    </div>
  );
};

export default Editor;
