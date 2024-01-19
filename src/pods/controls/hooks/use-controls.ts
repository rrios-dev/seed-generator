import { useStore } from "@nanostores/react";
import controlsAtom from "../atoms/controls";

const useControls = () => useStore(controlsAtom);

export const useControlsHandlers = () => {
  return {
    set: controlsAtom.set,
    get: controlsAtom.get,
  };
};

export default useControls;
