export default (config) => {
  const isOpen = () => browser.isVisible(config.selector);
  const open = () => browser.url(config.url);

  return {
    isOpen,
    open,
  };
};
