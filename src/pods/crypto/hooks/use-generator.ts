import SHA3 from "crypto-js/sha3";
import useSWRImmutable from "swr/immutable";

import { formatPassword } from "../crypto";
import type { GeneratorOptions } from "../interfaces";

const fetcher = ({
  seed,
  tokenLength,
  tokensByModule,
}: Omit<GeneratorOptions, "modulesCount">) => {

  return Array.from({ length: tokensByModule }).map((_, idx) => {
    const password = SHA3(`${seed}${idx}`).toString();
    const formatedPassword = formatPassword(password, idx.toString());
    return formatedPassword.slice(0, tokenLength);
  });
};

const useGenerator = (props: Omit<GeneratorOptions, "modulesCount">) => {
  const { data, error, isValidating } = useSWRImmutable(
    props.seed ? props : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading: isValidating && Boolean(data),
  };
};

export default useGenerator;
