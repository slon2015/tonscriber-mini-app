import type { FC } from "react";
import { Typography } from "antd";

import { Link } from "~/components/Link/Link.tsx";
import { Page } from "~/components/Page/Page.tsx";
import { routes } from "~/navigation/routes.tsx";

export const IndexPage: FC = () => {
  return (
    <Page title="Home Page">
      <Typography.Paragraph>
        This page is a home page in this boilerplate. You can use the links
        below to visit other pages with their own functionality.
      </Typography.Paragraph>
      <ul className="list-none pl-0 space-y-2.5">
        {routes.map(
          ({ path, title, icon }) =>
            title && (
              <li key={path}>
                <Link className="font-bold inline-flex gap-2" to={path}>
                  {icon && <i className="w-5 block">{icon}</i>}
                  {title}
                </Link>
              </li>
            )
        )}
      </ul>
    </Page>
  );
};
