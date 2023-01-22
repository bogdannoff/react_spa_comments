import { useState } from "react";
import Comments from "./Comments";
import UserContext from "./context";

const App = () => {
  const [user_id, setUserId] = useState(null);
  const [user_name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [home_page, setHomePage] = useState("");

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
      <div className="container">
        <Comments />
      </div>
    </UserContext.Provider>
  );
};

export default App;
