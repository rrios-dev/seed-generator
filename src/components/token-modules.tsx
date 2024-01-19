import useGeneratorOptions from "@/pods/crypto/hooks/use-generator-options";
import TokenModule from "./token-module";

const TokenModules = () => {
  const { modulesCount, ...options } = useGeneratorOptions();

  return options.seed ? (
    <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 justify-items-center">
      {Array.from({ length: modulesCount }).map((_, idx) => (
        <TokenModule key={idx} id={idx} {...options} />
      ))}
    </div>
  ) : null;
};

export default TokenModules;
