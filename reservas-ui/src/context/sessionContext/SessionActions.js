export const dateChange = () => ({
  type: "DATE_CHANGE",
});

export const sessionOk = (session)=>({
  type:"SESSION_OK",
  payload: session
})

export const sessionError = ()=>({
  type:"SESSION_ERROR",
  error:true
})
