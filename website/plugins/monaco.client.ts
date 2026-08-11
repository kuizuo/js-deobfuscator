import EditorWorker from '~/workers/editor.worker?worker'
import TypeScriptWorker from '~/workers/typescript.worker?worker'

export default defineNuxtPlugin(() => {
  self.MonacoEnvironment = {
    getWorker: (_moduleId, label) => label === 'javascript' || label === 'typescript'
      ? new TypeScriptWorker()
      : new EditorWorker(),
  }
})
