import React from "react";
import { TextInput, Button, PasswordInput } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import schema from "./validation";

interface propsType {
  onSubmit: (any) => any;
}

const LoginForm = ({ onSubmit }: propsType) => {
  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div>
      <h3 className="text-center"> Login </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4">
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                label="Username"
                radius="sm"
                ref={field.ref}
                id="username"
                className="my-2"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <PasswordInput
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                label="Password"
                radius="sm"
                id="password"
                className="my-2"
              />
            )}
          />
        </div>

        <Button
          type="submit"
          radius="sm"
          variant="outline"
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
