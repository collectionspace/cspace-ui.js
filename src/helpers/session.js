let session;

const getSession = () => session;

export const storeSession = (newSession) => {
  session = newSession;
};

export default getSession;
