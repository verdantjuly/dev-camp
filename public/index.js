// eslint-disable-next-line @typescript-eslint/no-unused-vars
addEventListener('DOMContentLoaded', event => {
  const queryParams = new URLSearchParams(window.location.search);
  if (queryParams.get('accesstoken')) {
    localStorage.setItem('accessToken', queryParams.get('accesstoken'));
    localStorage.setItem('refreshToken', queryParams.get('refreshtoken'));
    location.href = './';
  }
});

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
      'https://accounts.google.com/o/oauth2/v2/auth?' +
      `client_id=${result.googleClientId}&` +
      `redirect_uri=${result.googleRedirectURI}&` +
      'response_type=token&' +
      'scope=profile';
  } catch (err) {
    alert(
      '로그인이 정상적으로 완료되지 않았습니다. 새로고침 이후 다시 시도해 주세요.',
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function sendEmail() {
  const email = document.getElementById('email').value;
  const response = await fetch('./api/auth/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  if (response.status !== 201) {
    alert('이메일이 전송되지 않았습니다.');
    location.href = './';
  } else if (response.status == 201) {
    alert('이메일이 전송되었습니다.');
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function verify() {
  const email = document.getElementById('email').value;
  const number = document.getElementById('verify-number').value;
  const response = await fetch('./api/auth/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, number }),
  });
  if (response.status !== 201) {
    alert('인증이 완료되지 않았습니다.');
    location.href = './';
  } else if (response.status == 201) {
    alert('인증이 완료되었습니다.');
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function signup() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('password-confirm').value;
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;

  if (password !== confirm) {
    alert('비밀번호와 비밀번호 확인이 일치하지 않습니다');
    location.href = './';
  }
  const response = await fetch('./api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name, phone }),
  });
  if (response.status == 201) {
    alert('회원가입이 완료되었습니다.');
    const result = await response.json();
    localStorage.setItem('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);
    location.href = './';
  } else {
    console.log(response.status);
    location.href = './';
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const response = await fetch('./api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (response.status !== 201) {
    alert('로그인이 완료되지 않았습니다.');
    location.href = './';
  } else {
    alert('로그인이 완료되었습니다.');
    const result = await response.json();
    localStorage.setItem('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);
    location.href = './';
  }
}
