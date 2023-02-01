const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
const REDIRECT_URI = 'http://localhost:3000/login/oauth';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
