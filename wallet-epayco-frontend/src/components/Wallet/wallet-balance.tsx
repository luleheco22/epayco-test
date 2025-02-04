import React, { useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";

import { MoneyCashBagDollarBagPaymentCashMoneyFinance } from "../icons";
import { useWallet } from "../../context/walletContext";

import RechargeWallet from "./recharge-wallet"; // Asegúrate de importar la función correcta
import PaymentWallet from "./payment-wallet";

const WalletBalance: React.FC = () => {
  const { customer, balance, fetchBalance, token } = useWallet();

  useEffect(() => {
    fetchBalance(customer?.document, customer?.phone);
  }, [customer?.document, customer?.phone, token]);

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full max-w-[800px]">
        <CardHeader className="flex justify-between items-center p-4 gap-4">
          <div className="flex items-center">
            <div className="text-yellow-500 text-6xl mr-4">
              <MoneyCashBagDollarBagPaymentCashMoneyFinance />
            </div>
            <div className="flex-col">
              <p className="text-md">Wallet</p>
              <p className="text-small text-default-500">Balance: </p>
              <p className="text-lg font-semibold text-green-600">
                {balance !== null ? `$${balance}` : "Cargando..."}
              </p>
            </div>
          </div>
          <RechargeWallet />
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-4 p-4">
          <p className="text-center text-default-500 mb-4">
            Your wallet details
          </p>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-default-500">Name: {customer?.name}</p>
            <p className="text-sm text-default-500">Phone: {customer?.phone}</p>
            <p className="text-sm text-default-500">
              Document: {customer?.document}
            </p>
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="flex">
          <PaymentWallet />
        </CardFooter>
      </Card>
    </div>
  );
};

export default WalletBalance;
