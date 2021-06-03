module.exports = api => {
  return {
    presets: [
      [
        "@babel/preset-env",
        api.env("test")
          ? { targets: { node: true } }
          : {
              loose: true,
              modules: false
            }
      ]
    ]
  };
};
