export const initialState = []

const countRead = (state, id) => {
   let newMessage = 0
   let i = state.findIndex(item => item.profile.userTo._id === id)
   if(i !== -1) {
      console.log(state[i].chat)
      newMessage = state[i].chat.filter(item => item.read === false).length
   }

   return newMessage
}


export const reducer = (state, action) => {
   
   console.log('type', action.type)
   let i = state.findIndex(item => item.profile.userTo._id === action.id)
   
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
            // state[i].unread = countRead(state, action.id)
         }
         return [
            ...state,
         ]
      case "UPDATE_CHAT":
         if(i !== -1){
            const length = state[i].chat.length - 1
            if(state[i].chat[length]._id === action.payload._id){
               return [
                  ...state,
               ]
            } else {
               state[i].chat.push(action.payload)
               return [
                  ...state,
               ]
            }
         }
      case "CLEAR": 
         return null
      default:
         return state
   }   
}

