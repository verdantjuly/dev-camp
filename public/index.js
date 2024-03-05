// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function startKakao() {
  try {
    const response = await fetch(`./api/auth/kakaokey`, {
      method: 'POST',
    });
    const result = await response.json();
    console.log(result.kakaoJSKey);
    console.log(result.kakaoRedirectURI);
    await Kakao.init(result.kakaoJSKey);
    await Kakao.Auth.authorize({
      redirectUri: result.kakaoRedirectURI,
    });
  } catch (err) {
    console.log(err);
    // alert(
    //   '로그인이 정상적으로 완료되지 않았습니다. 새로고침 이후 다시 시도해 주세요.',
    // );
  }
}
