import { Mixpanel, Config, init } from 'mixpanel-browser';
import React, { ProviderProps, useContext, useMemo } from 'react';

export type MixpanelContextValue = Mixpanel | undefined;

export interface MixpanelProviderProps extends Omit<ProviderProps<MixpanelContextValue>, 'value'> {
  config?: Partial<Config>;
}

const token = 'af14d926766c8262a4a678e5d36e9b06';

export const MixpanelContext = React.createContext<MixpanelContextValue>(undefined);

export function MixpanelProvider({
                                   children,
                                   config: _config,
                                 }: MixpanelProviderProps) {
  const name = useMemo(() => 'react-mixpanel-browser', []);

  const config = useMemo(
    () => ({
      track_pageview: false, // Rarely makes sense to track page views in React apps
      debug: true,
      ignore_dnt: true,
      ..._config,
    }),
    [_config],
  );

  const context = useMemo(
    () => init(token, config, name),
    [config, name, token],
  );

  return (
    <MixpanelContext.Provider value={context}>
      {children}
    </MixpanelContext.Provider>
  );
}


export function useMixpanel() {
  const context = useContext(MixpanelContext);

  if (!context) {
    throw new Error('useMixpanel can only be used inside MixpanelProvider');
  }

  return context;
}
