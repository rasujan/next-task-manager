import React from "react";
import { TextInput, Button, PasswordInput } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import schema from "./validation";

const LoginForm = () => {
  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve(values);
      }, 1000);
    });
  };

  return (
    <div>
      <h1 className="text-center"> Login </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4">
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                value={field.value}
                error={fieldState.error?.message}
                label="Username"
                radius="sm"
                ref={field.ref}
                id="username"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <PasswordInput
                value={field.value}
                error={fieldState.error?.message}
                label="Password"
                radius="sm"
                id="password"
              />
            )}
          />
        </div>

        <Button
          type="submit"
          radius="sm"
          variant="outline"
          color="dark"
          fullWidth
          uppercase
          disabled={!formState.isValid && formState.isSubmitted}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
