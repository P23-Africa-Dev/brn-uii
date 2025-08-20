const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <div className="relative w-40 h-40">
        <img
          src="/spinner.svg"
          alt="Loading..."
          className="absolute inset-0 h-40 w-40 spinner" // the spinner class
        />
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-4xl font-bold text-[#0B1727]">Preparing Your Dashboard</h2>

        <div className="flex flex-col text-center items-center">
          <p className="text-[20px] font-light text-[#0B1727]">(This will take a few seconds)</p>
          <p className="text-sm font-normal text-[#0B1727] w-[354px] mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoadingState;