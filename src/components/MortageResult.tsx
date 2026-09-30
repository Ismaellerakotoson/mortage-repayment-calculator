import illustrationEmpty from "../assets/images/illustration-empty.svg";

interface MortageResultProps {
  result: number;
  termRepay: number;
}

function MortageResult({ result, termRepay }: MortageResultProps) {
  const hasResult = result > 0;

  return (
    <div className="flex bg-slate-900 text-white p-8 md:p-10 items-center md:rounded-tr-3xl md:rounded-br-3xl md:rounded-bl-[64px]">
      {!hasResult ? (
        <div className="flex flex-col items-center text-center py-10">
          <img
            src={illustrationEmpty}
            alt="illustration-Empty"
            className="w-40 mb-6"
          />
          <h2 className="text-xl font-bold mb-2">Results shown here</h2>
          <p className="text-slate-300 text-sm">
            Complete the form and click "calculate repayments" to see what your
            monthly repayments would be.
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-2">Your results</h2>
          <p className="text-slate-300 text-sm mb-6 mt-5">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click "calculate
            repayments" again.
          </p>
          <div className="border-t-4 border-lime bg-black/20 rounded-lg p-6 mt-10 md:p-8">
            <p className="text-slate-300 text-sm">Your monthly repayments</p>
            <p className="text-4xl md:text-5xl font-bold text-lime my-3 md:my-4">
              £{result.toFixed(2)}
            </p>
            <hr className="border-slate-700 my-4 md:my-6" />
            <p className="text-slate-300 text-sm">
              Total you'll repay over the term
            </p>
            <p className="text-xl font-bold">£{termRepay.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MortageResult;
