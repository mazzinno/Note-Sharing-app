import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
} from "@clerk/clerk-react";

const Auth = () => {
    return (
      <div>
        <SignedOut>
          <SignUpButton mode="modal"/>
          <SignInButton mode="modal"/>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    );
};

export default Auth;