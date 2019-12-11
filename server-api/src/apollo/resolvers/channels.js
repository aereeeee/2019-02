const { withFilter, ApolloError } = require('apollo-server-express');
const Channels = require('../../models/channels');
const Histories = require('../../models/histories');
const Users = require('../../models/users');

const SLIDE_CHANGED = 'SLIDE_CHANGED';
const LISTENER_LIST_CHANGED = 'LISTENER_LIST_CHANGED';

const createChannelInfo = (
  user,
  channelId,
  channelCode,
  slideUrls,
  fileUrl,
  slideRatioList,
) => ({
  channelId,
  channelCode,
  channelName: `${user.displayName}님의 채널입니다😀`,
  masterId: user.userId,
  slideUrls,
  fileUrl,
  slideRatioList,
});

const createChannel = async (_, {
  channelId,
  channelCode,
  slideUrls,
  fileUrl,
  slideRatioList,
}, { user }) => {
  const newChannel = new Channels(
    createChannelInfo(
      user,
      channelId,
      channelCode,
      slideUrls,
      fileUrl,
      slideRatioList,
    ),
  );

  const { userId } = user;
  const masterId = userId;
  const updatedAt = Date.now();
  const newHistory = new Histories({
    userId,
    masterId,
    channelId,
    updatedAt,
  });

  try {
    const channel = await newChannel.save();
    const payload = await channel.toPayload({ master: user });

    await newHistory.save();

    return payload;
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const getChannel = async (_, { channelId }, { user }) => {
  const response = {
    status: 'fail',
    isMaster: false,
    channel: null,
  };

  if (!user) return response;

  try {
    const channel = await Channels.findOne({ channelId });

    if (!channel) return response;

    const master = await Users.findOne({ userId: channel.masterId });
    const status = channel ? 'ok' : 'not_exist';
    const isMaster = !!channel && !!user && channel.masterId === user.userId;
    const payload = await channel.toPayload({ master });

    return {
      status,
      isMaster,
      channel: payload,
    };
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const getChannelsByCode = async (_, { channelCode }) => {
  try {
    const channels = await Channels.find({ channelCode });
    const status = channels ? 'ok' : 'not_exist';
    const refindedChannels = channels.map(async (channel) => {
      const master = await Users.findOne({ userId: channel.masterId });
      return channel.toPayload({ master });
    });

    return {
      status,
      channels: refindedChannels,
    };
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const setCurrentSlide = async (_, { channelId, currentSlide }, { user, pubsub }) => {
  try {
    const channel = await Channels.findOneAndUpdate(
      { channelId },
      { currentSlide },
      { new: true },
    );
    const payload = await channel.toPayload({ master: user });

    pubsub.publish(SLIDE_CHANGED, { slideChanged: payload });

    return payload;
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const checkListener = (list, user) => {
  if (list.includes(user.userId)) return false;
  return true;
};

const enteredListener = async (_, { channelId, listenerList }, { user, pubsub }) => {
  if (!checkListener(listenerList, user)) return;
  try {
    const channel = await Channels.findOneAndUpdate(
      { channelId },
      { listenerList },
      { new: true },
    );
    const payload = await channel.toPayload({});

    pubsub.publish(LISTENER_LIST_CHANGED, { listenerListChanged: payload });

    return payload;
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const leaveListener = async (_, { channelId, listenerList }, { user, pubsub }) => {
  if (checkListener(listenerList, user)) return;
  try {
    const newListenerList = listenerList.filter((listener) => user.userId !== listener);
    const channel = await Channels.findOneAndUpdate(
      { channelId },
      { newListenerList },
      { new: true },
    );
    const payload = await channel.toPayload({});

    pubsub.publish(LISTENER_LIST_CHANGED, { listenerListChanged: payload });

    return payload;
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const listenerListChanged = {
  subscribe: withFilter(
    (_, __, { pubsub }) => pubsub.asyncIterator(LISTENER_LIST_CHANGED),
    (payload, variables) => payload.listenerListChanged.channelId === variables.channelId,
  ),
};

const slideChanged = {
  subscribe: withFilter(
    (_, __, { pubsub }) => pubsub.asyncIterator(SLIDE_CHANGED),
    (payload, variables) => payload.slideChanged.channelId === variables.channelId,
  ),
};

const resolvers = {
  Query: {
    getChannel,
    getChannelsByCode,
  },
  Mutation: {
    createChannel,
    setCurrentSlide,
    enteredListener,
    leaveListener,
  },
  Subscription: {
    slideChanged,
    listenerListChanged,
  },
};

module.exports = resolvers;
