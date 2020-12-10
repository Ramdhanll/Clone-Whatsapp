export const indexActiveState = null

export const reducer = (state, action) => {
   switch (action.type) {
      case "CHANGE_INDEX_ACTIVE":
         return state = action.payload
      case "CLEAR": 
         return null
      default:
         return state
   }
}