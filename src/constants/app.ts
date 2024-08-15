export const PAGINATION_LIMIT = {
  XXS: 10,
  XS: 15,
  S: 20,
  M: 25,
  MD: 30,
  L: 40,
  XL: 50,
  XXL: 100,
};

export const PAGINATION_DEFAULT = {
  limit: PAGINATION_LIMIT.S,
  page: 1,
};

export const BASE_API = process.env.NEXT_PUBLIC_API_URL;

export const REAL_PATH = process.env.NEXT_PUBLIC_NOVA_RESERVE_URL;

export const MILE_STATUS_CD_NORMAL = 'N';
export const MILE_STATUS_CD_GREEN = 'G';
export const MILE_STATUS_CD_GORD = 'L';
export const MILE_STATUS_CD_RED = 'R';

export const MODE_STAFF = {
  OK: 'OK',
  TRUE: 'true',
};

export const NOTIFICATION = {
  DURATION: 3000,
  MAX_SNACK: 3,
};

export const ICON_NATIONAL_PATH = {
  AUS: '/images/flags/au.png',
  CAN: '/images/flags/ca.png',
  CHN: '/images/flags/cn.png',
  ESP: '/images/flags/es.png',
  FRA: '/images/flags/fr.png',
  GER: '/images/flags/gm.png',
  ITA: '/images/flags/it.png',
  JPN: '/images/flags/jp.png',
  KOR: '/images/flags/kr.png',
  NZL: '/images/flags/nz.png',
  PHL: '/images/flags/ph.png',
  POR: '/images/flags/pt.png',
  GBR: '/images/flags/uk.png',
  BRI: '/images/flags/uk.png',
  USA: '/images/flags/us.png',
  ZAF: '/images/flags/za.png',
};

export const OVERSEAS_AREA_CODE = '900';
export const ONLINE_SCHOOL_CD = '1639';

export const ICON_LANGUAGE_PATH = {
  ENG: '/images/flags/uk.png',
  FRN: '/images/flags/fr.png',
  GER: '/images/flags/gm.png',
  ITA: '/images/flags/it.png',
  SPN: '/images/flags/es.png',
  CHI: '/images/flags/cn.png',
  KOR: '/images/flags/kr.png',
  POR: '/images/flags/pt.png',
  JPA: '/images/flags/jp.png',
};

export const Flag = {
  ONE: '1',
  ZERO: '0',
};

export const MINUTES = 60000;

export const INSTRUCTOR_DEFAULT_IMG = '/images/top/inst_def.png';

export const COURSE_RANK = {
  STANDARD: 'STANDARD',
  PREMIUM: 'PREMIUM',
};

export const COURSE_PAYMENT_TYPE = {
  CREDIT: 'credit',
  POINT: 'point',
};

export const CMD = {
  STANDARD_CHANGE: 'to-standard-change',
  STANDARD_CONFIRM: 'to-standard-confirm',
  STANDARD_DONE: 'to-standard-done',
  PREMIUM_CHANGE: 'to-premium-change',
  PREMIUM_CHANGE_DATE: 'to-premium-change-date',
  PREMIUM_NEXT_CONFIRM: 'to-premium-next-confirm',
  PREMIUM_NEXT_DONE: 'to-premium-next-done',
  PREMIUM_IMMEDIATE_CONFIRM: 'to-premium-immediate-confirm',
  PREMIUM_IMMEDIATE_DONE: 'to-premium-immediate-done',
};

export const drawerWidth = 260;

export const HEADER = {
  H_MOBILE: 64,
  H_DESKTOP: 60,
};

export const NAV = {
  W_VERTICAL: 280,
  W_MINI: 88,
};
