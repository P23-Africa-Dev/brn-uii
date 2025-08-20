import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
interface Step2Props {
    onNext: (data: unknown) => void;
    onPrevious: () => void;
}
interface FormData {
    companyName: string;
    companyDescription: string;
    industry: string;
    interestedIndustries: string[];
}
// const Step2: React.FC<Step2Props> = ({ onNext, onPrevious }) => {
const Step2: React.FC<Step2Props> = ({ onNext }) => {
    const [formData, setFormData] = useState<FormData>({
        companyName: "",
        companyDescription: "",
        industry: "",
        interestedIndustries: [],
    });
    const [notification, setNotification] = useState<string | null>(null); // State for notification
    const industries = [
        "Business",
        "Engineering",
        "Tech",
        "Health Care",
        "Telecommunication",
        "Tourism",
    ];
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleIndustryChange = (value: string) => {
        setFormData((prevData) => ({ ...prevData, industry: value }));
    };
    const handleInterestedIndustryChange = (industry: string) => {
        setFormData((prevData) => {
            const isSelected = prevData.interestedIndustries.includes(industry);
            const currentCount = prevData.interestedIndustries.length;
            // If the industry is already selected, remove it
            if (isSelected) {
                return {
                    ...prevData,
                    interestedIndustries: prevData.interestedIndustries.filter((i) => i !== industry),
                };
            }
            // If the industry is not selected and the limit of 5 is not reached, add it
            else if (currentCount < 5) {
                setNotification(null); // Clear notification
                return {
                    ...prevData,
                    interestedIndustries: [...prevData.interestedIndustries, industry],
                };
            }
            // If the limit is reached, set notification
            setNotification("You can select a maximum of 5 industries.");
            return prevData;
        });
    };
    const handleSubmit = () => {
        // Add validation logic here
        onNext(formData);
    };
    return (
        <div className="hidden md:flex flex-col gap-7 mt-[5%] ">
            <div className="xl:w-[533px] gap-[5px]">
                <h2 className="md:text-3xl xl:text-4xl font-extrabold text-[#0B1727]">Tell us about your company</h2>
                <p className="md:text-[16px] xl:text-[20px] text-[#0B1727] font-normal">
                    We'll use this to find your perfect matches.
                </p>
            </div>
            <div className="space-y-2 relative">
                <label htmlFor="companyName" className="text-[16px] font-light text-gray-700 absolute top-[-12px] left-8 px-3.5 pt-0.5 bg-white">
                    Company Name
                </label>
                <Input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="pl-11.5 md:w-[25rem] xl:w-[29rem]"
                />
            </div>
            <div className="space-y-2 relative">
                <label htmlFor="companyDescription" className="text-[16px] font-light text-gray-700 absolute top-[-12px] left-8 px-3.5 pt-0.5 bg-white">
                    What does your company do
                </label>
                <Input
                    type="text"
                    id="companyDescription"
                    name="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleChange}
                    className="pl-11.5 md:w-[25rem] xl:w-[29rem]"
                />
            </div>
            <div className="space-y-2 relative">
                <label htmlFor="industry" className="text-[16px] font-light text-gray-700 absolute top-[-12px] left-8 px-3.5 pt-0.5 bg-white">
                    Select interested industry
                </label>
                <Select onValueChange={handleIndustryChange}>
                    <SelectTrigger className="md:w-[25rem] xl:w-[29rem]">
                        <SelectValue placeholder="" className="" />
                    </SelectTrigger>
                    <SelectContent>
                        {industries.map((industry) => (
                            <SelectItem key={industry} value={industry} className="cursor-pointer">
                                {industry}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col md:w-[28rem] xl:w-[32rem] px-10 gap-3">
                <p className="text-[13px] font-normal text-gray-500 mb-2">
                    Select from 5 broad categories
                </p>
                <div className="flex flex-wrap gap-4">
                    {industries.map((industry) => {
                        const isSelected = formData.interestedIndustries.includes(industry);
                        const isLimitReached = formData.interestedIndustries.length >= 5 && !isSelected;
                        return (
                            <div
                                key={industry}
                                className={`flex items-center space-x-2 h-11 bg-white border-gray-300 rounded-full py-3 px-8 shadow-md shadow-gray-300 cursor-pointer transition-all 
                                    ${isLimitReached ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#0B1727]'}`}
                                onClick={() => {
                                    if (!isLimitReached) {
                                        handleInterestedIndustryChange(industry);
                                    }
                                }}
                            >
                                <img
                                    src={isSelected ? "/badge-checked.svg" : "/badge-unchecked.svg"}
                                    alt={industry}
                                    className="h-6 w-6" // Adjust size as needed
                                />
                                <label
                                    htmlFor={`interested-${industry}`}
                                    className={`text-[16px] font-normal font-gt-walsheim ${isSelected ? "text-[#0B1727]" : "text-gray-400"} cursor-pointer`}
                                >
                                    {industry}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>
            {notification && (
                <div className="text-red-500 text-sm mt-2">{notification}</div> // Notification message
            )}

            {/* <div className="flex justify-between">
                  <Button variant="outline" onClick={onPrevious}>
                      Previous
                  </Button>
                  <Button onClick={handleSubmit}>Proceed</Button>
              </div> */}
            <Button className="md:w-[25rem] xl:w-[29rem] md:h-[3.5rem] xl:h-[4rem] rounded-2xl bg-[#2ABFBB] text-xl font-semibold hover:bg-[#0B1C33] cursor-pointer md:mb-3 " onClick={handleSubmit}>Proceed</Button>
        </div>
    );
};
export default Step2;