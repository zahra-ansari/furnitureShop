import { MoonLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <MoonLoader color="#2cc42c" size={80} />
    </div>
  );
}

export default Spinner;
