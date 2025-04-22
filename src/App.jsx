import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isMoney, setisMoney] = useState(false);
  const [Amount, setAmount] = useState("");
  const [Desc, setDesc] = useState("");
  const [Expense, setExpense] = useState(0);
  const [Income, setIncome] = useState(0);
  const [Type, setType] = useState("");
  const [Transation, setTransation] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function moneyToggle() {
    setisMoney(isMoney ? false : true);
  }

  function addTransaction() {
    setTransation([...Transation, { Amount, Desc, Type }]);
    setAmount("");
    setDesc("");
    setisMoney(false);
  }

  function calculateMoney(e) {
    let exp = 0;
    let inc = 0;
    Transation.map((e) => {
      e.Type === "EXPENSE"
        ? (exp = exp + Number(e.Amount))
        : (inc = inc + Number(e.Amount));
    });
    setExpense(exp);
    setIncome(inc);
  }

  useEffect(() => {
    calculateMoney();
  }, [Transation]);

  const filterTransaction = Transation.filter((t) =>
    t.Desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  let allTransactions = (
    <h2 className="text-center font-semibold">No Transaction to Show</h2>
  );
  if (filterTransaction.length > 0) {
    allTransactions = filterTransaction.map((t, i) => {
      return (
        <div
          className={`w-full  h-fit p-3 mb-2 rounded border-r-5 ${
            t.Type === "EXPENSE" ? "border-red-500" : "border-green-500"
          } flex justify-between bg-gray-100`}
          key={i}
        >
          <h3 className="font-semibold">{t.Desc}</h3>
          <h1>{t.Amount}</h1>
        </div>
      );
    });
  }

  return (
    <>
      <div className="p-3 flex justify-center">
      <div className=" w-full md:max-w-130 border-1 rounded-2xl p-2 ">
        <div className="text-center md:text-xl font-bold">
          <h1> Expense Tracker </h1>
        </div>

        <div className="flex mt-2 p-4 h-15 items-center rounded  justify-between ">
          <div
            className={`font-bold md:text-lg ${
              Income - Expense > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {" "}
            Balance: {Income - Expense}
          </div>
          <button
            onClick={() => moneyToggle()}
            className="w-fit cursor-pointer px-4 py-2 rounded-xl bg-black text-white"
          >
            {isMoney ? "Cancel" : "Add Transaction"}
          </button>
        </div>
        {isMoney && (
          <div className="p-5 flex flex-col gap-2 items-center border-1 m-3 rounded">
            <input
              value={Amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              className="h-9 w-full border-1 rounded p-2 "
              placeholder="Amount"
              type="number"
              name=""
              id=""
            />
            <input
              value={Desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              className="h-9 w-full border-1 rounded p-2 "
              placeholder="Description"
              type="text"
              name=""
              id=""
            />
            <div className="flex gap-2">
              <input
                className="cursor-pointer"
                value={"EXPENSE"}
                checked={Type === "EXPENSE"}
                onChange={(e) => {
                  setType(e.target.value);
                }}
                type="radio"
                name="type"
                id="Expense"
              />
              <label>Expense</label>
              <input
                className="cursor-pointer"
                value={"INCOME"}
                checked={Type === "INCOME"}
                onChange={(e) => {
                  setType(e.target.value);
                }}
                type="radio"
                name="type"
                id="Income"
              />
              <label>Income</label>
            </div>
            <button
              onClick={() => {
                addTransaction();
              }}
              className="w-fit cursor-pointer px-4 py-2 rounded-xl bg-black text-white"
            >
              SUBMIT
            </button>
          </div>
        )}

        <div className="flex mt-1.5 p-4 gap-4 h-30 items-center mx-5 rounded  justify-between">
          <div className=" text-center w-[40%] h-25 px-2 py-2 border-1 rounded-2xl content-center">
            <h4 className="font-semibold">Expense</h4>
            <h2 className="font-bold text-xl text-red-600">{Expense} Rs</h2>
          </div>
          <div className="text-center w-[40%] h-25 px-2 py-2 border-1 rounded-2xl content-center">
            <h3 className="font-semibold">Income</h3>
            <h2 className="font-bold text-xl text-green-600">{Income} Rs</h2>
          </div>
        </div>

        <div className="p-4 h-50 flex flex-col gap-2 bg-gray-300 overflow-scroll rounded-2xl scrollbar-hide">
          <h2 className="font-bold">Transactions</h2>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-200 rounded-xl p-2"
            placeholder="Search"
            type="search"
            name=""
            id=""
          />
          <div className="">{allTransactions}</div>
        </div>
      </div>
      </div>
    </>
  );
}

export default App;
