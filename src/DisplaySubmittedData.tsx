import { useImperativeHandle, forwardRef, useState } from "react";
import { FormValues } from "./UserForm";

export interface DisplayRef {
  updateDisplay: (data: FormValues) => void;
}
// Creating a functional component called DisplaySubmittedData using forwardRef
const DisplaySubmittedData = forwardRef<DisplayRef, {}>((props, ref) => {
  const [data, setData] = useState<FormValues | null>(null);
// Custom hook to allow parent components to imperatively interact with this component
  useImperativeHandle(ref, () => ({
     // Exposing a method called updateDisplay through the ref
    updateDisplay: (newData: FormValues) => {
      setData(newData); 
    },
  }));

  return (
    <div className="flex flex-col space-y-2 p-5 items-start bg-[#f0eeee] h-[300px]  rounded-lg text-lg font-semibold justify-start mx-auto w-[695px]">

      <p>First Name: {data ? data.firstName : ""}</p>
      <p>Last Name: {data ? data.lastName : ""}</p>
      <p>Email Address: {data ? data.email : ""}</p>
      <p>Phone Number: {data ? data.phoneNumber : ""}</p>
      <p className="capitalize">Gender: {data ? data.gender : ""}</p>
      <p>Date of Birth: {data ? data.dateOfBirth : ""}</p>
      <p>
        Tech Stack:{" "}
        {data && data.techStack
          ? data.techStack.map((tech, index) => (
              <span key={index}>
                {tech.name}
                {index !== data.techStack.length - 1 ? ", " : ""}
              </span>
            ))
          : ""}
      </p>
      
    </div>
  );
});

export default DisplaySubmittedData;
