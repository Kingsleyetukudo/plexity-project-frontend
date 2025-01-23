import AppraisalBox from "../components/appraisalBox";

const Appraisal = () => {
  return (
    <>
      <div className="grid gap-8">
        <div className="flex justify-between items-center md:my-5">
          <h1 className="font-extrabold text-xl md:text-3xl">My Apprisals</h1>
          <div>
            <button className="md:text-xl font-semibold md:font-bold px-4 py-2 md:px-8 md:py-3 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1">
              Appriase
            </button>
          </div>
        </div>
        <AppraisalBox />
        <AppraisalBox />
        <AppraisalBox />
        <AppraisalBox />
      </div>
    </>
  );
};

export default Appraisal;
