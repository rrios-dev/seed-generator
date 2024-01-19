import useControls from "@/pods/controls/hooks/use-controls";
import useGenerator from "@/pods/crypto/hooks/use-generator";
import useGeneratorOptions from "@/pods/crypto/hooks/use-generator-options";
import { dissoc } from "ramda";
import CopyButton from "./copy-button";

interface TokenModuleProps {
  id: number;
}

const TokenModule = ({ id }: TokenModuleProps) => {
  const { showTokens } = useControls();
  const options = useGeneratorOptions();
  const { data } = useGenerator({
    ...dissoc("modulesCount", options),
    seed: `${options.seed}-${id}`,
  });

  return (
    <div className="flex flex-col gap-2 items-start">
      <CopyButton text={JSON.stringify(data)} className="text-xl">
        Module {id + 1}
      </CopyButton>
      {data?.map((token, idx) => (
        <div className="flex gap-2 items-center w-full" key={`${idx}-${token}`}>
          {idx + 1}
          <CopyButton
            text={token}
            className="text-xs overflow-x-hidden whitespace-nowrap overflow-hidden overflow-ellipsis"
            key={token}
          >
            {showTokens ? token : token.replace(/./g, "*")}
          </CopyButton>
        </div>
      ))}
    </div>
  );
};

export default TokenModule;
