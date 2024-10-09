'use client';

import { SendMail } from './components/SendMail';
import { SetNewPassword } from './components/SetNewPassword';
import { VerifyCode } from './components/VerifyCode';
import { ForgotPasswordStep } from './constant';
import { useLogic } from './hooks/useLogic';

export const ForgotPassword = () => {
  const {
    step,
    loadingSendMail,
    loadingVerify,
    errorVerifyMess,
    errorSend,
    loadingChangePass,
    changeSuccess,
    errorChange,
    handleChange,
    setStep,
    handleSendMail,
    handleVerifyCode,
  } = useLogic();

  return (
    <>
      {step === ForgotPasswordStep.sendEmail && <SendMail message={errorSend} isPending={loadingSendMail} handleSendMail={handleSendMail} />}
      {step === ForgotPasswordStep.verifyEmail && (
        <VerifyCode message={errorVerifyMess} setStep={setStep} isPending={loadingVerify} handleVerifyCode={handleVerifyCode} />
      )}
      {step === ForgotPasswordStep.setNewPassword && (
        <SetNewPassword successMess={changeSuccess} errorMess={errorChange} isPending={loadingChangePass} handleChange={handleChange} />
      )}
    </>
  );
};
