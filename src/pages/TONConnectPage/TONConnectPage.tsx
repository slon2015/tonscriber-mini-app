import { useUtils } from "@tma.js/sdk-react";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import type { FC, ReactNode } from "react";
import { Typography } from "antd";

import { DisplayData } from "~/components/DisplayData/DisplayData.tsx";
import { Link } from "~/components/Link/Link.tsx";
import { Page } from "~/components/Page/Page.tsx";

import "./TONConnectPage.css";

export const TONConnectPage: FC = () => {
  const wallet = useTonWallet();
  const utils = useUtils();
  let content: ReactNode;

  if (wallet) {
    const { chain, publicKey, address } = wallet.account;
    content = (
      <>
        {"imageUrl" in wallet && (
          <div className="ton-connect-page__provider">
            <img
              className="ton-connect-page__provider-image"
              alt="Provider logo"
              src={wallet.imageUrl}
              width={60}
              height={60}
            />
            <div className="ton-connect-page__provider-meta">
              <Typography.Paragraph className="ton-connect-page__provider-wallet-name">
                {wallet.name}
                &nbsp;
                <Typography.Text className="ton-connect-page__provider-app-name">
                  ({wallet.appName})
                </Typography.Text>
              </Typography.Paragraph>
              <Link
                to={wallet.aboutUrl}
                onClick={(e) => {
                  e.preventDefault();
                  utils.openLink(wallet.aboutUrl);
                }}
              >
                About connected wallet
              </Link>
            </div>
          </div>
        )}
        <DisplayData
          rows={[
            { title: "Address", value: address },
            { title: "Chain", value: chain },
            { title: "Public Key", value: publicKey },
          ]}
        />
      </>
    );
  } else {
    content = (
      <Typography.Paragraph>
        To display the data related to the TON Connect, it is required to
        connect your wallet.
      </Typography.Paragraph>
    );
  }

  return (
    <Page title="TON Connect">
      {content}
      <div className="ton-connect-page__button-container">
        <TonConnectButton />
      </div>
    </Page>
  );
};
