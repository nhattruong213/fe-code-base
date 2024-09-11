import { useState } from 'react';

import { useMutation } from '@/hooks/useMutation';
import { changePasswordRequest, sendEmailRequest, TSendMailRequest, verifyCodeRequest } from '@/schemas/forgotPassword/forgotRequest';
import { changePasReq, sendEmailRes, verifyCodeRes } from '@/schemas/forgotPassword/forgotRes';
import { postChangePassword, postSendMailCode, postVerifyCode } from '@/services/api/forgotPassword';

import { ForgotPasswordStep } from '../constant';
import { TChangePassword, TVerifyCode } from '../type';

export const useLogic = () => {
  const [step, setStep] = useState(ForgotPasswordStep.sendEmail);
  const [email, setEmail] = useState<string>('');
  const [errorSend, setErrorSend] = useState('');
  const [errorVerifyMess, setErrorVerifyMess] = useState<string>('');
  const [changeSuccess, setChangeSuccess] = useState('');
  const [errorChange, setErrorChange] = useState('');
  const [token, setToken] = useState('');

  // step 1: send email
  const { mutate: mutateSendMail, isPending: loadingSendMail } = useMutation({
    apiConfig: postSendMailCode,
    requestSchema: sendEmailRequest,
    responseSchema: sendEmailRes,
    onSuccess: (response) => {
      setStep(ForgotPasswordStep.verifyEmail);
      setEmail(response.data?.email || '');
    },
    onError: ({ errors }) => {
      setErrorSend(errors?.message || '');
    },
  });

  const handleSendMail = (data: TSendMailRequest) => {
    mutateSendMail(data);
  };

  // step 2: verify email code
  const { mutate: mutateVerifyCode, isPending: loadingVerify } = useMutation({
    apiConfig: postVerifyCode,
    requestSchema: verifyCodeRequest,
    responseSchema: verifyCodeRes,
    onSuccess: ({ data }) => {
      setStep(ForgotPasswordStep.setNewPassword);
      setToken(data?.token || '');
    },
    onError: ({ errors }) => {
      setErrorVerifyMess(errors?.message || '');
    },
  });

  const handleVerifyCode = (data: TVerifyCode) => {
    mutateVerifyCode({ ...data, email: email });
  };

  // step 3: set new password
  const { mutate: mutateChangePass, isPending: loadingChangePass } = useMutation({
    apiConfig: postChangePassword,
    requestSchema: changePasswordRequest,
    responseSchema: changePasReq,
    onSuccess: ({ data }) => {
      setChangeSuccess(data?.message || '');
    },
    onError: () => {
      setErrorChange('Change passwords failed');
    },
  });

  const handleChange = (data: TChangePassword) => {
    mutateChangePass({
      ...data,
      token: token,
    });
  };

  return {
    step,
    loadingSendMail,
    loadingVerify,
    errorVerifyMess,
    errorSend,
    loadingChangePass,
    changeSuccess,
    errorChange,
    setStep,
    handleSendMail,
    handleVerifyCode,
    handleChange,
  };
};
