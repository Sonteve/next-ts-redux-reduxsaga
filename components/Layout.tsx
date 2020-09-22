import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => <div>공통 레이아웃</div>;

export default Layout;
