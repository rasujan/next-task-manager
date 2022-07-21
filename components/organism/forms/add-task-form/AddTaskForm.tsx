import React, { useEffect } from "react";
import { TextInput, Textarea, Button } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import schema from "./validation";

interface propsType {
  onSubmit: (any) => any;
  isLoading: boolean;
}

const AddTaskForm = ({ onSubmit, isLoading }: propsType) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        title: "",
        description: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-2">
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextInput
                error={fieldState.error?.message}
                label="Title"
                radius="sm"
                id="title"
                {...field}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Textarea
                error={fieldState.error?.message}
                label="Description"
                radius="sm"
                id="description"
                {...field}
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
