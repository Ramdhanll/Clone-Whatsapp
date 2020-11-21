export const initialState = null

export const reducer = (state, action) => {
   switch (action.type) {
      case "SELECT_PROFILE":
         console.log('select running')
         return state = action.payload
      case "CLEAR": 
         return null
      default:
         return state
   }
}