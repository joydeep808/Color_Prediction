import { create } from "zustand";
import { TColorResponse, UserBidMapper } from "../types/Types";


interface UserState {
  predictions: TColorResponse[];
  userBids: UserBidMapper[]
  balance:number;
  setPredictions?: (predictions: TColorResponse[]) => void;  
  setUserBids?: (userBids:UserBidMapper[]) => void
  setSinglePrediction:(prediction:TColorResponse)=>void;
  setSingleUserBid:(userBid:UserBidMapper)=>void
  setBalance:(balance:number)=>void
}


export const userStore = create<UserState>((set) => ({
  predictions: [],
  userBids: [],
  balance:0,
  setPredictions: (predictions) => set({ predictions }),
  setUserBids: (userBids) => set({ userBids }),
  setSinglePrediction: (prediction) => set((p) => {
    // Check if the array length is 10
    if (p.predictions.length === 10) {
      // If length is 10, slice to keep the first 9 and add the new prediction
      p.predictions = [...p.predictions.slice(0, 9), prediction];
    } else {
      // If length is less than 10, just add the prediction
      p.predictions.push(prediction);
    }
    // Return the updated state
    return { predictions: p.predictions };
  }),
  setSingleUserBid: (userBid) => set((b) => {
    // Check if the array length is 10
    if (b.userBids.length === 10) {
      // If length is 10, slice to keep the first 9 and add the new prediction
      b.userBids = [...b.userBids.slice(0, 9), userBid];
    } else {
      // If length is less than 10, just add the prediction
      b.userBids.push(userBid);
    }
    // Return the updated state
    return { userBids: b.userBids };

  }),
  setBalance:(balance)=>set({balance})
}))