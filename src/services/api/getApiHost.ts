export const getApiHost = (): string => {
  const url = import.meta.env.VITE_API_URL || "";
  return url;
};

export default getApiHost;
