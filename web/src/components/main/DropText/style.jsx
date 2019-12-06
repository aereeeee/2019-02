import styled from 'styled-components';
import { px, colorGray, colorYellow } from '@/styles';

export default {
  DropText: styled.div`
    white-space: nowrap;
    text-align: center;
    font-weight: 300;
    font-size: ${px(76)};
    margin-bottom: ${px(160)};
    color: ${(props) => (
    props.dragOver ? colorYellow(5) : colorGray(0)
  )};
  `,
};