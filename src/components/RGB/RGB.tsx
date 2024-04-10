import { classNames, type RGB as RGBType } from "@tma.js/sdk";
import type { FC } from "react";

export type RGBProps = JSX.IntrinsicElements["div"] & {
  color: RGBType;
};

export const RGB: FC<RGBProps> = (props) => {
  const { color, className, ...rest } = props;

  return (
    <span
      {...rest}
      className={classNames("inline-flex", "items-center", "gap-2", className)}
    >
      <i
        className="w-[18px] aspect-square rounded-full border-[1px] border-solid border-[#555]"
        style={{ backgroundColor: color }}
      />
      {color}
    </span>
  );
};
