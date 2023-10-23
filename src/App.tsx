import "bootstrap/dist/css/bootstrap.css";

import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import { Button, Card } from "react-bootstrap";
import Create from "./create/index";
import { Post } from "./types";
const author = "Taesu"; // username

function App() {
  const [title, setTitle] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [displayCreate, setDisplayCreate] = useState<boolean>(false);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [postAddedFlag, setPostAddedFlag] = useState<boolean>(false);

  useEffect(() => {
    getAllPosts();
  }, [postAddedFlag]);

  const getAllPosts = async () => {
    const { data } = await axios.get("http://localhost:3001/posts");
    setAllPosts(data);
  };
  const sendRequest = async (event: React.MouseEvent<HTMLInputElement>) => {
    if (context === "" || title === "") {
      return;
    }
    console.log("sendRequest method was called ");
    console.log("event");
    console.log(event);
    try {
      await axios.post("http://localhost:3001/create", {
        context,
        author,
        title,
      });
      // for retrieving new "allPosts"
      setPostAddedFlag(!postAddedFlag);
      // reset title and context field
      setTitle("");
      setContext("");
    } catch (err) {
      console.error("failed to fetch");
    }
  };

  const deletePost = async (postId: number) => {
    console.log("postId in delete");
    console.log(postId);
    const response = await axios.delete(`http://localhost:3001/post/${postId}`);
    console.log("response FE");
    console.log(response);
    setPostAddedFlag(!postAddedFlag);
  };

  const updateContext = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContext(event.target.value);
  };
  const updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div className="app-container">
      {allPosts.map((post, idx) => {
        const { id, author, title, context } = post;

        return (
          <Card key={`post-key-${idx}`}>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{context}</Card.Text>
              <Card.Text>{author}</Card.Text>
              <Button>Edit</Button>
              <Button variant="danger" onClick={() => deletePost(id)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        );
      })}
      <Button onClick={() => setDisplayCreate(!displayCreate)}>
        {displayCreate ? "Back" : "Create"}
      </Button>
      {displayCreate && (
        <Create
          context={context}
          title={title}
          sendRequest={sendRequest}
          updateContext={updateContext}
          updateTitle={updateTitle}
        />
      )}
    </div>
  );
}

export default App;
