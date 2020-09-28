import React, { ReactNode } from "react";

// 공통 레이아웃 부분
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
