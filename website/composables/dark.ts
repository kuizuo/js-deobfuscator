export const isDark = useDark()

export function toggleDark(event?: MouseEvent) {
  if (event)
    event.stopPropagation()
  isDark.value = !isDark.value
}
