import React from "react";
import { TextInput, Button } from "@mantine/core";
import { HiEye } from "react-icons/hi";

const LoginForm = () => {
  return (
    <div>
      <h1 className="text-center"> Login </h1>
      <form>
        <div className="my-4">
          <TextInput label="Username" radius="sm" />
          <TextInput
            label="Password"
            type="password"
            radius="sm"
            rightSection={<HiEye size={36} className="mx-2" />}
          />
        </div>

        <Button radius="sm" variant="outline" color="dark" fullWidth uppercase>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
