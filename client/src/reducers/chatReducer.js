export const initialState = []

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
         setTimeout(() => {
            console.log(state)
         }, 2000);
         return [
            ...state
         ]
      case "UPDATE_PROFILE_UNSAVED": 
         if(i !== -1) {
            state[i].profile.contact.unsaved = false
            state[i].profile.contact._id = action.idContact
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
            state[i].profile.lastMessage = action.payload.text
            // jika panjang chat = 0 dan unread kosong/undefined jalan kode dibawah
            if(state[i].chat.length === 0 && state[i].profile.unread === undefined) {
               if(localStorage.getItem("userId") === action.payload.to) {
                  state[i].profile.unread = 0.5
                  return [
                     ...state
                  ]
               } 
            } 
            // jika state[i].chat[length] tidak undefined jalankan code dibawa
            const length = state[i].chat.length - 1
            if(state[i].chat[length]) {
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
            
            // jika idnya sama dengan si penerima maka balikan state dengan push data baru
            if (localStorage.getItem("userId") === action.payload.from) {
               state[i].chat.push(action.payload)
               return [
                  ...state
               ]
            } 

            return [
               ...state,
            ]
         }
      case "UPDATE_COUNT_UNREAD_INSIDE_SELECTED":
         if(i === 1) {
            // aneh, harusnya ditambah 1 cuman nanti hasilnya unread =+ 2
            if(state[i].profile.unread === 0) {
               state[i].profile.unread += 1
            } else {
               state[i].profile.unread += 0.5
            }
            state[i].profile.lastMessage = action.payload
            state[i].profile.createdAt = action.createdAt
            return [
               ...state
            ]
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
            state[i].profile.createdAt = action.createdAt
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

