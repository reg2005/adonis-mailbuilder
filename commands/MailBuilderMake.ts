import { join } from 'path'
import { BaseCommand, args, Kernel } from '@adonisjs/ace'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
// import { ConfigContract } from '@ioc:Adonis/Core/Config'
import { getMailBuilderAppClassesPath } from '../src/utils'

/**
 * Generate MailBuilder class for new mailbuilder
 *
 * @version 1.0.0
 * @adonis-version 5.0+
 */
export default class MailBuilderMake extends BaseCommand {
	// private config: ConfigContract
	public static commandName = 'mailbuilder:make'
	public static description = 'Generate class for new mailbuilder'

	@args.string({ description: 'Name of mailbuilder', required: true })
	public name: string

	public static settings = {
		loadApp: true,
	}

	constructor(app: ApplicationContract, kernel: Kernel) {
		super(app, kernel)
		// this.config = app.container.use('Adonis/Core/Config')
	}
	/**
	 * Execute command
	 */
	public async handle(): Promise<void> {
		const templatePath = join(__dirname, `../templates/emailTemplate.txt`)
		if (!this.name) {
			throw new Error('Please provide name')
		}
		try {
			this.generator
				.addFile(this.name, { pattern: 'pascalcase', form: 'singular' })
				.apply({})
				.stub(templatePath)
				.destinationDir(getMailBuilderAppClassesPath(this.application))
				.useMustache()
				.appRoot(this.application.cliCwd || this.application.appRoot)

			await this.generator.run()
		} catch (e) {
			console.error(e)
			this.logger.error('Failed to generate mailbuilder class with error ' + e.message)
		}
	}
}
