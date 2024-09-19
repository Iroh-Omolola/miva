"use client";

import React, { useState } from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import PageFrame from "@/component/PageFrame";
import validatePage from "@/component/ValidatePage";

interface FormValues {
  name: string;
  registrationNumber: string;
  gpa: string;
  major: string;
  dateOfBirth: string;
}

const validateFields = (values: FormValues) => {
  const errors: Partial<FormValues> = {};
  if (!values.name) errors.name = "Name is required";
  if (!values.registrationNumber) errors.registrationNumber = "Registration number is required";
  if (!values.major) errors.major = "Major is required";
  if (!values.dateOfBirth) errors.dateOfBirth = "Date of Birth is required";
  if (!values.gpa) {
    errors.gpa = "GPA is required";
  } else if (!/^\d+(\.\d+)?$/.test(values.gpa)) {
    errors.gpa = "GPA must be a valid number";
  } else if (parseFloat(values.gpa) > 5) {
    errors.gpa = "GPA cannot be more than 5";
  }

  return errors;
};
const CreateStudent = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
 
  const onCreateStudent = useMutation({
    mutationFn: async (values: FormValues) => {
      const res = await fetch(`http://localhost:3000/api/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          registrationNumber: values.registrationNumber,
          gpa: Number(values.gpa),
          major: values.major,
          dob: values.dateOfBirth
        }),
      });
    },
    onMutate: () => {
      setSubmitting(true);
    },
    onSuccess: () => {
      setSubmitting(false);
      router.push("/students");
    },
    onError: (error: Error) => {
      setSubmitting(false);
      setErrorMessage(error.message);
    },
  });

  return (
    <PageFrame>

    <div className="md:px-20 px-5 py-20 flex justify-center">
      <Formik
        initialValues={{
          name: "",
          registrationNumber: "",
          gpa: "",
          major: "",
          dateOfBirth: "",
        }}
        validate={validateFields}
        onSubmit={(values) => {
          onCreateStudent.mutate(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="bg-white w-[95%] md:w-[50%] p-10 shadow-lg space-y-4 rounded-md ">
            {errorMessage !== "" && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>{errorMessage}!</AlertTitle>
              </Alert>
            )}
            <Text className="text-miva-blue text-center text-xl font-bold">
              Create Student
            </Text>
            <Field name="name">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isRequired
                  isInvalid={!!(form.errors.name && form.touched.name)}
                >
                  <FormLabel className="text-miva-blue">First Name</FormLabel>
                  <Input
                    {...field}
                    placeholder="Name"
                    focusBorderColor="gray.100"
                    _invalid={{ borderColor: "red.500" }}
                  />
                  <FormErrorMessage>
                    {typeof form.errors.name === "string"
                      ? form.errors.name
                      : ""}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="registrationNumber">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isRequired
                  isInvalid={!!(form.errors.registrationNumber && form.touched.registrationNumber)}
                >
                  <FormLabel className="text-miva-blue">
                    Registration Number
                  </FormLabel>
                  <Input
                    {...field}
                    textColor={"black"}
                    placeholder="Registration Number"
                    focusBorderColor="gray.100"
                    _invalid={{ borderColor: "red.500" }}
                  />
                  <FormErrorMessage>
                    {typeof form.errors.registrationNumber === "string"
                      ? form.errors.registrationNumber
                      : ""}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="major">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isRequired
                  isInvalid={!!(form.errors.major && form.touched.major)}
                >
                  <FormLabel className="text-miva-blue">Major</FormLabel>
                  <Input
                    {...field}
                    placeholder="Major"
                    focusBorderColor="gray.100"
                    _invalid={{ borderColor: "red.500" }}
                  />
                  <FormErrorMessage>
                    {typeof form.errors.major === "string"
                      ? form.errors.major
                      : ""}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="dateOfBirth">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isRequired
                  isInvalid={
                    !!(form.errors.dateOfBirth && form.touched.dateOfBirth)
                  }
                >
                  <FormLabel className="text-miva-blue">
                    Date of Birth
                  </FormLabel>
                  <Input
                    {...field}
                    type="date"
                    focusBorderColor="gray.100"
                    _invalid={{ borderColor: "red.500" }}
                    placeholder="Date of Birth"
                  />
                  <FormErrorMessage>
                    {typeof form.errors.dateOfBirth === "string"
                      ? form.errors.dateOfBirth
                      : ""}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="gpa">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isRequired
                  isInvalid={!!(form.errors.gpa && form.touched.gpa)}
                >
                  <FormLabel className="text-miva-blue">GPA</FormLabel>
                  <Input
                    {...field}
                    value={form.values.gpa}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (/^\d*\.?\d*$/.test(inputValue)) {
                        setFieldValue("gpa", inputValue);
                      }
                    }}
                    focusBorderColor="gray.100"
                    _invalid={{ borderColor: "red.500" }}
                    placeholder="GPA"
                  />
                  <Text className="text-sm text-slate-500">Maximum GPA is 5</Text>
                  <FormErrorMessage>
                    {typeof form.errors.gpa === "string" ? form.errors.gpa : ""}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              isLoading={submitting}
              className="bg-miva-blue text-white w-full hover:bg-hover-miva-blue"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
    </PageFrame>
  );
};
export default validatePage(CreateStudent)

