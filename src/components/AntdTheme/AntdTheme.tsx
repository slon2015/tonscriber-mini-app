import { useThemeParams } from '@tma.js/sdk-react';
import { App, ConfigProvider, theme } from 'antd';
import React from 'react';
// eslint-disable-next-line no-duplicate-imports
import type { PropsWithChildren } from 'react';

export const AntdTheme = ({ children }: PropsWithChildren) => {
  const themeParams = useThemeParams();
  return (
    <App>
      <ConfigProvider
        theme={{
          token: {
            colorText: themeParams.textColor,
          },
          components: {
            Layout: {
              bodyBg: themeParams.backgroundColor,
              headerBg: themeParams.headerBackgroundColor,
              siderBg: themeParams.secondaryBackgroundColor,
            },
            Button: {
              primaryColor: themeParams.buttonColor,
              colorText: themeParams.buttonTextColor,
              colorLink: themeParams.linkColor,
            },
          },
          algorithm: theme.darkAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </App>
  );
};
