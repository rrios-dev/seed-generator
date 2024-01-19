import { useCallback, useEffect, useState, type HTMLProps } from "react";

interface CopyButtonProps
  extends Omit<HTMLProps<HTMLButtonElement>, "onClick"> {
  text: string;
}

const CopyButton = ({ text, children, ...props }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  }, [text]);
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);
  return (
    <button {...props} type="button" onClick={copy}>
      {copied ? "Copied!" : children}
    </button>
  );
};

export default CopyButton;
