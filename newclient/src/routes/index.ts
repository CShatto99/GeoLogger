type Route = {
    path: string;
    component: React.FC;
    title: string;
    needsAuth: boolean;
};

const routes: Route[] = [
    // {
    //     path: '/dashboard',
    //     component: Dashboard,
    //     title: 'Dashboard',
    //     needsAuth: true,
    // },
    // {
    //     path: '/sign-in',
    //     component: SignIn,
    //     title: 'Sign In',
    //     needsAuth: false,
    // },
    // {
    //     path: '/forgot-password',
    //     component: ForgotPassword,
    //     title: 'Forgot Paswword',
    //     needsAuth: false,
    // },
    // {
    //     path: '/verify-otp',
    //     component: OTPVerify,
    //     title: 'Verify OTP',
    //     needsAuth: false,
    // },
    // {
    //     path: '/reset-password',
    //     component: ResetPassword,
    //     title: 'Reset Password',
    //     needsAuth: false,
    // },
];

export default routes;
