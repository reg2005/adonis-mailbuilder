import test from 'japa'
import { join } from 'path'
import { Ignitor } from '@adonisjs/core/build/src/Ignitor'
import { createServer } from 'http'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
test.group('Queue test', async (group) => {
	let app: ApplicationContract
	group.before(async () => {
		const httpServer = new Ignitor(join(__dirname, '..', 'source')).httpServer()
		app = httpServer.application
		// const mb = new MailBuilderProvider(app)
		await app.setup()
		await app.registerProviders()
		await httpServer.start((handler) => createServer(handler))
		// mb.register()
		await app.bootProviders()

		// await mb.boot()
		console.log('app', app.appRoot)
	})

	// group.after(async () => {
	// 	await httpServer.close()
	// })
	test('test queue:job', async (assert) => {
		// console.log('lookup', adonisApp.iocContainer.('App/MailBuilder'))
		// const canvasApi = adonisApp.iocContainer.use('App/MailBuilder/HiUserMailBuilder')
		// console.log('canvasApi', canvasApi)
		await new Promise(() => setTimeout(() => {}, 30000))
		assert.exists(1)
	}).timeout(0)
})
