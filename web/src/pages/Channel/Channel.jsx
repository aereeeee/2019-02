import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { ChannelContext } from '@/contexts';
import {
  useGetChannel,
  useCheckAndLoginAnonymous,
  useInitChatCached,
} from '@/hooks';
import { Chat, Slide, ToolBar } from '@/components/channel';
import S from './style';

const Channel = () => {
  const { params: { channelId } } = useRouteMatch();
  const { data } = useGetChannel(channelId);

  useInitChatCached();
  useCheckAndLoginAnonymous();

  if (!data) return null;
  if (data.status === 'not_exist') {
    return (
      <div>존재하지 않는 채널입니다...</div>
    );
  }

  return (
    <ChannelContext.Provider
      value={{
        isMaster: data.isMaster,
        slideUrls: data.channel.slideUrls,
        initialSlide: data.channel.currentSlide,
        channelName: data.channel.channelName,
        masterName: data.channel.master.displayName,
      }}
    >
      <S.Channel>
        <ToolBar />
        <Slide channelId={channelId} />
        <Chat channelId={channelId} />
      </S.Channel>
    </ChannelContext.Provider>
  );
};

export default Channel;
