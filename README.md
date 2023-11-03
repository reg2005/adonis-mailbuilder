<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [AdonisJS 5 mailbuilder](#adonisjs-5-mailbuilder)
  - [Installation](#installation)
  - [Create yor first mail](#create-yor-first-mail)
  - [Emails visual tests](#emails-visual-tests)
  - [Send your email](#send-your-email)
  - [Docs for mailbuilder configuration](#docs-for-mailbuilder-configuration)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# AdonisJS 5 mailbuilder
> Adonis, mailbuilder, mailgen, livereloading

[![travis-image]][travis-url] [![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url]

[![How it works](https://img.youtube.com/vi/MMeL8VLLdv0/0.jpg)](https://www.youtube.com/watch?v=MMeL8VLLdv0 "How it works")

- Declarative creation of mails in classes (based on mailgen)
- **Livereload** as CLI command (for quickly devloping your emails)
- Mock data for tests (so that letters developed through livereload correspond to real letters that will go to the mail)
- Naturally everywhere Typescript is used
- CLI command to quickly create a Mailbuilder class based on the principle of "node ace make:model ModelName"

## Installation
Install it:
```bash
npm i --save adonis-mailbuilder
```
Connect all dependences:
```bash
node ace configure adonis-mailbuilder
```
## Create yor first mail
```bash
node ace mailbuilder:make AnyName
```


## Start dev server
```bash
npm run dev
```
Go to url from cli like 'http://localhost:3333/mailbuilder'

Go to app/MailBuilder/AnyName.ts and change any options

## Send your email
```js
import MailBuilder from '@ioc:Adonis/Addons/MailBuilder'
import AnyName from 'App/MailBuilder/AnyName'
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
export default class AuthController {
  public async register ({ auth, request, response }: HttpContextContract) {
    const { text, html } = await MailBuilder.render(
      new AnyName({ name: 'AnyName' })
    )
    await Mail.send(mail => {
        mail.subject('Thanks for registering')
        mail.text(text)
        mail.html(html)
        mail.to(ctx.session.email)
        mail.from(Env.get('MAIL_FROM') as string)
    })
  }
}
```

## Docs for mailbuilder configuration
[See docs](https://github.com/eladnava/mailgen)

[travis-image]: https://img.shields.io/travis/reg2005/adonis-mailbuilder/master.svg?style=for-the-badge&logo=travis
[travis-url]: https://travis-ci.org/reg2005/adonis-mailbuilder "travis"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"

[npm-image]: https://img.shields.io/npm/v/adonis-mailbuilder.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/adonis-mailbuilder "npm"

[license-image]: https://img.shields.io/npm/l/adonis-mailbuilder?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"
