import Link from "next/link";
import { useRouter } from "next/router";
import { isSinglePageActive } from "../../../utils/daynamicNavigation";
import { signIn, signOut, useSession } from "next-auth/react";

const MyAccount = () => {
  const { data: session, status } = useSession();
  console.log(session);
  const router = useRouter();
  const profileMenuItems = [
    { id: 1, name: "My Profile", ruterPath: "/client-user/profile" },
    { id: 2, name: "Notifications", ruterPath: "/client-user/notifications" },
  ];
  const route = useRouter();
  return (
    <>
      <div className="user_set_header">
        {/* <img
          className="rounded-circle"
          src={session.user.image}
          alt="e1.png"
          width={60}
        /> */}
        <p>
          {session.user.name}
          <br />
          <span className="address">{session.user.email}</span>
        </p>
      </div>

      {/* End user_set_header */}

      <div className="user_setting_content">
        {profileMenuItems.map((item) => (
          <Link href={item.ruterPath} key={item.id}>
            <a
              className="dropdown-item"
              style={
                isSinglePageActive(`${item.ruterPath}`, route.pathname)
                  ? { color: "#ff5a5f" }
                  : undefined
              }
            >
              {item.name}
            </a>
          </Link>
        ))}
        <a
          onClick={async () => {
            const data = await signOut({
              redirect: false,
              callbackUrl: "/login",
            });
            route.push(data.url);
          }}
          href="#"
          className="dropdown-item"
        >
          Sign out
        </a>
      </div>
    </>
  );
};

export default MyAccount;
