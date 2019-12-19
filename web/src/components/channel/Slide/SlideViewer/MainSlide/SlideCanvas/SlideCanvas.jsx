import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import S from './style';
import {
  useChannelSelector,
  useDispatch,
  useAddCanvasHistory,
  useGetCanvasHistory,
} from '@/hooks';
import DropyCanvas from '@/utils/DropyCanvas';
import { CHANNEL_REDUCER_SET_SLIDE_CANVAS } from '@/constants';

const SlideCanvas = (props) => {
  const { canvasWidth, canvasHeight } = props;
  const { mutate } = useAddCanvasHistory();
  const { query, data } = useGetCanvasHistory();
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;
  const {
    channelId,
    page,
    isPenToolActive,
    slideCanvas,
    toolOptions,
  } = useChannelSelector((state) => state);
  const initSlideCanvas = () => {
    if (slideCanvas) slideCanvas.clearCanvas();
    query({ variables: { channelId, page, toolOptions } });
  };

  useEffect(() => {
    initSlideCanvas();
    const dropyCanvas = new DropyCanvas(canvasWidth, canvasHeight);

    dropyCanvas.init();
    dropyCanvas.setCustomMouseUpHandler(() => {
      mutate({
        variables: {
          channelId,
          page,
          history: dropyCanvas.getNewLineHistory(),
          toolOptions: dropyCanvas.getToolOptions(),
        },
      });
    });

    dispatch({
      type: CHANNEL_REDUCER_SET_SLIDE_CANVAS,
      payload: { slideCanvas: dropyCanvas },
    });
  }, [page]);

  useEffect(() => {
    if (canvas === null) return;
    const context = canvas.getContext('2d');

    slideCanvas.setContext(context);
    if (isPenToolActive) {
      slideCanvas.setToolStyle(toolOptions);
      slideCanvas.addEventListener(canvas);
    }

    return () => slideCanvas.removeEventListener(canvas);
  }, [slideCanvas, canvasWidth, canvasHeight, isPenToolActive]);

  useEffect(() => {
    if (data === null) return;
    if (data.page === page) {
      const curToopOptions = toolOptions;
      slideCanvas.setToolStyle(data.toolOptions);
      slideCanvas.setHistory(data.history);
      slideCanvas.reDrawContent();
      slideCanvas.setToolStyle(curToopOptions);
    }
  }, [data]);

  useEffect(() => {
    if (canvas === null) return;
    slideCanvas.reDrawContent();
  }, [canvasWidth, canvasHeight]);

  return (
    <S.CanvasWrapper isPenToolActive={isPenToolActive}>
      {slideCanvas && slideCanvas.render(canvasRef)}
    </S.CanvasWrapper>
  );
};

SlideCanvas.propTypes = {
  canvasWidth: PropTypes.number.isRequired,
  canvasHeight: PropTypes.number.isRequired,
};

export default SlideCanvas;
