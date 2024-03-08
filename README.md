# dev-camp

온라인 강의 수강권 판매 서비스

### 배포 주소

http://13.209.87.137:3000

### 프로젝트 기간

2024.3.4. ~ 2024.3.15. (2주, 1인)

### Tech Spec

- Backend Framework : Nest.js 10.3.0
- Backend Language : Typescript
- Database : PostgreSQL 14.9

### 주요 기능

- 소셜 로그인 : 카카오, 구글 (passport)
- https 및 퍼블릭 IP 사용 불가로 인해 구글은 localhost에서만 작동.  
  사용자가 원하는 경우 클릭 한 번에 회원가입과 로그인이 이루어질 수 있도록 구현하였습니다.  
  Passport 라이브러리의 Strategy를 상속받아 AuthGuard를 통해 컨트롤러에 주입하였습니다.  
  token이 포함되어 있는 쿼리 스트링이 붙는 로그인 페이지로 redirect하는 응답을 통해  
  프론트엔드에서 Access Token과 Refresh Token을 보관할 수 있게 하였습니다.

- 로컬 로그인 : 이메일 인증 (nodemailer, argon2)  
  사용자가 원하는 경우 nodemailer를 통한 이메일 인증으로 회원 가입 하고 로그인 할 수 있도록 구현하였습니다.  
  비밀번호 해싱 알고리즘으로는 Argon2를 사용하였습니다.  
  Argon2는 메모리 하드 함수로서 대량의 메모리를 필요하기 때문에 고속 해싱 함수보다 강력한 보안을 제공합니다.  
  병렬처리에 특화되어 있어 단일 코어를 사용하는 bcrypt보다 멀티코어 시스템에서 더 빠른 해싱이 가능합니다.

- CD : 자동 배포 (Github Actions, CodeDeploy)
  1. master 브랜치에 push.
  2. github Actions를 통해 자동으로 빌드.
  3. 빌드된 파일을 압축하여 S3 버킷에 올림.
  4. CodeDeploy를 이용하여 사용하는 EC2에서 S3버킷에 올라온 파일을 가져옴.
  5. 압축을 해제 하여 배포.
  6. PM2를 통해 올라온 파일을 자동으로 다시 띄움.
