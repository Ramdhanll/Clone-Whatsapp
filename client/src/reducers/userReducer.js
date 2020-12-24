export const initialState = null

export const reducer = (state, action) => {
   switch (action.type) {
      case "USER":
         return action.payload
      case "UPDATE":
         return {
            ...state
         }
      case "UPDATE_PHOTO":
         state.photo = action.payload
         const dataToLocalStorage = {
            ...state,
            photo: action.payload
         }
         localStorage.setItem("user", JSON.stringify(dataToLocalStorage))
         return {
            ...state
         }
      case "CLEAR": 
         return null
      default:
         return state
   }
}

