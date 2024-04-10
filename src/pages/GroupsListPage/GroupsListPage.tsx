import { useEffect, useState, type FC } from "react";
import { List, Avatar, Typography } from "antd";
import VirtualList from "rc-virtual-list";

import { Page } from "~/components/Page/Page.tsx";
import { useViewport } from "@tma.js/sdk-react";

type GroupItem = {
  avatarHref: string;
  title: string;
  description: string;
  id: string;
};

const hardcodedGroups: Array<GroupItem> = [
  {
    id: "1",
    title: "Ape yacht club",
    description: "World first gated community in telegram",
    avatarHref: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
  },
  {
    id: "2",
    title: "Liberatrian avenue",
    description: "Pay only crypto, ignore taxes",
    avatarHref: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
  },
  {
    id: "3",
    title: "Amoranth",
    description: "Donate me for another gas station",
    avatarHref: "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
  },
  {
    id: "4",
    title: "Crypto magazine",
    description: "Articles from web3 frontier",
    avatarHref: "https://api.dicebear.com/7.x/miniavs/svg?seed=4",
  },
  {
    id: "5",
    title: "Memepedia community",
    description: "Meme flud or smth",
    avatarHref: "https://api.dicebear.com/7.x/miniavs/svg?seed=5",
  },
];

async function getRandomPage(
  size: number,
  alreadyLoaded: number
): Promise<Array<GroupItem>> {
  return new Array(size).fill(0).map((_, i) => {
    const index = i % hardcodedGroups.length;
    return {
      ...hardcodedGroups[index],
      id: (alreadyLoaded + i).toString(),
      avatarHref: `https://api.dicebear.com/7.x/miniavs/svg?seed=${
        alreadyLoaded + i
      }`,
    };
  });
}

export const GroupsListPage: FC = () => {
  const [data, setData] = useState<Array<GroupItem>>([]);
  const viewport = useViewport();

  const appendData = () => {
    getRandomPage(10, data.length).then((body) => {
      setData(data.concat(body));
    });
  };

  useEffect(() => {
    appendData();
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      Math.abs(
        e.currentTarget.scrollHeight -
          e.currentTarget.scrollTop -
          viewport.height
      ) <= 1
    ) {
      appendData();
    }
  };

  return (
    <Page title="Explore groups">
      <List itemLayout="vertical" size="large">
        <VirtualList
          data={data}
          height={viewport.height}
          itemHeight={47}
          itemKey="id"
          onScroll={onScroll}
        >
          {(item: GroupItem) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src={item.avatarHref} />}
                title={<Typography.Text strong>{item.title}</Typography.Text>}
              />
              <Typography.Paragraph type="secondary">
                {item.description}
              </Typography.Paragraph>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </Page>
  );
};
