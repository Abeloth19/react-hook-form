import { useRef } from "react";
import DisplaySubmittedData, { DisplayRef } from "./DisplaySubmittedData";
import { format } from "date-fns";
import {
  Button,
  FormControl,
  FormLabel,
  Input, 
  Stack,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMessage from "./ErrorMessageComponent";
import { toast } from 'react-hot-toast';


const validationSchema: any = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required("First name is required")
    .min(2, "First Name must be at least 2 characters")
    .matches(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/,
      "Name cannot contain numbers or special characters",
    ),
  lastName: yup
    .string()
    .trim()
    .required("Last name is required")
    .min(2, "Last Name must be at least 2 characters")
    .matches(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/,
      "Name cannot contain numbers or special characters",
    ),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup
  .string()
  .required("Phone Number is required")
  .matches(/^\d+$/, "Only numbers are allowed")
  .min(10, "Phone number must be exactly 10 characters") 
  .max(10, "Phone number must be exactly 10 characters"),
  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["male", "female", "other"], "Invalid Gender"),
  dateOfBirth: yup.string().required("Date of Birth is required"),
  techStack: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Tech Stack is required"),
    }),
  ),
});

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  techStack: { name: string }[];
}

const UserForm: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      techStack: [{ name: "" }],
    },
    resolver: yupResolver(validationSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "techStack",
  });

  const displayRef = useRef<DisplayRef>(null); // Use useRef to refer to the DisplaySubmittedData component

  const onSubmit = async (data: FormValues) => {
    const formattedDateOfBirth = format(
      new Date(data.dateOfBirth),
      "dd/MMM/yyyy",
    );

    // Replace the original dateOfBirth with the formatted date
    const updatedData = {
      ...data,
      dateOfBirth: formattedDateOfBirth,
    };
    await new Promise((resolve) => setTimeout(resolve, 3000));

  toast.success("Data Submitted Successfully !");
    // Use the ref to call the updateDisplay method in DisplaySubmittedData component
    displayRef.current?.updateDisplay(updatedData);
    reset();
  };

  return (
    <div className="flex flex-col space-y-10 items-center py-5 justify-center w-full bg-[#ffffff]">
       <div className="flex flex-col space-y-5 p-6 rounded-lg mt-10 bg-[#f0eeee]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
         <div className="flex flex-col space-y-5">
            <h1 className="text-black text-2xl font-bold"> Basic Details </h1>
            <div className="flex flex-row space-x-10">
              <FormControl isInvalid={!!errors.firstName}>
                <FormLabel htmlFor="firstName" className="font-bold mb-2">
                  First Name
                </FormLabel>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  className="rounded-md h-[35px] w-[300px] bg-[#d9d9d9] px-3 p-2 outline-none text-black"
                  placeholder="Enter First Name"
                />
                <ErrorMessage name="firstName" errors={errors} />
              </FormControl>

              <FormControl isInvalid={!!errors.lastName}>
                <FormLabel htmlFor="lastName" className="font-bold mb-2">
                  Last Name
                </FormLabel>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  className="rounded-md h-[35px] w-[300px] bg-[#d9d9d9] px-3 p-2 outline-none text-black"
                  placeholder="Enter Last Name"
                />
                <ErrorMessage name="lastName" errors={errors} />
              </FormControl>
            </div>
            <div className="flex flex-row space-x-10">
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email" className="font-bold mb-2">
                  Email Address
                </FormLabel>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="rounded-md h-[35px] w-[300px] bg-[#d9d9d9] px-3 p-2 outline-none text-black"
                  placeholder="Enter  E-mail"
                />
                <ErrorMessage name="email" errors={errors} />
              </FormControl>

              <FormControl isInvalid={!!errors.phoneNumber}>
                <FormLabel htmlFor="phoneNumber" className="font-bold mb-2">
                  Phone Number
                </FormLabel>
                <div className="flex items-center px-2 h-[35px] bg-[#d9d9d9] rounded-md w-[300px]">
                  <span>+91</span>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    rules={{
                      required: "Phone Number is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Only numbers are allowed",
                      },
                      maxLength: {
                        value: 10,
                        message: "Phone number must be exactly 10 characters",
                      },
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        type="tel"
                        id="phoneNumber"
                        value={value}
                        onChange={(e) => {
                    
                          const newValue = e.target.value
                            .replace(/[^0-9]/g, "")
                            .slice(0, 10);
                          onChange(newValue);
                        }}
                        className="outline-none px-3 bg-transparent"
                        placeholder="Enter Phone Number"
                      />
                    )}
                  />
                </div>
                <ErrorMessage name="phoneNumber" errors={errors} />
              </FormControl>
            </div>
         </div>
          <div className="flex flex-col space-y-5 ">
            <h1 className="text-black text-2xl font-bold mt-10">
              {" "}
              Other Information{" "}
            </h1>
            <div className="flex flex-row space-x-10">
              <FormControl isInvalid={!!errors.gender}>
                <FormLabel htmlFor="gender" className="font-bold mb-2">
                  Gender
                </FormLabel>
                <select
                  id="gender"
                  {...register("gender")}
                  className="rounded-md h-[35px] w-[300px] bg-[#d9d9d9] px-3 outline-none text-black"
                >
                  <option className=" font-semibold">Select Gender</option>
                  <option value="male" className=" font-semibold">
                    Male
                  </option>
                  <option value="female" className=" font-semibold">
                    Female
                  </option>
                  <option value="other" className="font-semibold">
                    Other
                  </option>
                </select>
                <ErrorMessage name="gender" errors={errors} />
              </FormControl>

              <FormControl isInvalid={!!errors.dateOfBirth}>
                <FormLabel htmlFor="dateOfBirth" className="font-bold mb-2">
                  Date of Birth
                </FormLabel>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth")}
                  className="rounded-md h-[35px] w-[300px] bg-[#d9d9d9] px-3 p-2 outline-none text-black"
                />
                <ErrorMessage name="dateOfBirth" errors={errors} />
              </FormControl>
            </div>
            <FormControl>
              <div className="flex flex-row w-[300px] justify-between">              
              <FormLabel className="font-bold mb-2">Tech Stack</FormLabel>
              <Button
                leftIcon={<AddIcon />}
                onClick={() => append({ name: "" })}
                mt={2}
              />             
             </div>

              {fields.map((field, index) => (
                <HStack key={field.id} spacing={2}>
                  <Controller
                    name={`techStack.${index}.name`}
                    control={control}
                    render={({ field }) => (
                      <Input
                      {...field}
                        placeholder="Tech stack"
                        className="rounded-md h-[35px] w-[300px] bg-[#d9d9d9] px-3 p-2 mr-2 outline-none text-black mb-2"
                      />
                    )}
                  />
                  {index !== 0 && (
                    <IconButton
                      aria-label="Remove tech stack"
                      icon={<DeleteIcon />}
                      onClick={() => remove(index)}
                    />
                  )}
                  <ErrorMessage
                    name={`techStack.${index}.name`}
                    errors={errors}
                    />
                </HStack>
              ))}          
            </FormControl>
          </div>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
            className="flex ml-auto w-[150px] h-[35px] text-lg font-semibold bg-[#d9d9d9] p-1 text-black rounded-md"
          >
            Submit
          </Button>
        </Stack>
      </form>
      </div>
      <DisplaySubmittedData ref={displayRef} />
    </div>
  );
};

export default UserForm;
