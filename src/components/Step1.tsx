import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

interface Step1Props {
  onNext: (data: any) => void;
}

const Step1: React.FC<Step1Props> = ({ onNext }) => {
  // Defined states to hold form data
  const [formData, setFormData] = useState({
    fullName: "",
    position: "",
    password: "",
    confirmPassword: "",
  });

  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      // @ts-ignore
      [`${name}`]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Create a URL for the selected image and update the state
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    // Add validation logic here
    onNext(formData);
  };

  return (
    <div className="hidden md:flex md: flex-col md:gap-5 xl:gap-7 mt-[8%]">

      <div className="w-[442px] gap-[5px]">
        <h2 className="md:text-3xl xl:text-4xl font-extrabold text-[#0B1727] ">First, the essentials</h2>
        <p className="md:text-[16px] xl:text-[20px] text-[#0B1727] font-normal">
          This helps members recognize and trust you.
        </p>
      </div>

      {/* <div></div> */}
      <div className="space-y-2 relative">
        <label htmlFor="fullName" className="text-[16px] font-light text-gray-700 absolute top-[-12px] left-8 px-3.5 pt-0.5 bg-white">
          Full Name
        </label>
        <Input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Name Surname"
          value={formData.fullName}
          onChange={handleChange}
          className="pl-11.5 md:w-[25rem] xl:w-[29rem]"
        />
      </div>

      <div className="space-y-2 relative">
        <label htmlFor="position" className="text-[16px] font-light text-gray-700 absolute top-[-12px] left-8 px-3.5 pt-0.5 bg-white">
          Position
        </label>
        <Input
          type="email"
          id="position"
          name="position"
          placeholder="username@gmail.com"
          value={formData.position}
          onChange={handleChange}
          className="pl-11.5 md:w-[25rem] xl:w-[29rem]"
        />
      </div>

      <div className="space-y-2 relative">
        <label htmlFor="password" className="text-[16px] font-light text-gray-700 absolute top-[-12px] left-8 px-3.5 pt-0.5 bg-white">
          Password
        </label>
        <Input
          type="password"
          id="password"
          name="password"
          // placeholder="username@gmail.com"
          value={formData.password}
          onChange={handleChange}
          className="pl-11.5 md:w-[25rem] xl:w-[29rem]"
        />
      </div>

      <div className="space-y-2 relative">
        <label htmlFor="confirmpassword" className="text-[16px] font-light text-gray-700 absolute top-[-12px] left-8 px-3.5 pt-0.5 bg-white">
          Confirm Password
        </label>
        <Input
          type="password"
          id="confirmpassword"
          name="confirmpassword"
          // placeholder="username@gmail.com"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="pl-11.5 md:w-[25rem] xl:w-[29rem]"
        />
      </div>

      <div className="flex items-center gap-10 ml-10">
        {/* Profile Picture Section */}
        <div className="flex items-center gap-4">
          {/* File input is hidden */}
          <input
            id="profilePictureInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          <label
            htmlFor="profilePictureInput"
            className="cursor-pointer relative md:w-18 md:h-18 xl:w-20 xl:h-20 rounded-full border-gray-400 flex items-center justify-center overflow-hidden"
          >
            {profilePicture ? (
              // Display the selected image if one exists
              <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <img src="/add-pic-icon.png" alt="" className="w-20 h-20" />
            )}
          </label>

        </div>

        <div className="flex flex-col text-sm w-[278px]">
          <span className="font-semibold text-[16px]">Add a profile picture</span>
          <span className="text-[13px] font-[300] text-gray-500">
            Builds trust, personalizes experience, and enhances engagement.
          </span>

        </div>
      </div>
        <Button className="md:w-[25rem] xl:w-[29rem] md:h-[3.5rem] xl:h-[4rem] rounded-2xl bg-[#2ABFBB] text-xl font-semibold hover:bg-[#0B1C33] cursor-pointer md:mb-3 " onClick={handleSubmit}>Proceed</Button>
    </div>
  );
};

export default Step1;