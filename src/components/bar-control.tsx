import useControls, {
  useControlsHandlers,
} from "@/pods/controls/hooks/use-controls";
import { isNotNil } from "ramda";
import useGeneratorOptions from "@/pods/crypto/hooks/use-generator-options";
import { Button } from "@nextui-org/react";
import {
  ClipboardIcon,
  DownloadIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import { useMemo } from "react";
import useSWR, { useSWRConfig } from "swr";

const BarControl = () => {
  const config = useSWRConfig();
  const { showTokens } = useControls();
  const controlsHandlers = useControlsHandlers();
  const options = useGeneratorOptions();
  const getCurrentTokens = () =>
    Array.from({ length: options.modulesCount })
      .map(
        (_, idx) =>
          config.cache.get(
            `#tokensByModule:${options.tokensByModule},tokenLength:${options.tokenLength},seed:"${options.seed}-${idx}",`
          )?.data
      )
      .filter(Boolean);
  const data = useMemo(getCurrentTokens, [
    options.modulesCount,
    options.seed,
    options.tokenLength,
    options.tokensByModule,
  ]);

  const hasData = data.length > 0;

  const copyTokens = () => {
    navigator.clipboard.writeText(JSON.stringify(data));
  };

  const downloadTokens = () => {
    const link = document.createElement("a");
    const file = new Blob([JSON.stringify(data)], { type: "text/plain" });
    link.href = URL.createObjectURL(file);
    document.body.appendChild(link);
    link.download = "secrets.txt";
    link.click();
    link.remove();
  };

  return (
    <div className="flex gap-2">
      <Button
        isIconOnly
        onClick={() => {
          const state = controlsHandlers.get();
          controlsHandlers.set({ ...state, showTokens: !state.showTokens });
        }}
      >
        {showTokens ? <EyeOpenIcon /> : <EyeClosedIcon />}
      </Button>

      {hasData && (
        <>
          <Button isIconOnly onClick={downloadTokens}>
            <DownloadIcon />
          </Button>
          <Button isIconOnly onClick={copyTokens}>
            <ClipboardIcon />
          </Button>
        </>
      )}
    </div>
  );
};

export default BarControl;
