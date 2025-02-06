"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Heading,
  Box,
  Flex,
  Callout,
} from "@radix-ui/themes";
import { storeToken } from "../utils/storeToken";

const Login = () => {
  const [error, setError] = useState("");

  const submitFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, password } = e.target as HTMLFormElement;

    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const responseData = await response.json();

    if (responseData.error) {
      setError(responseData.message);
    } else {
      setError("");
      storeToken(responseData);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{
        height: "100vh",
        padding: "20px",
        backgroundColor: "var(--gray2)",
      }}
    >
      <Box
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "var(--white)",
        }}
      >
        <Heading as="h1" size="3" style={{ marginBottom: "20px" }}>
          Login
        </Heading>
        <form onSubmit={(e) => submitFormData(e)}>
          <TextField.Root
            placeholder="Username"
            type="text"
            name="username"
            style={{ marginTop: "8px" }}
            autoComplete="off"
          ></TextField.Root>

          <TextField.Root
            placeholder="Password"
            style={{ marginTop: "8px" }}
            type="password"
            name="password"
            autoComplete="current-password"
          ></TextField.Root>

          <Button
            variant="solid"
            color="blue"
            // size="large"
            type="submit"
            style={{ width: "100%", marginTop: "24px", cursor: "pointer" }}
          >
            Log In
          </Button>
        </form>
      </Box>
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
    </Flex>
  );
};

export default Login;
