import * as React from "react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
const cn = (...args: string[]) => twMerge(...args);
// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline'; // Make variant optional
  className?: string; // Make className optional
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className = '', variant = 'default', ...props }, ref) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
  };
  return (
    <button
      className={cn(baseClasses, variants[variant], className)} // Now className is guaranteed to be a string
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";
// Toggle Component
interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  className?: string; // Make className optional
}
const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(({ className = '', pressed, onPressedChange, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        pressed ? "bg-[#0B1727]" : "bg-gray-300",
        className // Now className is guaranteed to be a string
      )}
      onClick={() => onPressedChange(!pressed)}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-7 w-10 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out",
          pressed ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
});
Toggle.displayName = "Toggle";
// Step4 Component
interface Step4Props {
  onNext: (data: any) => void;
  onPrevious: () => void;
}
const Step4: React.FC<Step4Props> = ({ onNext, onPrevious }) => {
  const [visibility, setVisibility] = useState({
    activateSmartMatching: false,
    showProfileInSearches: false,
    displayDealInterests: false,
    hideActivityStatus: false,
  });
  const handleToggle = (name: keyof typeof visibility, pressed: boolean) => {
    setVisibility((prevVisibility) => ({ ...prevVisibility, [name]: pressed }));
  };
  const handleSubmit = () => {
    onNext(visibility);
  };
  return (
    <div className="flex flex-col mt-[5%] gap-14">
      <div className="md:w-full xl:w-[533px] gap-[5px]">
        <h2 className="md:text-3xl xl:text-4xl font-extrabold text-[#0B1727]">Control your visibility</h2>
        <p className="md:text-[16px] xl:text-[20px] text-[#0B1727] font-normal">
          You can change these anytime.
        </p>
      </div>

      <div className="flex flex-col gap-7">
        {/* Activate Smart Matching */}
        <div className="flex items-center justify-between">
          <div className="w-[243px] py-1">
            <h3 className="text-[16px] font-semibold text-[#0B1727]">
              Activate Smart Matching
            </h3>
            <p className="text-[13px] font-normal text-gray-500">
              We'll suggest 3-5 tailored networks weekly.
            </p>
          </div>
          <Toggle
            pressed={visibility.activateSmartMatching}
            onPressedChange={(pressed) =>
              handleToggle("activateSmartMatching", pressed)
            }
          />
        </div>
        {/* Show Profile in Searches */}
        <div className="flex items-center justify-between">
          <div className="w-[243px] py-1">
            <h3 className="text-[16px] font-semibold text-[#0B1727]">
              Show Profile in Searches
            </h3>
            <p className="text-[13px] font-normal text-gray-500">
              Your name/industry will appear in results.
            </p>
          </div>
          <Toggle
            pressed={visibility.showProfileInSearches}
            onPressedChange={(pressed) =>
              handleToggle("showProfileInSearches", pressed)
            }
          />
        </div>
        {/* Display Deal Interests */}
        <div className="flex items-center justify-between">
          <div className="w-[243px] py-1">
            <h3 className="text-[16px] font-semibold text-[#0B1727]">
              Display Deal Interests
            </h3>
            <p className="text-[13px] font-normal text-gray-500">
              Helps partners identify collaboration potential.
            </p>
          </div>
          <Toggle
            pressed={visibility.displayDealInterests}
            onPressedChange={(pressed) =>
              handleToggle("displayDealInterests", pressed)
            }
          />
        </div>
        {/* Hide Activity Status */}
        <div className="flex items-center justify-between">
          <div className="w-[243px] py-1">
            <h3 className="text-[16px] font-semibold text-[#0B1727]">
              Hide Activity Status
            </h3>
            <p className="text-[13px] font-normal text-gray-500">
              When ON, others won't see when you're online.
            </p>
          </div>
          <Toggle
            pressed={visibility.hideActivityStatus}
            onPressedChange={(pressed) =>
              handleToggle("hideActivityStatus", pressed)
            }
          />
        </div>
      </div>

      {/* <div className="flex justify-between mt-6 w-[29rem] mx-auto">
                <Button variant="outline" className="w-[14rem] h-[4rem] rounded-2xl border-2 text-xl font-semibold" onClick={onPrevious}>
                    Previous
                </Button>
                <Button className="w-[14rem] h-[4rem] rounded-2xl bg-[#2ABFBB] text-xl font-semibold hover:bg-[#0B1C33]" onClick={handleSubmit}>
                    Proceed
                </Button>
            </div> */}
      <Button className="md:w-[25rem] xl:w-[29rem] md:h-[3.5rem] xl:h-[4rem] rounded-2xl bg-[#2ABFBB] text-xl font-semibold hover:bg-[#0B1C33] cursor-pointer md:mb-3 " onClick={handleSubmit}>Proceed</Button>
    </div>
  );
};
export default Step4;