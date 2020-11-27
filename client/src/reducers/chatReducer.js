export const initialState = []

export const reducer = (state, action) => {
   let i = state.findIndex(item => item.profile.userTo._id === action.id)
   // const duplicated = () => {
   //    for (let i = 0; i < state.length; i++) {
   //       // check if null
   //       if(!state[i+1]) return
   //       if(state[i].profile._id === state[i+1].profile._id) {
   //          state.splice(i, 1)
   //          return
   //       }

   //       for (let j = 0; j < state.length; j++) {
   //          if(!state[j]) return // if null return
   //          if(i === j) continue // if i equals j skip
   //          if(state[i].profile._id === state[j].profile._id) {
   //             state.splice(j, 1)
   //          }
   //       }
   //    }
   // }

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
            state[i].chat.push(action.payload)
         }
         return [
            ...state,
         ]
      case "CLEAR": 
         return null
      default:
         return state
   }   
}

