import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { join } from 'path'
import { promises } from 'fs'
export function getMailBuilderCompiledClassesPath(app: ApplicationContract) {
	return join(process.cwd(), '/build/', app.resolveNamespaceDirectory('mailbuilder') || 'app/MailBuilder')
}
export function getMailBuilderAppClassesPath(app: ApplicationContract) {
	return join(process.cwd(), app.resolveNamespaceDirectory('mailbuilder') || 'app/MailBuilder')
}
export async function dirIsExists(path) {
	try {
		return !!(await promises.readdir(path))
	} catch (e) {
		return false
	}
}
export async function getMailBuilderTmpPath() {
	const path = join(process.cwd(), 'tmp')
	try {
		if (!(await dirIsExists(path))) {
			await promises.mkdir(path)
		}
	} catch (e) {
		console.error(e.message)
	}
	return path
}

export const listFiles = (path: string): Promise<string[]> => {
	return promises.readdir(path)
}

export const livereloadScript = (url: string, filePath: string) => `<script>
window.bodyTextForLiveReload = ''
setInterval(function() {
	fetch(new Request('${url}/${filePath}'))
		.then(function (response){
			response.text().then(function (text) {
				if(window.bodyTextForLiveReload !== text){
					window.bodyTextForLiveReload = text
					document.body.innerHTML = text
					console.log('Set new body')
				}
			});
		})
}, 1000)
</script>`

export const indexPageRender = (files: string) => `
	<h1>Please select your mailbuilder:</h1>
	${files}
	<style>
	body{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	</style>`
