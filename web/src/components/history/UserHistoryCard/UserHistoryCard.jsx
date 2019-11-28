import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import S from './style';

const UserHistoryCard = (props) => {
  // console.log(props);
  const { historyInfo } = props;
  console.log(historyInfo);
  return (
    <>
      <S.HistoryCard>
        <S.HistoryCardLeftDetail>
          <Typography variant="subtitle1" color="textSecondary">
            {historyInfo.updatedAt}
          </Typography>
          <Typography component="h5" variant="h5">
            {historyInfo.channel.channelName}
          </Typography>
        </S.HistoryCardLeftDetail>
        <S.HistoryCardRightDetail>
          <Typography variant="subtitle1">
            <Chip
              icon={<FaceIcon />}
              label="현재 생방송중!"
              color="primary"
              variant="outlined"
            />
          </Typography>
          <Typography component="h6" variant="h6">
            {historyInfo.channel.master.displayName}
          </Typography>
        </S.HistoryCardRightDetail>
        <S.HistoryCardMiddleDetail>
          <S.Profile />
        </S.HistoryCardMiddleDetail>
      </S.HistoryCard>
    </>
  );
};

UserHistoryCard.propsTypes = {
  historyInfo: PropTypes.object.isRequired,
};

export default UserHistoryCard;
