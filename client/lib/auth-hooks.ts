import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { loginUser, registerUser, getUserProfile, logoutUser, LoginData, RegisterData } from './api';
import { useAuth } from './auth-context';

export const useLogin = () => {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data.accessToken, data.refreshToken, data.user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useLogout = () => {
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logout();
      queryClient.clear();
    },
    onError: () => {
      logout();
      queryClient.clear();
    },
  });
};

export const useUserProfile = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['user'],
    queryFn: getUserProfile,
    enabled: isAuthenticated,
    retry: false,
  });
};
