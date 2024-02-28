import * as DocumentPicker from "react-native-document-picker"
export const handleAttachment = async setFiles => {
  try {
    const file = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles]
    })
    console.log("FILE===>", file)
    setFiles("files", file)
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log("Cancel in handleAttachment", err)
    } else {
      console.log("ERROR in handleAttachment==>", err)
    }
  }
}
