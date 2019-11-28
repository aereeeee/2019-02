import React from 'react';
import PropTypes from 'prop-types';
import UserHistoryCard from '../UserHistoryCard';
import { useGetUserHistories, useGetUserStatus } from '@/hooks';
import S from './style';

const UserHistory = (props) => {
  const { historyState } = props;
  const { userId } = useGetUserStatus();
  const { data, loading } = useGetUserHistories();

  if (loading) return <p>데이터 가져오는 중...</p>;

  const filterToDomain = ({ channel: { master } }) => (historyState === 'speaker'
    ? master.userId === userId
    : master.userId !== userId);
  const mapToCardComponent = (historyInfo) => (
    <UserHistoryCard
      key={historyInfo.channel.channelId}
      historyInfo={historyInfo}
    />
  );
  const historyCardList = data && data.length > 0
    ? data.filter(filterToDomain).map(mapToCardComponent)
    : <p>아직 채널을 한번도 생성 안해보셨네요??</p>;

  return (
    <>
      <S.UserHistory>
        {historyState === 'speaker'
          ? <>김도현님이 스피커로 방문하셨던 채널이에요!</>
          : <>김도현님이 리스너로 방문하셨던 채널이에요!</>}

        <S.UserHistoryContents>
          {historyCardList}
        </S.UserHistoryContents>
      </S.UserHistory>
    </>
  );
};

UserHistory.propTypes = {
  historyState: PropTypes.string.isRequired,
};

export default UserHistory;
