import { classNames, isRGB, type RGB as RGBType } from "@tma.js/sdk";
import { Typography } from "antd";
import type { FC, ReactNode } from "react";

import { RGB } from "~/components/RGB/RGB.tsx";

export interface DisplayDataRow {
  title: string;
  value?: RGBType | string | boolean | ReactNode;
}

export interface DisplayDataProps {
  rows: DisplayDataRow[];
}

export const DisplayData: FC<DisplayDataProps> = ({ rows }) => {
  return (
    <div>
      {rows.map(({ title, value }, idx) => {
        let valueNode: ReactNode;

        if (value === undefined) {
          valueNode = <i>empty</i>;
        } else if (typeof value === "string" && isRGB(value)) {
          valueNode = <RGB color={value} />;
        } else if (typeof value === "boolean") {
          valueNode = value ? "✔️" : "❌";
        } else {
          valueNode = value;
        }

        return (
          <div className="flex items-center mb-2 gap-2.5 flex-wrap" key={idx}>
            <Typography.Text
              className={classNames(
                "border-[1px]",
                "border-solid",
                "border-[var(--tg-theme-accent-text-color)]",
                "bg-tg-background",
                "box-border",
                "rounded-[5px]",
                "pt-1",
                "px-4",
                "pb-2"
              )}
            >
              {title}
            </Typography.Text>
            <Typography.Text className="break-words">
              {valueNode}
            </Typography.Text>
          </div>
        );
      })}
    </div>
  );
};
