import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <div></div>
      {children}
    </div>
  );
};

export default Layout;
