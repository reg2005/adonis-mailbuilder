import {
	MailBuilderConfig,
	MailBuilderInterface,
	MailBuilder,
	MailBuilderRenderResponseInterface,
} from '@ioc:Adonis/Addons/MailBuilder'
import Mailgen, { Option } from 'mailgen'
import merge from 'lodash.merge'
export class MailBuilderManager implements MailBuilder {
	constructor(private config: MailBuilderConfig) {}
	public async render(
		mailInstance: MailBuilderInterface,
		isTest: boolean = false
	): Promise<MailBuilderRenderResponseInterface> {
		const mockData = await mailInstance.getMockData()
		mailInstance.data = merge(mailInstance.data, mockData)
		const optionsInClass = await mailInstance.options(isTest)
		const emailOptions: Option = merge(this.config.mailOption || {}, optionsInClass.option)
		const mailGenerator = new Mailgen(emailOptions)
		const html: string = mailGenerator.generate(optionsInClass.content)
		const text: string = mailGenerator.generatePlaintext(optionsInClass.content)
		return { html, text }
	}
}
