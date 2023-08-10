import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { PropertyInitState, PropertyModel } from "./types";

export const reducers = {

  initProperty(state: PropertyInitState, action: PayloadAction<{ propertys: PropertyModel[]}>) {
    if (action.payload.propertys.length === 0) return;
    state.propertyes = action.payload.propertys
  },

  updatePropertys(state: PropertyInitState, action: PayloadAction<{ property: PropertyModel, manyProperty: PropertyModel[] }>) {
    if (!action.payload.property || !action.payload.manyProperty) return;
    const { property, manyProperty } = action.payload

    state.propertyes = [...state.propertyes, property]
  
    if (manyProperty.length > 0) {
      manyProperty.forEach(propertyUpdate => {
        const propertyIndex = state.propertyes.findIndex(elem => elem._id === propertyUpdate._id)
        state.propertyes[propertyIndex] = propertyUpdate
      })
    }
  },

  updateProperty(state: PropertyInitState, action: PayloadAction<{ property: PropertyModel }>) {
    if (!action.payload.property) return;
    const { property } = action.payload;

    const propertyIndex = state.propertyes.findIndex(elem => elem._id === property._id);
    state.propertyes[propertyIndex] = property;
  },

  overPropertys(state: PropertyInitState, action: PayloadAction<{ owner_id: string }>) {
    if (!action.payload.owner_id) return;
    const { owner_id } = action.payload;

    state.propertyes = state.propertyes.filter(property => property.owner !== owner_id);
  },

  resetPropertys(state: PropertyInitState) {
    state.propertyes = [];
  },

};
