import {
  IChangePassword,
  IForgotPassword,
  ILogin,
  IRegister2,
  IResendOTP,
  ISignUp,
  IUpdateProfileImage,
  IUpdateUser,
  IVerifyOtp,
} from '../interfaces/user';
import APIClient from '../plugins/api.plugin';

class AuthService {
  login(payload: ILogin) {
    return APIClient.apiClient.post('/auth/login', payload);
  }
  signUp(payload: ISignUp) {
    return APIClient.apiClient.post('/auth/register', {
      ...payload,
      mobile: payload.mobile.toString(),
      roleId: payload.roleId.toString(),
    });
  }
  verifyOTP(payload: IVerifyOtp) {
    return APIClient.apiClient.post('/auth/verify-otp', payload);
  }
  register2(payload: IRegister2) {
    return APIClient.apiClient.post('/auth/register/2', payload);
  }
  resendOTP(payload: IResendOTP) {
    return APIClient.apiClient.post('/auth/resend-otp', payload);
  }
  forgotPassword(payload: IForgotPassword) {
    return APIClient.apiClient.post('/auth/forgotPassword', payload);
  }
  logOut() {
    return APIClient.apiClient.get('/auth/logout');
  }
  whoAmI() {
    return APIClient.apiClient.get('/users/whoami');
  }
  userDetail() {
    return APIClient.apiClient.get(`/users`);
  }
  getCurrency() {
    return APIClient.apiClient.get(`/currency`);
  }

  updateUserDetail(payload: IUpdateUser) {
    return APIClient.apiClient.put(`/users/${payload.id}`, payload);
  }

  changePassword(payload: IChangePassword) {
    return APIClient.apiClient.post(`/users/change-password`, payload);
  }

  createPaymentSheet(payload: any) {
    return APIClient.apiClient.post(`/payments/pay-sheet`, payload);
  }

  createPaymentIntent(payload: any) {
    return APIClient.apiClient.post(`/payments/create-payment-intent`, payload);
  }

  updateProfileImage(payload: IUpdateProfileImage) {
    return APIClient.apiClient.post(`/users/update-profile-image`, payload);
  }

  getAllConversations() {
    return APIClient.apiClient.get(`/messages`);
  }

  createNewConversation(id: number) {
    return APIClient.apiClient.post(`/messages/new-message-send`, { id });
  }

  getMessageByConversationId(id: number) {
    return APIClient.apiClient.get(`/messages/conversation/message-list/${id}`);
  }
}

export default new AuthService();
