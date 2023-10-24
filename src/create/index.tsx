import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

interface Props {
  context: string;
  title: string;
  sendRequest: (event: any) => void;
  updateContext: (event: React.ChangeEvent<HTMLInputElement>) => void;
  updateTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Create({
  context,
  title,
  sendRequest,
  updateContext,
  updateTitle,
}: Props) {
  return (
    <div>
      <InputGroup>
        <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={updateTitle}
          value={title}
        />
      </InputGroup>
      <InputGroup>
        <Form.Control
          rows={25}
          as="textarea"
          aria-label="With textarea"
          onChange={updateContext}
          placeholder="description..."
          value={context}
        />
      </InputGroup>
      <Button disabled={context === "" || title === ""} onClick={sendRequest}>
        submit
      </Button>
    </div>
  );
}
