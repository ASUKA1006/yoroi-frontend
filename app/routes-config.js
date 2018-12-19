// @flow
export const ROUTES = {
  ROOT: '/',
  STAKING: '/staking',
  NO_WALLETS: '/no-wallets',
  PROFILE: {
    LANGUAGE_SELECTION: '/profile/language-selection',
    TERMS_OF_USE: '/profile/terms-of-use',
    SEND_LOGS: '/profile/send-logs-choice',
  },
  WALLETS: {
    ROOT: '/wallets',
    ADD: '/wallets/add',
    PAGE: '/wallets/:id/:page',
    TRANSACTIONS: '/wallets/:id/transactions',
    SEND: '/wallets/:id/send',
    RECEIVE: '/wallets/:id/receive',
  },
  SETTINGS: {
    ROOT: '/settings',
    WALLET: '/settings/wallet',
    ACCOUNTS: '/settings/accounts',
    GENERAL: '/settings/general',
    TERMS_OF_USE: '/settings/terms-of-use',
    SUPPORT: '/settings/support',
    DISPLAY: '/settings/display',
  },
  DAEDALUS_TRANFER: {
    ROOT: '/daedalus-transfer',
  },
  AUTH: {
    DROPBOX: '/auth/dropbox',
  },
};
