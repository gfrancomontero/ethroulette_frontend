"use client";
import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function TermsAndConditionsModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-full flex justify-center items-center">
      {/* Button to open the modal */}
      <Button auto shadow color="gradient" className="w-full max-w-xs md:max-w-md lg:max-w-lg" onPress={onOpen}>
        View Terms & Conditions
      </Button>

      {/* Modal */}
      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange} className="bg-gray-900">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="bg-gray-800 text-center py-4">
                <h2 className="text-yellow-400 text-2xl md:text-3xl lg:text-4xl">
                  Terms & Conditions
                </h2>
              </ModalHeader>

              <ModalBody className="text-white max-h-[calc(100vh-200px)] overflow-auto p-6 bg-gray-900">
                <div className="space-y-6">
                  <p className="text-lg md:text-xl lg:text-2xl">
                    We’re excited to have you as part of our affiliate program! Before getting started, please read through our terms and conditions to understand how things work.
                  </p>

                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-blue-300">Potential Changes to the Program</h2>
                    <p>
                      As a small, do-it-yourself (DIY) business, we reserve the right to change the affiliate payout rate, program structure, or any other terms at any time. This means that percentages, rates, and even the availability of the platform could change in the future based on the business needs.
                    </p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-red-400">Account Balance & Referral Earnings</h2>
                    <p>
                      While we strive to provide a seamless experience, there may be instances where your referral balance is adjusted or reset. Although we will do our best to maintain transparency, please be aware that your earnings could change without notice if unforeseen technical or business challenges arise.
                    </p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-green-400">Platform Availability</h2>
                    <p>
                      The platform may experience downtime, or in the worst-case scenario, be taken down permanently. If this happens, we may not be able to provide prior notice. We assure you that our goal is to keep things running as smoothly as possible, but being a DIY business, we can&apos;t guarantee consistency at all times.
                    </p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-yellow-400">Commitment to Transparency</h2>
                    <p>
                      We’re committed to being transparent with you, and we’ll communicate any major changes through the appropriate channels. Your participation and support mean a lot to us, and we’ll always strive to do our best to honor the referral earnings whenever possible.
                    </p>
                  </div>

                  <p className="text-lg md:text-xl lg:text-2xl mt-10">
                    By continuing to participate in our affiliate program, you acknowledge and agree to these terms and conditions. We’re grateful for your understanding and support as we continue to grow together. 🚀
                  </p>
                </div>
              </ModalBody>

              <ModalFooter className="bg-gray-800 text-center py-4">
                <Button auto flat color="danger" className="w-full md:w-auto" onPress={onClose}>
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
