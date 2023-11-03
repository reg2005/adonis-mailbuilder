/*
 * @adonisjs/mail
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { MailBuilderManager } from '../src'
import { mailBuilderRouter } from '../src/MailBuilderRouter'

/**
 * Mail provider to register mail specific bindings
 */
export default class MailBuilderProvider {
	constructor(protected application: ApplicationContract) {}
	public static needsApplication = true
	public register() {
		this.application.container.singleton('Adonis/Addons/MailBuilder', () => {
			const config = this.application.container.use('Adonis/Core/Config').get('mailbuilder', {})
			return new MailBuilderManager(config)
		})
	}
	public async boot(): Promise<void> {
		if (this.application.environment === 'web' && this.application.env.get('NODE_ENV') !== 'production') {
			const router = this.application.container.use('Adonis/Core/Route')
			mailBuilderRouter(router, this.application)
		}
	}
}
