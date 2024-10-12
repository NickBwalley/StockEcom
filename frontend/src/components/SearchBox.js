import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  let history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/?keyword=${keyword}&page=1`);
    } else {
      history.push(history.push(history.location.pathname));
    }
  };
  return (
    <Form
      onSubmit={submitHandler}
      inline
      className="flex items-center space-x-2"
    >
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5 p-2 text-xl font-bold text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search..."
      ></Form.Control>

      <Button
        type="submit"
        variant="outline-success"
        className="p-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-all duration-200"
      >
        Search
      </Button>
    </Form>
  );
}

export default SearchBox;
