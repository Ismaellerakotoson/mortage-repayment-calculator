import { useState } from "react";
import type { MortageForm } from "./types/types";
import MortageParameter from "./components/MortageParameter";
import MortageResult from "./components/MortageResult";

function App() {
  const [data, setData] = useState<MortageForm>({
    amount: "",
    term: "",
    rate: "",
    type: "",
  });

  const [result, setResult] = useState(0) || null;
  const [termRepay, setTermRepay] = useState(0);

  const clearAll = () => {
    setData({
      amount: "",
      rate: "",
      term: "",
      type: "",
    });
    setResult(0);
    setTermRepay(0);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-4xl bg-white md:rounded-3xl overflow-hidden md:grid md:grid-cols-2">
        <div className="p-6 md:p-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-900">
              Mortgage Calculator
            </h1>
            <button
              onClick={clearAll}
              className="text-slate-700 underline hover:text-slate-900"
            >
              Clear All
            </button>
          </div>
          <MortageParameter
            data={data}
            setData={setData}
            setResult={setResult}
            setTermRepay={setTermRepay}
          />
        </div>

        <MortageResult result={result} termRepay={termRepay} />
      </div>
    </div>
  );
}

export default App;
