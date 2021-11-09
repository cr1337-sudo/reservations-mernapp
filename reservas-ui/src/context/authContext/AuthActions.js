export const loginStart = ()=>({
  type:"LOGIN_START"
})

export const loginSuccess = (user)=>({
  type:"LOGIN_SUCCESS",
  payload:user
})

export const loginFailure = (error)=>({
  type:"LOGIN_FAILURE",
  payload:error
})


export const registerStart = ()=>({
  type:"REGISTER_START"
})

export const registerSuccess = (user)=>({
  type:"REGISTER_SUCCESS",
  payload:user
})

export const registerFailure = (error)=>({
  type:"REGISTER_FAILURE",
  payload:error
})

export const errorNull = (error)=>({
  type:"ERROR_NULL"
})

export const logout = ()=>({
  type:"LOGOUT"
})
