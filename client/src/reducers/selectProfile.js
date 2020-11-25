export const initialState = null

export const reducer = (state, action) => {
   switch (action.type) {
      case "SELECT_PROFILE":
         return state = action.payload
      case "CLEAR": 
         return null
      default:
         return state
   }
}