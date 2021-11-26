// import CryptoJS from "crypto-js";

// export const encryptData = (data, salt) =>
//   CryptoJS.AES.encrypt(JSON.stringify(data), salt).toString();

// export const decryptData = (ciphertext, salt) => {
//   const bytes = CryptoJS.AES.decrypt(ciphertext, salt);
//   try {
//     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   } catch (e) {
//     return null;
//   }
// };
//

export const encryptData=(data,salt)=> console.log("HOLA")
export const decryptData=(c,s)=> console.log("Dec")
