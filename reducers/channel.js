const initialChannelState = {
  isChat: false,
  isSync: true,
  page: 0,
  isToolBarActive: false,
  isPenToolActive: false,
  canvasSize: {},
  storedCanvasUrl: '',
};

const channelReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ISCHAT':
      return {
        ...state,
        isChat: action.payload.isChat,
      };
    case 'SET_ISSYNC':
      return {
        ...state,
        isSync: action.payload.isSync,
      };
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload.page,
      };
    case 'TOOLBAR_ACTIVE':
      return {
        ...state,
        isToolBarActive: !state.isToolBarActive,
      };
    case 'PEN_TOOL_ACTIVE':
      return {
        ...state,
        isPenToolActive: !state.isPenToolActive,
      };
    case 'SET_CANVAS_SIZE':
      return {
        ...state,
        canvasSize: action.payload,
      };
    case 'SET_CANVAS_URL':
      return {
        ...state,
        storedCanvasUrl: action.payload,
      };
    default:
      return state;
  }
};

export {
  channelReducer,
  initialChannelState,
};
