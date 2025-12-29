'use client';
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import PinInput from '@/components/ui/PinInput';
import { COUNTDOWN_TIME } from '@/constants/modalStates';

export default function CobrarPage() {
  const [pinCode, setPinCode] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [paymentMode, setPaymentMode] = useState('qr'); // 'qr' or 'code'
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Format number with comma for thousands
  const formatAmount = (value) => {
    const cleanValue = value.replace(/[^\d.]/g, '');
    const parts = cleanValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, '');
    if (/^\d*\.?\d*$/.test(rawValue)) {
      setTotalAmount(rawValue);
      // Hide payment methods if amount is cleared
      if (!rawValue) {
        setShowPaymentMethods(false);
        setPinCode('');
        setPaymentMode('qr');
      }
    }
  };

  const handleCharge = () => {
    if (!totalAmount) return;
    setShowPaymentMethods(true);
  };

  const startPaymentProcess = () => {
    setIsProcessing(true);
    setCountdown(COUNTDOWN_TIME);
  };

  const handleNewPayment = () => {
    setTotalAmount('');
    setPinCode('');
    setPaymentSuccess(false);
    setIsProcessing(false);
    setShowPaymentMethods(false);
    setCountdown(0);
    setPaymentMode('qr');
  };

  // Auto-process when 6-digit code is entered
  useEffect(() => {
    if (paymentMode === 'code' && pinCode.length === 6 && showPaymentMethods && !isProcessing) {
      startPaymentProcess();
    }
  }, [pinCode, paymentMode, showPaymentMethods, isProcessing]);

  // Timer effect for countdown
  useEffect(() => {
    let timer;
    if (isProcessing && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (isProcessing && countdown === 0) {
      // Payment completed
      setIsProcessing(false);
      setPaymentSuccess(true);
      // Auto reset after 3 seconds
      setTimeout(() => {
        handleNewPayment();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [countdown, isProcessing]);

  return (
    <PageLayout
      title="Cobrar"
      subtitle="Genera cobros rápidos usando códigos QR o de pago"
      showActions={false}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-lg min-h-[500px]">

          {/* Left Side - Amount Input */}
          <div className="p-8 lg:p-12">
            <h3 className="text-lg font-medium text-text-primary mb-6">
              Monto a cobrar
            </h3>

            <FormInput
              id="totalAmount"
              name="totalAmount"
              placeholder="0.00"
              value={formatAmount(totalAmount)}
              onChange={handleAmountChange}
              prefix="$"
              autoFocus
              className="mb-6"
            />

            <Button
              onClick={handleCharge}
              disabled={!totalAmount || showPaymentMethods}
              className="w-full"
            >
              Cobrar
            </Button>

            <div className="mt-8 space-y-3">
              <p className="text-sm font-medium text-text-primary">Instrucciones:</p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-sm text-text-secondary">Ingresa la cantidad y da click en cobrar</p>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-sm text-text-secondary">Muestra el código QR al cliente y pide que lo escanee</p>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-sm text-text-secondary">Espera que el cliente confirme la compra en su teléfono</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Payment Methods */}
          <div className="p-8 lg:p-12 bg-gray-50 border-t lg:border-t-0">
            {paymentSuccess ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <img
                      src="/check.svg"
                      alt="Success"
                      className="w-12 h-12"
                    />
                  </div>
                </div>
                <h2 className="text-2xl font-dm-sans font-bold text-text-primary mb-2">
                  Aprobamos la orden
                </h2>
                <p className="text-base font-inter text-text-secondary mb-2">
                  Ya puedes entregar los productos.
                </p>
                <p className="text-lg font-inter font-medium text-primary">
                  Monto cobrado: ${formatAmount(totalAmount)}
                </p>
              </div>
            ) : isProcessing ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-6">
                  <img
                    src="/loader.svg"
                    alt="Loading"
                    className="w-12 h-12 animate-spin"
                  />
                </div>
                <h3 className="text-xl font-dm-sans font-bold text-text-primary mb-2">
                  Estamos esperando a que se complete la compra
                </h3>
                <p className="text-base font-inter text-text-secondary mb-4">
                  En cuanto esté lista, te confirmaremos la orden.
                </p>
                <p className="text-2xl font-inter font-medium text-primary">
                  00:{countdown.toString().padStart(2, '0')}
                </p>
              </div>
            ) : showPaymentMethods ? (
              <>
                {paymentMode === 'qr' ? (
                  <div className="text-center">
                    <h3 className="text-xl font-medium text-text-primary mb-2">
                      Vas a cobrar: ${formatAmount(totalAmount)}
                    </h3>
                    <p className="text-sm text-text-secondary mb-6">
                      Muestra este código al cliente
                    </p>
                    <img
                      src="/QR.png"
                      alt="QR Code"
                      className="w-64 h-64 mx-auto mb-6"
                    />
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-medium text-text-primary mb-2 text-center">
                      Vas a cobrar: ${formatAmount(totalAmount)}
                    </h3>
                    <p className="text-sm text-text-secondary mb-6 text-center">
                      Ingresa el código del cliente
                    </p>
                    <PinInput
                      length={6}
                      value={pinCode}
                      onChange={setPinCode}
                    />
                    <p className="text-xs text-text-tertiary text-center mt-2">
                      6 caracteres alfanuméricos
                    </p>
                    <div className="text-center mt-6">
                      <button
                        onClick={() => {
                          setPaymentMode('qr');
                          setPinCode('');
                        }}
                        className="text-sm text-primary hover:text-blue-700 underline"
                      >
                        Cobrar con QR
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center min-h-[300px]">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-sm text-text-tertiary">
                    Ingresa un monto para continuar
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}