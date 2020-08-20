import notification from "../service/notification";
import Message from "../comps/Message";

export default ({name, dose, type}) => {
    Message('Успешно')
   return notification({name, dose, type})
}