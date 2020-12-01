export const initialState = []

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

