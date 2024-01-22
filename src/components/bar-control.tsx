import {Button} from '@nextui-org/react';
import {
    ClipboardIcon,
    DownloadIcon,
    EyeClosedIcon,
    EyeOpenIcon,
} from '@radix-ui/react-icons';

import useControls, {
    useControlsHandlers,
} from '@/pods/controls/hooks/use-controls';
import useGeneratorOptions from '@/pods/crypto/hooks/use-generator-options';
import useGenerators from '@/pods/crypto/hooks/use-generators';

const BarControl = () => {
    const {showTokens} = useControls();
    const controlsHandlers = useControlsHandlers();
    const options = useGeneratorOptions();
    const tokens = useGenerators(options);

    const hasData = Boolean(tokens.data?.length);

    const copyTokens = async () => {
        await navigator.clipboard.writeText(JSON.stringify(tokens.data));
    };

    const downloadTokens = () => {
        const link = document.createElement('a');
        const file = new Blob([JSON.stringify(tokens.data)], {type: 'text/plain'});
        link.href = URL.createObjectURL(file);
        document.body.appendChild(link);
        link.download = 'secrets.txt';
        link.click();
        link.remove();
    };

    return (
        <div className='flex gap-2'>
            <Button
                isIconOnly
                onClick={() => {
                    const state = controlsHandlers.get();
                    controlsHandlers.set({...state, showTokens: !state.showTokens});
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
