import React from 'react';
import S from './style';
import { useChannelSelector } from '@/hooks';
import CodeShareButton from './CodeShareButton';

const SlideInfo = () => {
  const channelName = useChannelSelector((state) => state.channelName);
  const masterName = useChannelSelector((state) => state.masterName);

  return (
    <S.SlideInfo>
      <S.TitleWrapper>
        <S.ChannelTitle>{channelName}</S.ChannelTitle>
        <S.MasterName>
          <span>| &nbsp;&nbsp;</span>
          {masterName}
        </S.MasterName>
      </S.TitleWrapper>
      <S.SlideButtonsWrapper>
        <CodeShareButton />
      </S.SlideButtonsWrapper>
    </S.SlideInfo>
  );
};

export default SlideInfo;
