import { useState, useContext } from "react";
import UserContext from "./context";
import { useForm } from "react-hook-form";
import Editor from "./HTMLEditor";

const CommentForm = ({
  handleSubmitComment,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const {
    user_id,
    user_name,
    email,
    home_page,
    setUserId,
    setUserName,
    setEmail,
    setHomePage,
  } = useContext(UserContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    // event.preventDefault();
    // handleSubmit(event);
    // handleSubmitComment(text);
    handleSubmitComment(event.text);
    setText("");
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      // onSubmit={onSubmit}
      className="d-flex flex-column gap-2 p-1 rounded-3 bg-secondary bg-opacity-25"
    >
      {/* <div className="">
        <textarea
          // {...register("text", {
          //   maxLength: 1000,
          // })}
          className="form-control"
          id="text"
          rows="3"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>{" "} */}
      <div className="">
        <Editor
          initialText={text}
          register={register}
          setEditorText={setText}
        />
      </div>
      <div className="d-flex flex-row gap-2 p-1 ">
        <div className="flex-fill">
          <label className="form-label">User name</label>
          <input
            {...register("user_name", {
              required: true,
              maxLength: 100,
            })}
            type="text"
            className={
              errors.user_name ? "form-control is-invalid" : "form-control"
            }
            id="user_name"
            placeholder="User name"
            value={user_name}
            onChange={(e) => setUserName(e.target.value)}
          ></input>
          {errors.user_name && (
            <div className="invalid-feedback">
              Please provide a valid user name.
            </div>
          )}
        </div>
        <div className="flex-fill">
          <label className="form-label">Email address</label>
          <input
            {...register("email", {
              required: true,
              maxLength: 100,
            })}
            type="email"
            className={
              errors.email ? "form-control is-invalid" : "form-control"
            }
            id="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          {errors.email && (
            <div className="invalid-feedback">
              Please provide a valid email.
            </div>
          )}
        </div>
        <div className="flex-fill">
          <label className="form-label">Home page</label>
          <input
            {...register("home_page", {
              maxLength: 10,
            })}
            type="text"
            className={
              errors.home_page ? "form-control is-invalid" : "form-control"
            }
            id="home_page"
            placeholder="Home page"
            value={home_page}
            onChange={(e) => setHomePage(e.target.value)}
          ></input>
          {errors.home_page && (
            <div className="invalid-feedback">
              Please provide a valid email.
            </div>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-end gap-2">
        <button
          className="btn btn-outline-secondary  btn-sm py-0"
          disabled={isTextareaDisabled}
        >
          {submitLabel}
        </button>
        {hasCancelButton && (
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm py-0"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
