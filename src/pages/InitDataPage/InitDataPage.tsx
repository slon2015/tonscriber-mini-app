import { useInitData, useInitDataRaw } from "@tma.js/sdk-react";
import { type FC, type ReactNode, useMemo } from "react";
import type { User } from "@tma.js/sdk";
import { Typography } from "antd";

import {
  DisplayData,
  type DisplayDataRow,
} from "~/components/DisplayData/DisplayData.tsx";
import { Link } from "~/components/Link/Link.tsx";
import { Page } from "~/components/Page/Page.tsx";

import "./InitDataPage.css";

function getUserRows(user: User): DisplayDataRow[] {
  return [
    { title: "id", value: user.id.toString() },
    { title: "last_name", value: user.lastName },
    { title: "first_name", value: user.firstName },
    { title: "is_bot", value: user.isBot },
    { title: "is_premium", value: user.isPremium },
    { title: "language_code", value: user.languageCode },
  ];
}

export const InitDataPage: FC = () => {
  const initData = useInitData();
  const initDataRaw = useInitDataRaw();

  const initDataRows = useMemo<DisplayDataRow[] | undefined>(() => {
    if (!initData || !initDataRaw) {
      return;
    }
    const {
      hash,
      queryId,
      chatType,
      chatInstance,
      authDate,
      startParam,
      canSendAfter,
      canSendAfterDate,
    } = initData;
    return [
      { title: "raw", value: initDataRaw },
      { title: "auth_date", value: authDate.toLocaleString() },
      { title: "auth_date (raw)", value: authDate.getTime() / 1000 },
      { title: "hash", value: hash },
      { title: "can_send_after", value: canSendAfterDate?.toISOString() },
      { title: "can_send_after (raw)", value: canSendAfter },
      { title: "query_id", value: queryId },
      { title: "start_param", value: startParam },
      { title: "chat_type", value: chatType },
      { title: "chat_instance", value: chatInstance },
    ];
  }, [initData, initDataRaw]);

  const userRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return initData && initData.user ? getUserRows(initData.user) : undefined;
  }, [initData]);

  const receiverRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return initData && initData.receiver
      ? getUserRows(initData.receiver)
      : undefined;
  }, [initData]);

  const chatRows = useMemo<DisplayDataRow[] | undefined>(() => {
    if (!initData?.chat) {
      return;
    }
    const { id, title, type, username, photoUrl } = initData.chat;

    return [
      { title: "id", value: id.toString() },
      { title: "title", value: title },
      { title: "type", value: type },
      { title: "username", value: username },
      { title: "photo_url", value: photoUrl },
    ];
  }, [initData]);

  let contentNode: ReactNode;

  if (!initDataRows) {
    contentNode = (
      <Typography.Text italic>
        Application was launched with missing init data
      </Typography.Text>
    );
  } else {
    contentNode = (
      <>
        <div className="init-data-page__section">
          <Typography.Title level={2} className="init-data-page__section-title">
            Init data
          </Typography.Title>
          <DisplayData rows={initDataRows} />
        </div>

        <div className="init-data-page__section">
          <Typography.Title level={2} className="init-data-page__section-title">
            User
          </Typography.Title>
          {userRows ? (
            <DisplayData rows={userRows} />
          ) : (
            <Typography.Text italic>User information missing</Typography.Text>
          )}
        </div>

        <div className="init-data-page__section">
          <h2 className="init-data-page__section-title">Receiver</h2>
          {receiverRows ? (
            <DisplayData rows={receiverRows} />
          ) : (
            <Typography.Text italic>
              Receiver information missing
            </Typography.Text>
          )}
        </div>

        <div className="init-data-page__section">
          <Typography.Title level={2} className="init-data-page__section-title">
            Chat
          </Typography.Title>
          {chatRows ? (
            <DisplayData rows={chatRows} />
          ) : (
            <Typography.Text italic>Chat information missing</Typography.Text>
          )}
        </div>
      </>
    );
  }

  return (
    <Page
      title="Init Data"
      disclaimer={
        <Typography.Paragraph>
          This page displays application{" "}
          <Link to="https://docs.telegram-mini-apps.com/platform/launch-parameters">
            init data
          </Link>
          .
        </Typography.Paragraph>
      }
    >
      {contentNode}
    </Page>
  );
};
