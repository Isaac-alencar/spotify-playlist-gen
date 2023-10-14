type CacheServiceParams = {
  expirationTime: number;
  callback: () => Promise<any>;
};

export const cacheService = ({
  expirationTime,
  callback,
}: CacheServiceParams) => {
  const fetch = async <T>(key: string) => {
    const item = localStorage.getItem(key);

    if (item && isValid(key)) return JSON.parse(item) as T;

    const response = await callback();
    if (response) {
      const expiresAt = new Date().getTime() + expirationTime * 1000;
      const data = { ...response, expiresAt };
      localStorage.setItem(key, JSON.stringify(data));

      return data as T;
    }

    return null;
  };

  const isValid = (key: string) => {
    const item = localStorage.getItem(key);

    if (!item) {
      console.log(`${key} not found`);
      return;
    }

    return new Date().getTime() < JSON.parse(item).expiresAt;
  };

  return {
    fetch,
  };
};
