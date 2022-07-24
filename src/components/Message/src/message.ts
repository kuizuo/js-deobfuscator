import { createVNode, render, VNode } from 'vue'
import MessageComponent from './message.vue'

export type MessageType = 'success' | 'warning' | 'info' | 'error'

export interface MessageOptions {
  // 每弹出一个框 给他做一个标记
  id?: string
  message?: string
  type?: MessageType
  duration?: number
  center?: boolean
  onClose?: () => void
  offset?: number
}
export type MessageParams = MessageOptions | string

const instances: VNode[] = []

const Message = (options: MessageParams) => {
  if (typeof options == 'string') {
    options = {
      message: options,
    }
  }

  let offset = options.offset || 20
  instances.forEach((vm) => {
    offset += vm.el!.offsetHeight + 20
  })

  let userClose = options.onClose
  let opts = {
    ...options,
    offset,
    onClose: function() {
        userClose?.() 
    }
  }
  const container = document.createElement('div')

  const vm = createVNode(MessageComponent, opts as any)
  vm.props!.onDestroy = () => {
    render(null, container)
  }
  render(vm, container)

  document.body.appendChild(container.firstElementChild!)
  instances.push(vm)
}

export default Message
