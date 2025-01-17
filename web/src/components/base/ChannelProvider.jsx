import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { DispatchContext, ChannelContext } from '@/contexts';
import { initialChannelState, channelReducer } from '@/reducers';

const ChannelProvider = (props) => {
  const { children, value } = props;
  const state = { ...value, ...initialChannelState };
  const [channelState, dispatch] = useReducer(channelReducer, state);

  return (
    <DispatchContext.Provider value={dispatch}>
      <ChannelContext.Provider value={channelState}>
        {children}
      </ChannelContext.Provider>
    </DispatchContext.Provider>
  );
};

ChannelProvider.propTypes = {
  children: PropTypes.node,
  value: PropTypes.any,
};

export default ChannelProvider;
