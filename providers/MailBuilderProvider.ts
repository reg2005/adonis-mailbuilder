/*
 * @adonisjs/mail
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { IocContract } from '@adonisjs/fold'
import { MailBuilderManager } from '../src'

/**
 * Mail provider to register mail specific bindings
 */
export default class MailBuilderProvider {
	constructor(protected container: IocContract) {}

	public register() {
		this.container.singleton('Adonis/Addons/MailBuilder', () => {
			const config = this.container.use('Adonis/Core/Config').get('mailbuilder', {})
			return new MailBuilderManager(config)
		})
	}
}
