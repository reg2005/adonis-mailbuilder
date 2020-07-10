declare module '@ioc:Adonis/Addons/MailBuilder' {
	import { Content, Option } from 'mailgen'
	export interface MailBuilderRenderResponseInterface {
		html: string
		text: string
	}
	export interface MailBuilder {
		render(mailInstance: MailBuilderInterface, isTest?: boolean): Promise<MailBuilderRenderResponseInterface>
	}
	export interface MailBuilderConfig {
		devPort?: string
		mailOption: Option
	}
	export interface MailBuilderMailOptionsInterface {
		content: Content
		option?: Option
	}
	export interface MailBuilderInterface {
		data: any
		getMockData(): Promise<any>
		options(isTest: boolean): Promise<MailBuilderMailOptionsInterface>
	}
	const MailBuilder: MailBuilder
	export default MailBuilder
}

// Type definitions for mailgen 2.0
// Sorce Project: https://github.com/eladnava/mailgen#readme
// Sorce Definitions by: Kiet Thanh Vo <https://github.com/vothanhkiet>, Jordan Farrer <https://github.com/jordanfarrer>
// Sorce Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'mailgen' {
	export class Mailgen {
		constructor(opts: Option)

		public cacheThemes(): void

		public generate(params: Content): any

		public generatePlaintext(params: Content): any

		public parseParams(params: any): any
	}
	export default Mailgen
	export interface Option {
		theme: 'default' | 'neopolitan' | 'salted' | 'cerberus' | CustomTheme
		product: Product
	}

	interface CustomTheme {
		path: string
		plaintextPath?: string
	}

	interface Product {
		name: string
		link: string
		logo?: string
		copyright?: string
	}

	export interface Content {
		body: ContentBody
	}

	interface ContentBody {
		name?: string
		greeting?: string
		signature?: string
		title?: string
		intro?: string | string[]
		action?: Action | Action[]
		table?: Table | Table[]
		dictionary?: any
		goToAction?: GoToAction
		outro?: string | string[]
	}

	interface Table {
		data: any[]
		columns?: ColumnOptions
	}

	interface ColumnOptions {
		customWidth: any
		customAlignment: any
	}

	interface GoToAction {
		text: string
		link: string
		description: string
	}

	interface Action {
		instructions: string
		button: Button
	}

	interface Button {
		color?: string
		text: string
		link: string
	}
}
