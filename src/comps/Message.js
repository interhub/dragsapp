import { Alert } from "react-native";

export default ( message='', title = '' ) => {
  Alert.alert(
    title,
    message,
    [
      {text: "OK", onPress: () => console.log("OK Pressed")}
    ],
    {cancelable: false}
  );

}
