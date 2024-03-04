# dev-camp

## Directory Structure

```
dev-camp
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── nest-cli.json
├── package.json
├── README.md
├── src
│  ├── .DS_Store
│  ├── app.module.ts
│  ├── auth
│  │  ├── adapter
│  │  │  ├── in
│  │  │  │  └── auth.controller.ts
│  │  │  └── out
│  │  │    ├── auth.adapter.ts
│  │  │    ├── auth.entity.ts
│  │  │    └── auth.repository.ts
│  │  ├── domain
│  │  │  └── auth.ts
│  │  └── port
│  │    ├── in
│  │    │  └── auth.useCase.ts
│  │    └── out
│  │      └── auth.port.ts
│  ├── main.ts
│  └── modules
├── test
│  └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock
```
