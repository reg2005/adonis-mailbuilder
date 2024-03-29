import type { MailBuilderInterface, MailBuilderMailOptionsInterface } from '@ioc:Adonis/Addons/MailBuilder'
interface ConstructorDataInterface {
	name: string
}
export default class HiUserMailBuilder implements MailBuilderInterface {
	constructor(public data: ConstructorDataInterface) {}

	/*
	 * getMockData func is REQUIRED
	 * For testing your email "node ace mailbuilder:serve HiUserMailBuilder"
	 */
	public async getMockData() {
		const data: ConstructorDataInterface = {
			name: 'Evgeniy Ryumin (cmp08@ya.ru)',
		}
		return data
	}
	public async options(isTest: boolean) {
		const options: MailBuilderMailOptionsInterface = {
			// option is optional parameter, in many cases enough config/mailbuilder.ts
			option: {
				theme: 'cerberus',
				product: {
					// Appears in header & footer of e-mails
					name: this.data.name,
					link: 'https://twitter.com/evgeniy_ryumin',
					// Optional product logo
					logo: 'https://adonisjs.com/images/header-logo.svg',
				},
			},
			content: {
				body: {
					greeting: isTest ? 'Hi my friend' : 'Hello',
					signature: 'Regards',
					// name: this.user.getFullname(this.user) || this.user.email,
					intro: `It's test email for example`,
					table: {
						data: [
							{
								item: 'AdonisJS',
								description: 'The best NodeJS framework',
								price: '$1000.99',
							},
							{
								item: 'Node.js',
								description: 'Event-driven I/O server-side JavaScript environment based on V8.',
								price: '$1000.99',
							},
							{
								item: 'Mailgen',
								description: 'Programmatically create beautiful e-mails using plain old JavaScript.',
								price: '$1000.99',
							},
						],
						columns: {
							// Optionally, customize the column widths
							customWidth: {
								item: '20%',
								price: '15%',
							},
							// Optionally, change column text alignment
							customAlignment: {
								price: 'right',
							},
						},
					},
					action: [
						{
							instructions:
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
							button: {
								color: '#22BC66', // Optional action button color
								text: 'Package github page',
								link: 'https://github.com/reg2005/adonis-mailbuilder',
							},
						},
						{
							instructions: 'To read our frequently asked questions, please click here:',
							button: {
								text: 'Read our FAQ',
								link: 'https://mailgen.js/faq',
							},
						},
					],
					outro: 'Any questions? Please write me',
				},
			},
		}
		return options
	}
}
