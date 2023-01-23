import React from "react";
import { FaReact } from "react-icons/fa";
import { AvatarComponent } from "../components/util/avatar";
import { LayoutComponent } from "../components/layout";
import { CardComponent } from "../components/util/card";
import { useAuthContext } from "../hooks/useAuthContext";
import useModalsContext from "../hooks/useModalsContext";
import { AvatarModalComponent } from "../components/modals/avatarModal";
import { CompanyProfileComponent } from "../components/myProfile/companyProfile";
import { DeveloperComponent } from "../components/developer/developer";
import { DeveloperProfileComponent } from "../components/myProfile/developerProfile";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useRecoverUserData } from "../hooks/auth/recoveryUserData";

export default function MyProfile() {
  const { authUser } = useRecoverUserData();
  useModalsContext();
  return (
    <LayoutComponent>
      <div className="mt-11">
        {authUser?.userType?.includes("company") && <CompanyProfileComponent />}
        {authUser?.userType?.includes("developer") && (
          <DeveloperProfileComponent />
        )}
      </div>
    </LayoutComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["auth.token"]: userToken } = parseCookies(ctx);

  if (!userToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
