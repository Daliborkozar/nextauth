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

export async function getServerSideProps(context){
  const sessions= await getSession({req: context.req})

  if(!sessions){
    return {
      //redirect to another page (without flash)
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: { sessions }
  }
}

export default ProfilePage;
