export const initialState = null

export const reducer = (state, action) => {
   switch (action.type) {
      case "NEW_CHAT":
         return action.payload
      case "CLEAR": 
         return null
      default:
         return state
   }
}