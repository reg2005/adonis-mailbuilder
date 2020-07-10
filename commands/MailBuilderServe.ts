import { BaseCommand, Kernel } from '@adonisjs/ace'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { ConfigContract } from '@ioc:Adonis/Core/Config'
import { getMailBuilderCompiledClassesPath, listFiles, indexPageRender, livereloadScript } from '../src/utils'
import { join } from 'path'
import http from 'http'
import url from 'url'
import { MailBuilderInterface, MailBuilder } from '@ioc:Adonis/Addons/MailBuilder'
const debug = require('debug')('MailBuilder_')

function requireUncached(module: string) {
	delete require.cache[require.resolve(module)]
	return require(module)
}

/**
 * Launch queue workers to start processing
 *
 * @version 2.0.0
 * @adonis-version 5.0+
 */
export default class MailBuilderServe extends BaseCommand {
	private config: ConfigContract
	private mailBuilder: MailBuilder
	public static commandName = 'mailbuilder:serve'
	public static description = 'Start one or more workers'

	public static settings = {
		loadApp: true,
	}

	private mailbuilderFolderPath: string

	constructor(app: ApplicationContract, kernel: Kernel) {
		super(app, kernel)
		this.mailbuilderFolderPath = getMailBuilderCompiledClassesPath(this.application)
		this.mailBuilder = app.container.use('Adonis/Addons/MailBuilder')

		this.config = app.container.use('Adonis/Core/Config')
	}
	/**
	 * Execute command
	 */
	public async handle(): Promise<void> {
		const PORT: string = this.config.get('mailbuilder.devPort') || '3335'
		const URL = `http://localhost:${PORT}`
		if (!(await this.hasFiles())) {
			this.logger.error(
				'MailBuilders is not exists, please make your first mailbuilder use command: "node ace make:mailbuilder"'
			)
			return
		}

		// const mailbuilderTmpPath = await getMailBuilderTmpPath()
		http
			.createServer(async (req, res) => {
				let currUrl: string = url.parse(req.url || '').pathname || ''
				currUrl = currUrl.replace('/', '')
				const files: string[] = (await listFiles(this.mailbuilderFolderPath)).filter(
					(f) => f.includes('.js') && !f.includes('.map')
				)
				// console.log(currUrl)
				if (files.includes(currUrl)) {
					res.writeHead(200, {
						'Content-Type': 'text/html',
					})
					try {
						// console.log('currUrl', this.mailbuilderFolderPath, currUrl)
						const pathToFile = join(this.mailbuilderFolderPath, currUrl)
						const MailBuilderClass: MailBuilderInterface = new (requireUncached(pathToFile).default)()
						const { html } = await this.mailBuilder.render(MailBuilderClass)
						return res.end(html + livereloadScript(URL, currUrl))
					} catch (e) {
						debug(e)
						return res.end(e.message + livereloadScript(URL, currUrl))
					}
				} else if (currUrl === '') {
					const mappedFiles = files.map((f) => `<a href="${URL}/${f}"><h4>${f}</h4>`)
					return res.end(indexPageRender(mappedFiles.join('\n') + livereloadScript(URL, '')))
				} else {
					res.statusCode = 404
					return res.end(`Path is not finded`)
				}
			})
			.listen(PORT)

		this.logger.success(`Test server is running: ${URL}`)
		// prevent the main process from exiting...
		await new Promise(() => () => {})
	}
	public async hasFiles() {
		try {
			let mailbuilderFiles = await listFiles(this.mailbuilderFolderPath)
			return mailbuilderFiles && mailbuilderFiles.length ? true : false
		} catch (e) {
			return false
		}
	}
}
