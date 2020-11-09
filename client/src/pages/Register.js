import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

const Register = (props) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  function onChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
      props.history.push("/");
    },
    onError(err) {
      console.log(
        "graphql errors :>> ",
        err.graphQLErrors[0].extensions.exception.errors
      );
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function onSubmit(e) {
    e.preventDefault();
    addUser();
  }

  return (
    <div className="form-control">
      <Form
        onSubmit={onSubmit}
        noValidate
        className={`"registerForm" ${loading ? "loading" : ""}`}
      >
        <h1>Register</h1>
        <Form.Input
          label="username"
          placeholder="username"
          name="username"
          value={values.username}
          type="text"
          onChange={onChange}
          error={errors.username ? true : false}
          color="white"
        />
        <Form.Input
          label="email"
          placeholder="email"
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
          error={errors.email ? true : false}
          color="white"
        />
        <Form.Input
          label="password"
          placeholder="password"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
          error={errors.password ? true : false}
          color="white"
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
          color="white"
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
