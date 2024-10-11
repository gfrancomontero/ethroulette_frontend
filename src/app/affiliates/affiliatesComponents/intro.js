import ExplanationModal from "./explanationModal";
import TermsAndConditions from "./termsAndConditions";

export default function Affiliates() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-900 text-white p-6 space-y-12">
      <h1 className="font-overpass text-4xl md:text-5xl lg:text-6xl text-yellow-300 mb-4 text-center">
        Earn ETH by Referring Users
      </h1>
      <div className="font-overpass text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl text-center leading-relaxed space-y-4 p-4 bg-gray-800 rounded-lg shadow-md">
        <p>
          Keep <span className="text-yellow-300 font-bold">50% of profits</span> from the users you bring in. Our referral program is designed to reward you with serious ETH while you help us grow. 🤑💸
        </p>
        <p>
          Reach out to us on Telegram to get your exclusive referral link, and you’ll earn 50% of the total profits generated from your referrals. When they lose, you win—it’s that straightforward. 💼
        </p>
        <p>
          The more players you bring in, the more ETH you rake in. Start referring, start earning, and let’s build that crypto stash together. 🚀⚡
        </p>
        <p>
          We pay you out weekly on Fridays.
        </p>
        <p className="text-yellow-300 font-semibold">
          #ReferralFlex #Web3Earnings
        </p>
      </div>
      <div className="w-full max-w-sm md:max-w-lg">
        <ExplanationModal />
        <TermsAndConditions />
      </div>
    </div>
  );
}
