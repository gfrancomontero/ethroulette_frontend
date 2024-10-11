"use client";
import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function ExplanationModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      {/* Button to open the modal */}
      <Button auto shadow color="gradient" className="w-full" onPress={onOpen}>
        Understand our 50% profit payout percentage
      </Button>

      {/* Modal */}
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange} className="bg-gray-900">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className="text-yellow-400 text-2xl">Affiliate Payout Calculation</h2>
              </ModalHeader>

              <ModalBody className="text-white max-h-[calc(100vh-200px)] overflow-auto">
                <div className="space-y-4">
                  <p className="text-lg">
                    Understanding how much you can earn as an affiliate is crucial. Our payout structure is designed to ensure that, on average, you earn as much as we do on the losses of your users. This means that even though the affiliate payout rate is set at <span className="font-bold text-yellow-300">9.09%</span> of user losses, you are actually earning <span className="font-bold text-yellow-300">50%</span> of our total profits from those losses. Here&apos;s how it works:
                  </p>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2 text-blue-300">Key Parameters</h2>
                    <ul className="list-disc list-inside space-y-1">
                      <li>User Win Probability: <span className="text-yellow-300">45%</span></li>
                      <li>User Loss Probability: <span className="text-yellow-300">55%</span></li>
                      <li>Affiliate Payout Rate: <span className="text-yellow-300">9.09%</span> (of user losses)</li>
                      <li>Payout for a Win: <span className="text-yellow-300">2x</span> the bet (user gets back 2 ETH for every 1 ETH bet)</li>
                      <li>Dealer’s Share of User Losses: <span className="text-yellow-300">90.91%</span></li>
                      <li>Affiliate Share of User Losses: <span className="text-yellow-300">9.09%</span></li>
                    </ul>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2 text-green-300">Why 9.09% Payout Rate Means 50% Profit Share</h2>
                    <p>
                      Because affiliates only earn when users lose, we have to balance the total payouts between both wins and losses. The key is to set the affiliate payout rate in such a way that it represents exactly half of the dealer&apos;s total profit from user losses. Let&apos;s see how the expected earnings breakdown works:
                    </p>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-pink-400">Affiliate Earnings:</h3>
                      <p className="text-sm bg-gray-700 p-3 rounded-md font-mono">
                        Affiliate Earnings = User Loss Probability × Affiliate Share<br />
                        Affiliate Earnings = <span className="text-yellow-300">0.55 × 0.0909 = 5%</span> of the total user bet amount.
                      </p>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-indigo-400">Dealer Earnings:</h3>
                      <p className="text-sm bg-gray-700 p-3 rounded-md font-mono">
                        Dealer Earnings = User Loss Probability × Dealer Share - User Win Probability × 1 ETH<br />
                        Dealer Earnings = <span className="text-yellow-300">0.55 × 0.9091 - 0.45 = 5%</span> of the total user bet amount.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2 text-red-400">How the Payout Rate is Calculated</h2>
                    <p>
                      To ensure that you, as an affiliate, earn exactly half of our total profit on your users’ losses, we balance the expected earnings for both the dealer and the affiliate. Here’s the math:
                    </p>
                    <p className="text-sm bg-gray-700 p-3 rounded-md font-mono mt-2">
                      0.55 × (1 - 0.0909) - 0.45 = 0.55 × 0.0909
                    </p>
                    <p className="mt-4">
                      Solving for the affiliate share, we get:
                    </p>
                    <p className="text-2xl font-bold text-center text-yellow-400 mt-4">
                      X = 9.09%
                    </p>
                  </div>

                  <p className="text-lg mt-6">
                    Setting the affiliate payout rate to <span className="font-bold text-yellow-300">9.09%</span> of user losses ensures that, on average, you earn as much as we do on your users&apos; activity. This means, for every user loss, you take home 50% of the profits.
                  </p>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button auto flat color="danger" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
