import useControls from '@/pods/controls/hooks/use-controls';
import useGeneratorOptions from '@/pods/crypto/hooks/use-generator-options';
import CopyButton from './copy-button';

type TokenModuleProps = {
	id: number;
	tokens: string[];
};

const TokenModule = ({id, tokens}: TokenModuleProps) => {
	const {showTokens} = useControls();
	const options = useGeneratorOptions();

	return (
		<div className='flex flex-col gap-2 items-start'>
			<CopyButton text={JSON.stringify(tokens)} className='text-xl'>
        Module {id + 1}
			</CopyButton>
			{tokens.map((token, idx) => (
				<div className='flex gap-2 items-center w-full' key={`${idx}-${token}`}>
					{idx + 1}
					<CopyButton
						text={token}
						className='text-xs overflow-x-hidden whitespace-nowrap overflow-hidden overflow-ellipsis'
						key={token}
					>
						{showTokens ? token : token.replace(/./g, '*')}
					</CopyButton>
				</div>
			))}
		</div>
	);
};

export default TokenModule;
