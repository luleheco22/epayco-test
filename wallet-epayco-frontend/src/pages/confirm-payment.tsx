import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";

import { useWallet } from "../context/walletContext";

const ConfirmPayment: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { confirmPayment, isConfirmed } = useWallet();

  const token = searchParams.get("token");
  const sessionId = searchParams.get("sessionId") || "0";
  const amount = parseInt(searchParams.get("amount") || "0", 10);

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleConfirmPayment = useCallback(async () => {
    if (!code) {
      setError("Please enter the code.");

      return;
    }

    setLoading(true);
    try {
      await confirmPayment({ token: code, sessionId, amount });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [code, confirmPayment, token, sessionId, amount]);

  const clearUrlParams = () => {
    window.history.replaceState(null, "", window.location.pathname);
  };

  useEffect(() => {
    clearUrlParams();
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-1000 "bg-[#dfddba]" ${
        isConfirmed ? "bg-[#06d6a0]" : "bg-[#dfddba]"
      }`}
    >
      <div className="text-center">
        {loading ? (
          <Spinner color="success" size="lg" />
        ) : (
          <>
            <h1 className="text-3xl font-bold text-slate-100 mb-5">
              {isConfirmed ? "Successful Payment" : "Enter Code to Confirm"}
            </h1>
            {isConfirmed ? (
              <p className="text-gray-500">
                Thank you for your purchase. Your payment has been processed
                successfully.
              </p>
            ) : (
              <>
                <div className="space-y-2">
                  <input
                    className="p-2 border rounded"
                    placeholder="Enter confirmation code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <Button
                  className="bg-green-300 mt-4 mr-5"
                  onClick={handleConfirmPayment}
                >
                  Confirm Payment
                </Button>
              </>
            )}
          </>
        )}
        <Button className="bg-slate-300 mt-4" onClick={() => navigate("/")}>
          Return
        </Button>
      </div>
    </div>
  );
};

export default ConfirmPayment;
