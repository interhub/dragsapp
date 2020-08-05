import notification from "../service/notification";
import Message from "../comps/Message";

export default ({name, dose, type}) => {
    notification({name, dose, type})
    Message('Успешно')
}