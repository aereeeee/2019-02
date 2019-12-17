const initialChannelState = {
  isChat: false,
  isSync: true,
  page: 0,
  isToolBarActive: false,
  isPenToolActive: false,
  slideCanvas: null,
  toolOption: {},
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
        isToolBarActive: true,
      };
    case 'TOOLBAR_INACTIVE':
      return {
        ...state,
        isToolBarActive: false,
        isPenToolActive: false,
      };
    case 'PEN_TOOL_ACTIVE':
      return {
        ...state,
        isPenToolActive: true,
        toolOption: action.payload.toolOption,
      };
    case 'PEN_TOOL_INACTIVE':
      return {
        ...state,
        isPenToolActive: false,
        toolOption: {},
      };
    case 'SET_SLIDE_CANVAS':
      return {
        ...state,
        slideCanvas: action.payload.slideCanvas,
      };
    default:
      return state;
  }
};

export {
  channelReducer,
  initialChannelState,
};
