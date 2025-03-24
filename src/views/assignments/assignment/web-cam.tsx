'use client';

import Webcam from 'react-webcam';

import { Button, Stack } from '@mui/material';

import { Icon } from '@/components/icon';

export default function WebCam({
    enabled,
    onEnable,
    onDisable,
}: {
    enabled: boolean;
    onDisable(): void;
    onEnable(): void;
}) {
    return (
        <Stack gap={2} minHeight='100%' justifyContent='space-between'>
            {enabled ? (
                <Webcam
                    mirrored
                    style={{
                        height: 400,
                        width: '100%',
                        borderRadius: 20,
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                    onUserMedia={onEnable}
                    onUserMediaError={onDisable}
                />
            ) : (
                <Stack
                    px={6}
                    py={12}
                    flex={1}
                    height='100%'
                    display='flex'
                    bgcolor='#fff'
                    borderRadius={4}
                    justifyContent='center'
                    border='2px solid transparent'
                    sx={{
                        background:
                            'linear-gradient(white, white) padding-box, linear-gradient(.04deg, #4FD1C5 .04%, rgba(237,135,4,0) 99.97%) border-box',
                    }}>
                    <Icon size={100} name='webcam' />
                </Stack>
            )}
            <Button
                variant='contained'
                sx={{ width: '100%' }}
                onClick={enabled ? onDisable : onEnable}>
                {enabled ? 'Disable WebCam' : 'Enable WebCam'}
            </Button>
        </Stack>
    );
}
