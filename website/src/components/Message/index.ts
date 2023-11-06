import { withInstall } from 'website/src/utils'
import message from './src/message'

const Message = withInstall(message, '$message')

export {
  Message
}
export default Message