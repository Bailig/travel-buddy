# Travel Buddy

## Requirements

- [NVM](https://github.com/creationix/nvm).
- [NodeJS](https://nodejs.org/). Install using nvm: `nvm install v18.4.0`.
- You may need to install yarn globally `npm install -g pnpm`.

## Developing

**Install**

```bash
$ pnpm i
```

- If you get an error on this step please refer to [pnpm](https://pnpm.io/) and [Vite](https://vitejs.dev/) documentation.

## NPM scripts

NPM will provide the following services:

- `pnpm run dev` starts dev server.
- `pnpm run build` runs typescript compiler and creates production build with Vite.
- `pnpm run lint` runs eslint.
- `pnpm run cypress:open` opens up cypress for e2e testing.

## Libraries and Technical Decision

Why tailwind?

Tailwind allows me to write CSS fast. Tailwind is just an extension of CSS. It's not a CSS component library like Bootstrap that comes with opinionated pre-designed styles.

Why Headless UI?

Headless UI is an unstyled behavioral accessible UI component library. Unlike MUI, it does not force me to use or modify pre-designed styles in order to use a component. As front-end developers, it is our job to create UI libraries.
