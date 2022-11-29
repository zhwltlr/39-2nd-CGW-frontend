const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const CALLBACK_URL = 'http://localhost:3000/login/naver';

export const NAVER_CALLBACK_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=STATE_STRING&redirect_uri=${CALLBACK_URL}`;
