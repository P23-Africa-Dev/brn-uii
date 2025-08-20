import { useState } from 'react';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import LoadingState from './components/LoadingState';
import './styles.css';
// Define a type for the step numbers
type Step = 1 | 2 | 3 | 4 | 5;
function App() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState({});
  const nextStep = (data: any) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setCurrentStep((prevStep) => {
      if (prevStep < 5) {
        return (prevStep + 1) as Step;
      }
      return prevStep;
    });
  };
  const prevStep = () => {
    setCurrentStep((prevStep) => {
      if (prevStep > 1) {
        return (prevStep - 1) as Step;
      }
      return prevStep;
    });
  };
  const handleSubmit = () => {
    console.log('Form Data:', formData);
    setCurrentStep(5);
    setTimeout(() => {
      alert('Dashboard Prepared!');
      setCurrentStep(1);
      setFormData({});
    }, 2000);
  };
  return (
    // Main container for the full screen layout
    <div className="flex flex-col md:flex-row md:h-screen xl:min-h-screen">
      {currentStep === 5 ? (
        <div className="flex-1 flex items-center justify-center"> {/* Center the LoadingState */}
          <LoadingState />
        </div>
      ) : (
        <>
          {/* Left Column */}
          <div className="w-full md:w-[38%] bg-[#0B1727] text-white py-8 flex flex-col justify-between shadow-divider-right">
            {/* Background pattern image */}
            <div className="ml-4 md:ml-[15%] relative z-10 flex flex-col justify-between h-full">
              <div className='w-full md:w-[308px] mt-[5%]'>
                {currentStep === 1 && (
                  <>
                    <h1 className="text-2xl md:text-4xl font-semibold mb-2">Let's get you started!</h1>
                    <p className="text-sm text-gray-300 mb-4 w-[80%]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    </p>
                  </>
                )}
                {currentStep === 2 && (
                  <span className='flex flex-col gap-10'>
                    <h1 className="text-2xl md:text-4xl font-semibold mb-2">Company Snapshot</h1>
                    <p className="text-sm text-gray-300 mb-4 w-[80%]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    </p>
                  </span>
                )}
                {currentStep === 3 && (
                  <>
                    <h1 className="text-2xl md:text-4xl font-extralight mb-2">Almost There!</h1>
                    <h1 className="text-2xl md:text-4xl font-semibold mb-2">Superpowers</h1>
                    <p className="text-sm text-gray-300 mb-4 w-[80%]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    </p>
                  </>
                )}
                {currentStep === 4 && (
                  <>
                    <h1 className="text-2xl md:text-4xl font-extralight mb-2">We are Here!</h1>
                    <h1 className="text-2xl md:text-4xl font-semibold mb-2">Profile Visibility</h1>
                    <p className="text-sm text-gray-300 mb-4 w-[80%]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    </p>
                  </>
                )}
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${currentStep >= step ? 'border-white bg-white text-[#0B1727]' : 'border-gray-300 text-gray-300'
                        }`}
                    >
                      {step}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-300">Step {currentStep}/4</p>
              </div>
            </div>
            <img src="/pattern-left.png" alt="" />
            <div className="text-sm w-64 font-light text-gray-300 ml-[15%] my-[7%]">
              Already have an account? <span className="font-semibold cursor-pointer italic ">Sign In Need Help?</span>
            </div>
          </div>
          {/* Vertical divider line */}
          <div className="w-8 background_gradient shadow-[4px_0_10px_rgba(0,0,0,0.5)]"></div>
          {/* Right Column */}
          <div className="flex-1 md:ml-0 xl:ml-8 px-[10%] relative overflow-y-auto bg-cover bg-center" style={{ backgroundImage: "url('/bg-right.png')" }}>
            <div className="">
              {currentStep === 1 && <Step1 onNext={nextStep} />}
              {currentStep === 2 && <Step2 onNext={nextStep} onPrevious={prevStep} />}
              {currentStep === 3 && <Step3 onNext={nextStep} onPrevious={prevStep} />}
              {currentStep === 4 && <Step4 onNext={handleSubmit} onPrevious={prevStep} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default App;