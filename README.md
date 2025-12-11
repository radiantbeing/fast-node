# Fast Node

> [Fast.com](https://fast.com)을 이용한 인터넷 속도 측정 CLI 도구

![Fast Node](./docs/header.png)

## 개요

- [sindresorhus/fast-cli](https://github.com/sindresorhus/fast-cli)에서 영감을 받아 제작했습니다.
- 웹 스크래핑을 위해 Puppeteer 대신 Playwright를 사용합니다.
- 가장 높은 수준의 추상화만을 제공하여 복잡도를 낮추고 사용하기 쉽게 만들었습니다.

## 일러두기

이 도구는 Playwright를 사용하여 [Fast.com](https://fast.com) 사이트를 자동합니다. Playwright가 제어할 브라우저를 설치하세요.

```shell
npx playwright install
```

## 사용법

`npx`를 사용하여 설치 없이 바로 도구를 실행할 수 있습니다.

```shell
npx @radiantbeing/fast-node
```

또는 도구를 전역에 설치한 뒤 실행할 수 있습니다.

```shell
npm install -g @radiantbeing/fast-node
fast
```

## 라이선스

MIT License
