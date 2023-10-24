import "bootstrap/dist/css/bootstrap.css";

import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import Create from "./create/index";
import { Post } from "./types";

const author = "Taesu"; // username

function App() {
  const [title, setTitle] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [displayCreate, setDisplayCreate] = useState<boolean>(false);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [postAddedFlag, setPostAddedFlag] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editedPost, setEditedPost] = useState<number>(-1);

  useEffect(() => {
    getAllPosts();
  }, [postAddedFlag]);

  const getAllPosts = async () => {
    const { data } = await axios.get("http://localhost:3001/posts");
    setAllPosts(data);
  };
  const sendRequest = async () => {
    if (context === "" || title === "") {
      return;
    }

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
    await axios.delete(`http://localhost:3001/post/${postId}`);
    setPostAddedFlag(!postAddedFlag);
  };

  const updatePost = async (postId: number) => {
    await axios.post(`http://localhost:3001/post/${postId}`, { context });
    setIsEditMode(false);
    // for preventing update all of
    setEditedPost(-1);
    // for retrieving updated post
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
      <h1 className="page-title"> WELCOME TO TONI BLOG</h1>
      {allPosts.map((post, idx) => {
        const { id, author, title, context } = post;
        return (
          <Card key={`post-key-${idx}`}>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              {isEditMode && editedPost === id ? (
                <InputGroup>
                  <Form.Control
                    rows={25}
                    as="textarea"
                    aria-label="With textarea"
                    onChange={updateContext}
                    placeholder="description..."
                    defaultValue={context}
                  />
                </InputGroup>
              ) : (
                <Card.Text className="context-field">{context}</Card.Text>
              )}

              <Card.Text>{author}</Card.Text>
              <Button
                onClick={() => {
                  setIsEditMode(!isEditMode);
                  // for preventing update all of
                  setEditedPost(id);
                }}
                variant={
                  isEditMode && editedPost === id ? "warning" : "primary"
                }
              >
                {isEditMode && editedPost === id ? "Cancel" : "Edit"}
              </Button>

              {isEditMode && editedPost === id && (
                <Button onClick={() => updatePost(id)}>Save</Button>
              )}

              {!(isEditMode && editedPost === id) && (
                <Button variant="danger" onClick={() => deletePost(id)}>
                  Delete
                </Button>
              )}
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
