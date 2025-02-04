import WalletBalance from "../components/Wallet/wallet-balance";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-2 py-2 md:py-2">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title({ color: "green" })}>Recharge,&nbsp;</span>
          <span className={title({ color: "green" })}>Buy&nbsp;</span>
          <span className={title()}>and Control&nbsp;</span>
          <br />
          <span className={title()}>your&nbsp;</span>
          <span className={title({ color: "green" })}>Balance&nbsp;</span>
          <span className={title()}>Instantly</span>
        </div>

        <div className="flex gap-3 mt-10">
          <WalletBalance />
        </div>
      </section>
    </DefaultLayout>
  );
}
