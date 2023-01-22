import { useState, useEffect, useContext } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "./api";

import UserContext from "./context";
import Paginate from "./Paginate";

// const backenaUrl = "ws://127.0.0.1:8080/ws/comments/";
const backenaUrl = "wss://young-sound-9142.fly.dev/ws/comments/";

const Comments = ({ commentsUrl, currentUserId }) => {
  const {
    user_id,
    user_name,
    email,
    home_page,
    // setUserId,
    // setUserName,
    // setEmail,
    // setHomePage,
  } = useContext(UserContext);
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);

  const [webSocket, setWebSocket] = useState(new WebSocket(backenaUrl));

  const [totalPosts, setTotalPosts] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const webSocket_send_action_list = (page) => {
    webSocket.send(
      JSON.stringify({
        action: "list",
        offset: ((page ? page : 1) - 1) * postsPerPage,
        limit: postsPerPage,
        request_id: new Date().getTime(),
      })
    );
  };
  useEffect(() => {
    // getCommentsApi().then((data) => {
    //   setBackendComments(data);
    // });
    webSocket.onopen = (event) => {
      console.log("Opened");
      webSocket_send_action_list();
    };

    webSocket.onmessage = (event) => {
      console.log(event.data);
      const json_data = JSON.parse(event.data);
      if (json_data.action === "list") {
        setCurrentPage(
          parseInt(json_data.data.offset / json_data.data.limit) + 1
        );
        setTotalPosts(json_data.data.count);
        setBackendComments(json_data.data.results);
      }
      if (json_data.action === "create") {
        webSocket_send_action_list(currentPage);
      }
      if (json_data.action === "patch") {
        webSocket_send_action_list(currentPage);
      }
      if (json_data.action === "delete") {
        webSocket_send_action_list(currentPage);
      }
    };

    webSocket.onerror = (event) => {
      console.log(event.data);
    };

    webSocket.onclose = (event) => {
      setWebSocket(new WebSocket(backenaUrl));
    };
  }, [webSocket]);

  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parent === null
  );
  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parent === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = (text, parentId, firstLevelId) => {
    webSocket.send(
      JSON.stringify({
        action: "create",
        request_id: new Date().getTime(),
        data: {
          user: {
            id: user_id,
            name: user_name,
            email: email,
            home_page: home_page,
          },
          text: text,
          parent: parentId,
          parent_first_level: firstLevelId,
        },
      })
    );
    // webSocket.send(
    //   JSON.stringify({
    //     action: "list",
    //     request_id: new Date().getTime(),
    //   })
    // );

    // createCommentApi(text, parentId).then((comment) => {
    //   setBackendComments([comment, ...backendComments]);
    setActiveComment(null);
    // });
  };

  const updateComment = (text, commentId) => {
    webSocket.send(
      JSON.stringify({
        action: "patch",
        request_id: new Date().getTime(),
        pk: commentId,
        data: {
          text: text,
        },
      })
    );
    setActiveComment(null);
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      webSocket.send(
        JSON.stringify({
          action: "delete",
          request_id: new Date().getTime(),
          pk: commentId,
        })
      );
      setActiveComment(null);
    }
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      webSocket_send_action_list(currentPage - 1);
      // setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(totalPosts / postsPerPage)) {
      webSocket_send_action_list(currentPage + 1);
      // setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="m-3">
      <h3 className="">Comments</h3>
      <div className="">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            // replies={getReplies(rootComment.id)}
            getReplies={getReplies}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
      <div className="">Please leave a comment</div>
      <CommentForm
        submitLabel="Leave a comment"
        handleSubmitComment={addComment}
      />
      {/* <pre>{backendComments}</pre> */}
      <Paginate
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        paginate={webSocket_send_action_list}
        previousPage={previousPage}
        nextPage={nextPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Comments;
