import type Route from '@ioc:Adonis/Core/Route'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { getMailBuilderCompiledClassesPath, indexPageRender, listFiles, livereloadScript } from './utils'
import { MailBuilder } from '@ioc:Adonis/Addons/MailBuilder'
import HiUserMailBuilder from '../source/app/MailBuilder/HiUserMailBuilder'
export const mailBuilderRouter = (route: typeof Route, app: ApplicationContract) => {
	app.logger.log(
		'info',
		`mailbuilder: please open in your web browser: http://localhost:${app.env.get('PORT')}/mailbuilder`
	)
	const mailbuilderFolderPath = getMailBuilderCompiledClassesPath(app)
	const mailBuilder: MailBuilder = app.container.use('Adonis/Addons/MailBuilder')
	route
		.group(() => {
			route.get('/', async () => {
				const files: string[] = (await listFiles(mailbuilderFolderPath)).filter(
					(f) => (f.includes('.js') || f.includes('.ts')) && !f.includes('.map')
				)
				const mappedFiles = files.map((f) => `<a href="/mailbuilder/${f}"><h4>${f}</h4>`)
				return indexPageRender(mappedFiles.join('\n') + livereloadScript('/mailbuilder', ''))
			})
			route.get('/:name', async ({ params }) => {
				const MailBuilderClass: { default: typeof HiUserMailBuilder } = await import(
					`${mailbuilderFolderPath}/${params.name}`
				)
				// const MailBuilderClass: MailBuilderInterface = app.container.use(`App/MailBuilder/${params.name}`)
				const { html } = await mailBuilder.render(new MailBuilderClass.default({ name: '' }))
				return html + livereloadScript('/mailbuilder', params.name)
			})
		})
		.prefix('mailbuilder')
}
