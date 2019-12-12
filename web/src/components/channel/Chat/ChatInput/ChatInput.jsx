import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  useAddChat,
  useChannelSelector,
  useDispatch,
} from '@/hooks';
import { pipe, parseMessage, checkIsQuestion } from '@/utils';
import { CHAT_INPUT_PLACEHOLDER } from '@/constants';
import S from './style';

const KEYCODE_ENTER = 13;

const ChatInput = (props) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { mutate } = useAddChat();
  const { channelId, setQuestionToggle } = props;
  const limit = useChannelSelector((state) => state.slideUrls.length);

  const sendMessage = () => {
    if (message === '') return;
    const { isQuestion } = pipe(parseMessage, checkIsQuestion)({ text: message, limit });
    mutate({ variables: { channelId, message, isQuestion } });
    setMessage('');
    setQuestionToggle(false);
  };
  const handleChangeInput = (event) => {
    setMessage(event.target.value);
  };
  const handleKeyDownInput = (event) => {
    if (event.keyCode === KEYCODE_ENTER && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };
  const handleFocus = (isChat) => () => {
    dispatch({
      type: 'SET_ISCHAT',
      payload: { isChat },
    });
  };

  return (
    <S.ChatInput>
      <S.MessageInput
        placeholder={CHAT_INPUT_PLACEHOLDER}
        onChange={handleChangeInput}
        onKeyDown={handleKeyDownInput}
        onFocus={handleFocus(true)}
        onBlur={handleFocus(false)}
        value={message}
      />
      <S.SendButton
        type="button"
        onClick={sendMessage}
      >
        전송
      </S.SendButton>
    </S.ChatInput>
  );
};

ChatInput.propTypes = {
  channelId: PropTypes.string.isRequired,
  setQuestionToggle: PropTypes.func.isRequired,
};

export default ChatInput;
