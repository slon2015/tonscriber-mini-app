import type { FC, PropsWithChildren, ReactNode } from "react";
import { Typography } from "antd";

export interface PageProps extends PropsWithChildren {
  title: string;
  disclaimer?: ReactNode;
}

export const Page: FC<PageProps> = ({ title, children, disclaimer }) => {
  return (
    <div className="py-0 px-[10px]">
      <Typography.Title level={1}>{title}</Typography.Title>
      {disclaimer && <div className="mb-4">{disclaimer}</div>}
      {children}
    </div>
  );
};
