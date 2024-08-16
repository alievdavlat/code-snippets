import qs from "qs";

export interface IMultiple {
  remove: string;
  set: object;
}

const useQueryParams = () => {
  // Parse the current query parameters
  const queryParams = typeof window !== "undefined"
    ? qs.parse(window.location.search, { ignoreQueryPrefix: true })
    : {};

  const updateUrl = (newQueryParams: object) => {
    if (typeof window !== "undefined") {
      const newUrl = `${window.location.pathname}?${qs.stringify(newQueryParams)}`;
      window.history.pushState(null, '', newUrl);
    }
  };

  const set = (key: string, value: string) => {
    const newParams = { ...queryParams, [key]: value };
    updateUrl(newParams);
  };

  const setObj = (value: object) => {
    const newParams = { ...queryParams, ...value };
    updateUrl(newParams);
  };

  const clear = () => updateUrl({});

  const append = (values: object) => {
    const newParams = { ...queryParams, ...values };
    updateUrl(newParams);
  };

  const remove = (key: string) => {
    const newParams = { ...queryParams };
    delete newParams[key];
    updateUrl(newParams);
  };

  const multiple = ({ remove, set }: IMultiple) => {
    let newParams = { ...queryParams };
    const items = remove.split(",");
    items.forEach((k) => {
      delete newParams[k];
    });

    newParams = { ...newParams, ...set };
    updateUrl(remove.includes("*") ? set : newParams);
  };

  const removeMany = (...values: string[]) => {
    const newParams = { ...queryParams };
    values.forEach((k) => {
      delete newParams[k];
    });
    updateUrl(newParams);
  };

  const has = (key: string) => !!queryParams[key];
  const get = (key: string) => queryParams[key];
  const secureGet = (key: string) => queryParams[key] || "";
  const goBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return {
    values: queryParams,
    set,
    remove,
    clear,
    append,
    has,
    get,
    goBack,
    multiple,
    secureGet,
    removeMany,
    setObj,
  };
};

export default useQueryParams;
