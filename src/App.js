import { useState } from "react";
import Comments from "./Comments";

import UserContext from "./context";

const App = () => {
  const [user_id, setUserId] = useState(null);
  const [user_name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [home_page, setHomePage] = useState("");

  function Context_setUserId(value) {
    setUserId(value);
  }

  return (
    <UserContext.Provider
      value={{
        user_id,
        user_name,
        email,
        home_page,
        setUserId: (value) => setUserId(value),
        setUserName: (value) => setUserName(value),
        setEmail: (value) => setEmail(value),
        setHomePage: (value) => setHomePage(value),
      }}
    >
      <div>
        <Comments
          commentsUrl="http://localhost:3004/comments"
          currentUserId="1"
        />
      </div>
    </UserContext.Provider>
  );
};

export default App;

// import React, {Component} from "react";

// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// import { w3cwebsocket as W3CWebSocket } from "websocket";

// class App extends Component {

//   state = {
//     isLoggedIn: false,
//     messages: [],
//     value: '',
//     name: '',
//     room: 'vacad',
//   }

//   client = new W3CWebSocket('ws://http://127.0.0.1:8000/ws/comments/');

//   onButtonClicked = (e) => {
//     this.client.send(JSON.stringify({
//       type: "message",
//       message: this.state.value,
//       name: this.state.name
//     }));
//     this.state.value = ''
//     e.preventDefault();
//   }

//   componentDidMount() {
//     this.client.onopen = () => {
//       console.log('WebSocket Client Connected');
//     };
//     this.client.onmessage = (message) => {
//       const dataFromServer = JSON.parse(message.data);
//       console.log('got reply! ', dataFromServer.type);
//       if (dataFromServer) {
//         this.setState((state) =>
//           ({
//             messages: [...state.messages,
//             {
//               msg: dataFromServer.message,
//               name: dataFromServer.name,
//             }]
//           })
//         );
//       }
//     };
//   }

//   render(){
//     return (
//       <Container>
//         <Row>
//           <Col>1 of 1</Col>
//         </Row>
//       </Container>
//     );
//   }

// };
// export default (App)
