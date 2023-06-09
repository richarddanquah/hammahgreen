import Link from "next/link";
import { useRouter } from "next/router";
import { isSinglePageActive } from "../../../../utils/daynamicNavigation";
import { signIn, signOut, useSession } from "next-auth/react";

const MyAccount = ({ user }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const profileMenuItems = [
    { id: 1, name: "My Profile", ruterPath: "/my-profile" },
    // { id: 2, name: " My Message", ruterPath: "/my-message" },
    // { id: 3, name: " My Favourite", ruterPath: "/my-favourites" },
    // { id: 4, name: " My Package", ruterPath: "/my-package" },
  ];
  const route = useRouter();
  return (
    <>
      <div className="user_set_header">
        <img
          className="rounded-circle"
          src={
            session.user.image
              ? session.user.image
              : "/assets/images/profileImgs/avatar.png"
          }
          alt="e1.png"
          width={60}
        />
        <br />
        <br />
        {/* <span style={{ fontSize: "10px" }} className="dn-1199">
          {user.role}
        </span> */}
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
              <span className="flaticon-user"></span>
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
          <span className="flaticon-logout"></span> Sign out
        </a>
      </div>
    </>
  );
};

export default MyAccount;
