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

/**
 * Mail provider to register mail specific bindings
 */
export default class MailBuilderProvider {
	constructor(protected application: ApplicationContract) {}

	public register() {
		this.application.container.singleton('Adonis/Addons/MailBuilder', () => {
			const config = this.application.container.use('Adonis/Core/Config').get('mailbuilder', {})
			return new MailBuilderManager(config)
		})
	}
}
