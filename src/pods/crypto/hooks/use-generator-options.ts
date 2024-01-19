import { useStore } from "@nanostores/react";
import optionsAtom from "../atoms/options";

const useGeneratorOptions = () => useStore(optionsAtom);

export const useGeneratorOptionsHandlers = () => {
  return {
    set: optionsAtom.set,
  };
};

export default useGeneratorOptions;
