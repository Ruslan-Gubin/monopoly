import { SelectionSocket } from "@/shared";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const selectionApi = new SelectionSocket({
  fullName: 'Ruslan', 
  id: '645a6863aa6ea6b2fe4c5942'
  // fullName: auth.fullName, 
  // id: auth.id
})

const connectSelection = createAsyncThunk<any, {fullName: string, id: string}>('sessionSlice/connectSelection', async(auth) => {
  
  selectionApi.openConnect()
  
})

const connectResponse = createAsyncThunk<any, any>('sessionSlice/connectResponse', async(auth) => {
 
console.log(auth)
  
})






// const chatNotification = createAsyncThunk<IReceivedResponse | null, INotificatioBody>('chatContentSlice/chatNotification', async(auth) => {
//   const response = await receiveMessage<IReceivedResponse>( auth.instance, auth.token )
 
//   if (!response) {
//     return null
//   } else {
//     return {...response, myWid: auth.wid}
//   }
// })

// const fetchDeleteNotification = createAsyncThunk<{result: boolean}, IDeleteNotificationParams>('chatContentSlice/fetchDeleteNotification', async(auth) => {
//   const response = await deleteNotification<{ result: boolean }>( auth.instance, auth.token, auth.params )
 
//   return response
// })



export { connectSelection, connectResponse }