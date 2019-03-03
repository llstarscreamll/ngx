export const ENV_MOCK = {
  api: 'https://my.api.com/'
};

export const AUTH_TOKENS_MOCK = {
  token_type: 'Bearer',
  expires_in: 1800,
  access_token: 'some-access-token',
  refresh_token: 'some-refresh-token',
};

export const CREDENTIALS = {
  email: 'tony@stark.com',
  password: 'tony.123'
};

export const USER = {
  object: 'User',
  id: 'A1',
  name: 'Tony Stark',
  email: 'tony@stark.com',
  confirmed: true,
  nickname: 'Tony',
  gender: 'male',
  birth: '1989-06-24',
  created_at: '2000-01-01 10:00:00',
  updated_at: '2000-01-01 10:00:00',
};

export const INCORRECT_CREDENTIALS_API_ERROR = {
  message: 'The user credentials were incorrect.',
  error: 'invalid_credentials',
};

export const DATA_INVALID_API_ERROR = {
  message: "The given data was invalid.",
  errors: {
    email: ["The email field is required."],
    password: ["The password field is required."]
  }
};