import { useContext } from "react";
import CommentForm from "./CommentForm";
import UserContext from "./context";
import CommentField from "./CommentField";

const Comment = ({
  comment,

  getReplies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  const { user_id, user_name, email } = useContext(UserContext);
  const replies = getReplies(comment.id);
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canReply = true;
  const canDelete = user_id
    ? comment.user !== null &&
      user_id === comment.user.userId &&
      replies.length === 0
    : comment.user !== null &&
      email === comment.user.email &&
      replies.length === 0;

  const canEdit = user_id
    ? comment.user !== null && user_id === comment.user.userId
    : comment.user !== null && email === comment.user.email;

  const replyId = comment.id;
  const firstLevelId = comment.parent ? comment.parent_first_level : comment.id;
  const createdAt_date = new Date(comment.created_at);
  const createdAt =
    createdAt_date.toLocaleDateString() +
    " " +
    createdAt_date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  return (
    <div key={comment.id} className="my-2">
      <div className="">
        <div className="d-flex flex-fill gap-2 p-1 rounded-top bg-secondary bg-opacity-25 justify-content-between">
          <div className="d-flex gap-2">
            <div className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </div>
            <div className="d-flex align-items-center fw-bold">
              {comment.user === null ? "Undefined" : comment.user.name}
            </div>
          </div>
          <div className="d-flex align-items-center fw-bold badge text-black">
            {createdAt}
          </div>
        </div>

        <div className="rounded-bottom border border-secondary-subtle p-1">
          {!isEditing && (
            <p className="lh-2">
              <CommentField text={comment.text} />
            </p>
          )}

          {isEditing && (
            <CommentForm
              submitLabel="Update"
              hasCancelButton
              initialText={comment.text}
              handleSubmitComment={(text) => updateComment(text, comment.id)}
              handleCancel={() => {
                setActiveComment(null);
              }}
            />
          )}

          {isReplying && (
            <div className="ms-5">
              <CommentForm
                submitLabel="Reply"
                hasCancelButton
                handleSubmitComment={(text) =>
                  addComment(text, replyId, firstLevelId)
                }
                handleCancel={() => {
                  setActiveComment(null);
                }}
              />
            </div>
          )}

          {!(isEditing || isReplying) && (
            <div className="d-flex gap-2 justify-content-end">
              {canReply && (
                <div
                  className="btn btn-outline-secondary btn-sm py-0"
                  onClick={() =>
                    setActiveComment({ id: comment.id, type: "replying" })
                  }
                >
                  Reply
                </div>
              )}
              {canEdit && (
                <div
                  className="btn btn-outline-secondary btn-sm py-0"
                  onClick={() =>
                    setActiveComment({ id: comment.id, type: "editing" })
                  }
                >
                  Edit
                </div>
              )}
              {canDelete && (
                <div
                  className="btn btn-outline-secondary btn-sm py-0"
                  onClick={() => deleteComment(comment.id)}
                >
                  Delete
                </div>
              )}
            </div>
          )}
        </div>
        {replies.length > 0 && (
          <div className="border-start ps-5">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                getReplies={getReplies}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
