import test from 'japa'
import { Kernel } from '@adonisjs/ace'
import { join } from 'path'
import { Filesystem } from '@poppinss/dev-utils'
import { Application } from '@adonisjs/application/build'
import { Ioc } from '@adonisjs/fold/build/index'
import { Config } from '@adonisjs/config/build/src/Config'
import MailBuilderServeCommand from '../commands/MailBuilderServe'
import { testConfig } from '../test-helpers/index'
// import QueueProvider from '../providers/QueueProvider'
import MailBuilderProvider from './../providers/MailBuilderProvider'

const fs = new Filesystem(join(__dirname, '__app'))
test.group('Queue test', () => {
	test('test queue:job', async (assert) => {
		console.log(fs.basePath)
		const app = new Application(join(fs.basePath, 'build'), {} as any, {} as any)
		const ioc = new Ioc()
		app.container = ioc
		ioc.bind('Adonis/Core/Config', () => new Config({ mailbuilder: testConfig }))
		const mailBuilderProvider = new MailBuilderProvider(app)
		mailBuilderProvider.register()
		const queueJob = new MailBuilderServeCommand(app, new Kernel(app))
		await queueJob.handle()
		assert.exists(1)
	}).timeout(0)
})
