import UserProfile from "../components/profile/user-profile";
import { useSession, getSession } from "next-auth/react";
import { useEffect } from "react";

function ProfilePage() {
  //show profile page if logged in

  useEffect(() => {
    const sessioncheck = async () => {
      const data = await getSession();
      if (!data) {
        window.location.href = "/auth";
      }
    };

    sessioncheck();
  }, []);

  return <UserProfile />;
}

export default ProfilePage;
