import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';
import PinInput from '@/components/ui/PinInput';
import FormInput from '@/components/ui/FormInput';
import { MODAL_STEPS, PAYMENT_TABS, COUNTDOWN_TIME } from '@/constants/modalStates';

const CreateOrderModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(MODAL_STEPS.FORM);
  const [activeTab, setActiveTab] = useState(PAYMENT_TABS.QR);
  const [pinCode, setPinCode] = useState('');
  const [countdown, setCountdown] = useState(COUNTDOWN_TIME);
  const [formData, setFormData] = useState({
    articleNumber: '',
    totalAmount: '',
    reference: ''
  });

  const tabs = [
    { id: PAYMENT_TABS.QR, label: 'QR de orden' },
    { id: PAYMENT_TABS.CODE, label: 'Código de pago' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(MODAL_STEPS.PAYMENT);
  };

  const handleBack = () => {
    if (step === MODAL_STEPS.CONFIRM) {
      // Go back to previous step based on where we came from
      if (formData.articleNumber || formData.totalAmount) {
        setStep(MODAL_STEPS.PAYMENT);
      } else {
        setStep(MODAL_STEPS.FORM);
      }
    } else if (step === MODAL_STEPS.WAITING) {
      setStep(MODAL_STEPS.PAYMENT);
      setCountdown(COUNTDOWN_TIME);
    } else if (step === MODAL_STEPS.PAYMENT) {
      setStep(MODAL_STEPS.FORM);
      setActiveTab(PAYMENT_TABS.QR);
      setPinCode('');
    } else {
      onClose();
    }
  };

  const handleContinueWithCode = () => {
    setStep(MODAL_STEPS.WAITING);
    setCountdown(COUNTDOWN_TIME);
  };

  const handleCloseModal = () => {
    // Show confirmation step if user has entered data
    if (formData.articleNumber || formData.totalAmount || formData.reference || step === MODAL_STEPS.PAYMENT || step === MODAL_STEPS.WAITING) {
      setStep(MODAL_STEPS.CONFIRM);
    } else {
      resetAndClose();
    }
  };

  const resetAndClose = () => {
    // Reset everything when closing
    setStep(MODAL_STEPS.FORM);
    setActiveTab(PAYMENT_TABS.QR);
    setPinCode('');
    setCountdown(COUNTDOWN_TIME);
    setFormData({
      articleNumber: '',
      totalAmount: '',
      reference: ''
    });
    onClose();
  };

  const handleConfirmExit = () => {
    resetAndClose();
  };

  // Timer effect for countdown
  useEffect(() => {
    let timer;
    if (step === MODAL_STEPS.WAITING && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (step === MODAL_STEPS.WAITING && countdown === 0) {
      // Automatically move to success step when countdown reaches 0
      setTimeout(() => {
        setStep(MODAL_STEPS.SUCCESS);
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [countdown, step]);

  const renderFormStep = () => (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <h3 className="text-base font-inter font-medium text-text-primary">
          Llena los campos para crear la orden
        </h3>

        {/* Article Number Field */}
        <FormInput
          id="articleNumber"
          name="articleNumber"
          label="Número de artículos"
          placeholder="0"
          value={formData.articleNumber}
          onChange={handleInputChange}
          autoFocus
        />

        {/* Total Amount Field */}
        <FormInput
          id="totalAmount"
          name="totalAmount"
          label="Monto total"
          placeholder="0.00"
          value={formData.totalAmount}
          onChange={handleInputChange}
          prefix="$"
        />

        {/* Reference Field */}
        <FormInput
          id="reference"
          name="reference"
          label="Referencia"
          placeholder="123456789123"
          value={formData.reference}
          onChange={handleInputChange}
          optional
        />

        {/* Submit Button */}
        <div className="flex justify-center pt-8">
          <Button 
            type="submit" 
            className="min-w-[200px]"
            disabled={!formData.articleNumber || !formData.totalAmount}
          >
            Continuar
          </Button>
        </div>
      </form>
    </>
  );

  const renderConfirmStep = () => (
    <div className="flex flex-col justify-between" style={{ minHeight: '350px' }}>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          {/* Title */}
          <h3 className="text-2xl font-dm-sans font-bold text-text-primary">
            ¿Quieres salir?
          </h3>
          
          {/* Message */}
          <p className="text-base font-inter text-text-secondary">
            Al salir, tendrás que crear de nuevo la orden.
          </p>
        </div>
      </div>
      
      {/* Button */}
      <div className="flex justify-center pt-8">
        <Button 
          type="button"
          onClick={handleConfirmExit}
          variant="primary"
          className="min-w-[120px] bg-red-500 hover:bg-red-600 active:bg-red-700 border-red-500"
        >
          Salir
        </Button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="flex flex-col justify-between" style={{ minHeight: '350px' }}>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6">
          {/* Check Icon */}
          <div className="flex justify-center">
            <img 
              src="/check.svg" 
              alt="Success" 
              className="w-16 h-16"
            />
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-dm-sans font-bold text-text-primary">
            Aprobamos la orden
          </h3>
          
          {/* Subtitle */}
          <p className="text-base font-inter text-text-secondary">
            Ya puedes entregar los productos.
          </p>
        </div>
      </div>
      
      {/* Bottom section */}
      <div className="flex justify-center pt-8">
        <Button 
          type="button"
          onClick={resetAndClose}
          className="min-w-[200px]"
        >
          Continuar
        </Button>
      </div>
    </div>
  );

  const renderWaitingStep = () => (
    <div className="flex flex-col justify-between" style={{ minHeight: '350px' }}>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6">
          {/* Loader Icon */}
          <div className="flex justify-center">
            <img 
              src="/loader.svg" 
              alt="Loading" 
              className="w-12 h-12"
            />
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-dm-sans font-bold text-text-primary">
            Estamos esperando a que se complete la compra
          </h3>
          
          {/* Subtitle */}
          <p className="text-base font-inter text-text-secondary">
            En cuanto esté lista, te confirmaremos la orden.
          </p>
        </div>
      </div>
      
      {/* Bottom section */}
      <div className="pt-8">
        {/* Countdown */}
        <p className="text-center text-primary font-inter text-sm">
          {countdown > 0 ? `00:${countdown.toString().padStart(2, '0')}` : '00:00'}
        </p>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <>
      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <Tabs 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Total Amount */}
      <div className="text-center mb-6">
        <p className="text-base font-inter font-medium text-text-primary">
          Monto total: ${formData.totalAmount || '474'}
        </p>
      </div>

      {/* Tab Content */}
      {activeTab === PAYMENT_TABS.QR ? (
        <div className="space-y-6">
          <p className="text-center text-base font-inter text-text-secondary">
            Muestra el código QR.
          </p>
          
          {/* QR Code */}
          <div className="flex justify-center">
            <img 
              src="/QR.png" 
              alt="QR Code" 
              className="w-56 h-56 object-contain"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-center text-base font-inter text-text-secondary">
            Ingresa el código de pago de quien compra.
          </p>
          
          {/* PIN Input */}
          <div className="py-4">
            <PinInput 
              length={6}
              value={pinCode}
              onChange={setPinCode}
            />
          </div>

          {/* Helper Text */}
          <p className="text-center text-xs font-inter text-text-tertiary">
            Solo letras (A-Z) y números (0-9).
          </p>
        </div>
      )}
      
      {/* Continue Button for code tab */}
      {activeTab === PAYMENT_TABS.CODE && (
        <div className="flex justify-center pt-8">
          <Button 
            type="button"
            onClick={handleContinueWithCode}
            disabled={pinCode.length !== 6}
            className="min-w-[200px]"
          >
            Continuar
          </Button>
        </div>
      )}
    </>
  );

  const getModalTitle = () => {
    switch (step) {
      case MODAL_STEPS.FORM:
        return 'Crear orden';
      case MODAL_STEPS.PAYMENT:
        return 'Elige un método de cobro';
      case MODAL_STEPS.WAITING:
        return ' '; // Space to maintain height
      case MODAL_STEPS.SUCCESS:
        return ' '; // Space to maintain height
      case MODAL_STEPS.CONFIRM:
        return ' '; // Space to maintain height
      default:
        return 'Crear orden';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      onBack={step === MODAL_STEPS.PAYMENT || step === MODAL_STEPS.CONFIRM ? handleBack : null}
      showBackButton={step === MODAL_STEPS.PAYMENT || step === MODAL_STEPS.CONFIRM}
      showCloseButton={step !== MODAL_STEPS.CONFIRM && step !== MODAL_STEPS.WAITING && step !== MODAL_STEPS.SUCCESS}
      title={getModalTitle()}
    >
      {step === MODAL_STEPS.FORM && renderFormStep()}
      {step === MODAL_STEPS.PAYMENT && renderPaymentStep()}
      {step === MODAL_STEPS.WAITING && renderWaitingStep()}
      {step === MODAL_STEPS.SUCCESS && renderSuccessStep()}
      {step === MODAL_STEPS.CONFIRM && renderConfirmStep()}
    </Modal>
  );
};

export default CreateOrderModal;