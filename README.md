# Fast Node

> [Fast.com](https://fast.com)을 이용한 인터넷 속도 측정 CLI 도구

![Fast Node](./docs/header.png)

## 개요

- [sindresorhus/fast-cli](https://github.com/sindresorhus/fast-cli)에서 영감을 받아 제작했습니다.
- 웹 스크래핑을 위해 Puppeteer 대신 Playwright를 사용합니다.
- 가장 높은 수준의 추상화만을 제공하여 복잡도를 낮추고 사용하기 쉽게 만들었습니다.

## 사용법

이 도구는 Docker 컨테이너를 실행하거나, npm에서 설치해 사용할 수 있습니다.

### Docker

```shell
docker run --rm -it radiantbeing/fast-node
```

### npm

Playwright가 제어할 브라우저를 사전 설치하세요.

```shell
npx playwright install
```

도구를 전역에 설치한 뒤 실행할 수 있습니다.

```shell
npm install -g @radiantbeing/fast-node
fast
```

또는 `npx`를 사용하여 설치 없이 도구를 실행할 수 있습니다.

```shell
npx playwright install # Playwright 브라우저 설치
npx @radiantbeing/fast-node
```

## 라이선스

MIT License
