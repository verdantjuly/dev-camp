// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function startKakao() {
  try {
    const response = await fetch(`./api/auth/kakaokey`, {
      method: 'POST',
    });
    const result = await response.json();

    await Kakao.init(result.kakaoJSKey);
    await Kakao.Auth.authorize({
      redirectUri: result.kakaoRedirectURI,
    });
  } catch (err) {
    alert(
      '로그인이 정상적으로 완료되지 않았습니다. 새로고침 이후 다시 시도해 주세요.',
    );
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function startGoogle() {
  try {
    const response = await fetch(`./api/auth/googlekey`, {
      method: 'POST',
    });
    const result = await response.json();
    window.location.href =
      'https://accounts.google.com/o/oauth2/auth?' +
      `client_id=${result.googleClientId}&` +
      `redirect_uri=${result.googleRedirectURI}&` +
      'response_type=token&' +
      'scope=https://www.googleapis.com/auth/userinfo.profile';
  } catch (err) {
    alert(
      '로그인이 정상적으로 완료되지 않았습니다. 새로고침 이후 다시 시도해 주세요.',
    );
  }
}
