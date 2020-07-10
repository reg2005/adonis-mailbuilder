import { MailBuilderConfig } from '@ioc:Adonis/Addons/MailBuilder'
export const testConfig: MailBuilderConfig = {
	devPort: '3310',
	mailOption: {
		theme: 'cerberus',
		product: {
			// Appears in header & footer of e-mails
			name: 'Evgeniy Ryumin (cmp08@ya.ru)',
			link: 'https://twitter.com/evgeniy_ryumin',
			// Optional product logo
			logo: 'https://adonisjs.com/images/header-logo.svg',
		},
	},
}
