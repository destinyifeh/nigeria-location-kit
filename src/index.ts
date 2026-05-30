// Types
export type { State, LGA } from "./core/types.js";

// Core logic
export {
  getStates,
  getStateById,
  getStateByName,
  getLGAs,
  searchStates,
  searchLGAs
} from "./core/location-service.js";
