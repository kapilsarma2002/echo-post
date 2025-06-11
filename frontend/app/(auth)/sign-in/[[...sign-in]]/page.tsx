import { SignIn } from "@clerk/nextjs";

const SignInPage = () => <SignIn fallbackRedirectUrl={'/home'} />;

export default SignInPage;