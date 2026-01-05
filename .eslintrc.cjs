module.exports = {
  root: true,
  extends: ['@nuxt/eslint-config'],
  plugins: ['prettier'],

  rules: {
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
        },
      },
    ],
    // Ligt aan project
    'vue/no-v-html': 'off',
  },
  // rules: {
  //   "prettier/prettier": "error",
  // },
};
