export const initialState = []

const countRead = (state, id) => {
   let newMessage = 0
   let i = state.findIndex(item => item.profile.userTo._id === id)
   if(i !== -1) {
      newMessage = state[i].chat.filter(item => item.read === false).length
   }

   return newMessage
}


export const reducer = (state, action) => {
   // old
   // let i = state.findIndex(item => item.profile.contact.userTo._id === action.id)

   // new 
   let i = state.findIndex(item => item.profile.contact.userTo._id === action.id)
   
   switch (action.type) {
      case "PROFILE":
         if(i === -1){
            state.push({
               profile: action.payload,
               chat: []
            })
         }
         return [
            ...state
         ]
      case "NEW_CHAT":
         if(i !== -1){
            state[i].chat.push(...action.payload)
         }
         return [
            ...state,
         ]
      case "UPDATE_CHAT":
         if(i !== -1){
            if(state[i].chat.length === 0) {
               state[i].profile.lastMessage = action.payload.text
               state[i].chat.push(action.payload)

               return [
                  ...state
               ]
            }
            
            const length = state[i].chat.length - 1
            // jika idnya sama dengan si pengirim maka balikan state 
            if(state[i].chat[length]._id === action.payload._id){
               return [
                  ...state,
               ]
            } else {
            // jika idnya sama dengan si penerima maka balikan state dengan push data baru
               state[i].chat.push(action.payload)
               state[i].profile.lastMessage = action.payload.text
               return [
                  ...state,
               ]
            }
         }
      case "UPDATE_COUNT_UNREAD_OUTSIDE_SELECTED":
         if(i !== -1) {
            // aneh, harusnya ditambah 1 cuman nanti hasilnya unread =+ 2
            if(state[i].profile.unread === 0) {
               state[i].profile.unread += 1
            } else {
               state[i].profile.unread += 0.5
            }
            state[i].profile.lastMessage = action.payload
            return [
               ...state
            ]
         }
      case "CLEAR": 
         return null
      default:
         return state
   }   
}

