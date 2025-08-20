import { Button } from "./ui/button";
import { useState } from "react";
interface Step3Props {
  onNext: (data: unknown) => void;
  onPrevious: () => void;
}
interface Skills {
  greatAt: string[];
  canHelpWith: string[];
}
const Step3: React.FC<Step3Props> = ({ onNext }) => {
  const [skills, setSkills] = useState<Skills>({
    greatAt: [],
    canHelpWith: [],
  });
  const [notification, setNotification] = useState<string | null>(null); // State for notification
  const availableSkills = ["Sales", "Fundraising", "Product", "Strategy", "Sales", "Strategy", "Product"]; // Add more skills
  const handleSkillChange = (type: "greatAt" | "canHelpWith", skill: string) => {
    setSkills((prevSkills) => {
      const currentSkills = prevSkills[type];
      if (currentSkills.includes(skill)) {
        return {
          ...prevSkills,
          [type]: currentSkills.filter((s) => s !== skill),
        };
      } else {
        if (currentSkills.length < 3) {
          setNotification(null); // Clear notification
          return {
            ...prevSkills,
            [type]: [...currentSkills, skill],
          };
        }
        setNotification(`You can select a maximum of 3 skills for ${type === "greatAt" ? "I'm great at" : "I can help others with."}`);
        return prevSkills; // Max 3 tags selected
      }
    });
  };
  const handleSubmit = () => {
    // Add validation logic here
    onNext(skills);
  };
  return (
    <div className="hidden md:flex flex-col mt-[5%] gap-4">
      <div className="md:w-full xl:w-[533px] gap-[5px]">
        <h2 className="md:text-3xl xl:text-4xl font-extrabold text-[#0B1727]">What's your secret sauce?</h2>
        <p className="md:text-[16px] xl:text-[20px] text-[#0B1727] font-normal">
          Members will search for these skills!
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">I'm great at:</h3>
        <p className="text-sm text-gray-500 mb-2">Select max 3 tags</p>
        <div className="flex flex-wrap gap-2">
          {availableSkills.map((skill) => {
            const isSelected = skills.greatAt.includes(skill);
            const isLimitReached = skills.greatAt.length >= 3 && !isSelected;
            return (
              <div
                key={skill}
                className={`flex items-center space-x-2 h-11 bg-white border-gray-300 rounded-full py-3 px-8 shadow-md shadow-gray-300 cursor-pointer transition-all 
                  ${isLimitReached ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#0B1727]'}`}
                onClick={() => {
                  if (!isLimitReached) {
                    handleSkillChange("greatAt", skill);
                  }
                }}
              >
                <img
                  src={isSelected ? "/badge-checked.svg" : "/badge-unchecked.svg"}
                  alt={skill}
                  className="h-6 w-6" // Adjust size as needed
                />
                <label
                  htmlFor={`great-at-${skill}`}
                  className={`text-[16px] font-normal font-gt-walsheim ${isSelected ? "text-[#0B1727]" : "text-gray-400"} cursor-pointer`}
                >
                  {skill}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">I can help others with:</h3>
        <p className="text-sm text-gray-500 mb-2">Select max 3 tags</p>
        <div className="flex flex-wrap gap-2">
          {availableSkills.map((skill) => {
            const isSelected = skills.canHelpWith.includes(skill);
            const isLimitReached = skills.canHelpWith.length >= 3 && !isSelected;
            return (
              <div
                key={`help-${skill}`}
                className={`flex items-center space-x-2 h-11 bg-white border-gray-300 rounded-full py-3 px-8 shadow-md shadow-gray-300 cursor-pointer transition-all 
                  ${isLimitReached ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#0B1727]'}`}
                onClick={() => {
                  if (!isLimitReached) {
                    handleSkillChange("canHelpWith", skill);
                  }
                }}
              >
                <img
                  src={isSelected ? "/badge-checked.svg" : "/badge-unchecked.svg"}
                  alt={skill}
                  className="h-6 w-6" // Adjust size as needed
                />
                <label
                  htmlFor={`help-with-${skill}`}
                  className={`text-[16px] font-normal font-gt-walsheim ${isSelected ? "text-[#0B1727]" : "text-gray-400"} cursor-pointer`}
                >
                  {skill}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      {notification && (
        <div className="text-red-500 text-sm mt-2">{notification}</div> // Notification message
      )}

      {/* <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={handleSubmit}>Proceed</Button>
      </div> */}
      <Button className="md:w-[25rem] xl:w-[29rem] md:h-[3.5rem] xl:h-[4rem] rounded-2xl bg-[#2ABFBB] text-xl font-semibold hover:bg-[#0B1C33] cursor-pointer md:mb-3 " onClick={handleSubmit}>Proceed</Button>
    </div>
  );
};
export default Step3;