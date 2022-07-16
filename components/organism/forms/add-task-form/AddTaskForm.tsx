import React from "react";
import { TextInput, Textarea, Button } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import schema from "./validation";

interface propsType {
  onSubmit: (any) => any;
  isLoading: boolean;
}

const AddTaskForm = ({ onSubmit, isLoading }: propsType) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-2">
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                label="Title"
                radius="sm"
                ref={field.ref}
                id="title"
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <Textarea
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                label="Description"
                radius="sm"
                ref={field.ref}
                id="description"
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
          loading={isLoading}
        >
          Add Task
        </Button>
      </form>
    </div>
  );
};

export default AddTaskForm;
