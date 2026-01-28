const PREFIX = 'js-deobfuscator:editor:'

export const editorWordWrap = useLocalStorage<boolean>(`${PREFIX}wrap`, true)
export const editorStickyScroll = useLocalStorage<boolean>(`${PREFIX}sticky`, true)
export const editorTheme = computed(() => (isDark.value ? 'vs-dark' : 'vs'))
