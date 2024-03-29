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
    <div className="flex flex-col space-y-2 p-5 items-start bg-[#f0eeee] h-[300px] rounded-lg text-lg font-semibold justify-start mx-auto w-[695px]">

      <p>First Name: <span className="uppercase">{data ? data.firstName : ""}</span></p>
      <p>Last Name: <span className="uppercase">{data ? data.lastName : ""}</span></p>
      <p>Email Address: <span className="lowercase">{data ? data.email : ""}</span></p>
      <p>Phone Number: {data ? `+91 ${data.phoneNumber}` : ""}</p>
      <p className="capitalize">Gender: {data ? data.gender : ""}</p>
      <p>Date of Birth: {data ? data.dateOfBirth : ""}</p>
      <p>
        Tech Stack:{" "}
        {data && data.techStack
          ? data.techStack.map((tech, index) => (
              <span key={index} className="uppercase">
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
