import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { FaClipboard, FaClipboardCheck } from "react-icons/fa6";


const CopyPrompt = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <>
            <Tooltip arrow placement='right' title={copied ? "Copied" : "Copy"}>
                {copied ? (
                    <IconButton className='text-black/30 hover:text-black/70'>
                        <FaClipboardCheck className='text-base' />
                    </IconButton>
                ) : (
                    <IconButton className='text-black/30 hover:text-black/70'
                        onClick={() => copyToClipboard(text)}
                    >
                        <FaClipboard className='text-base' />
                    </IconButton>
                )
                }
            </Tooltip>
        </>
    )
}

export default CopyPrompt