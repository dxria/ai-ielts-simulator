import { Box, type BoxProps } from '@mui/material';

import { type IconName } from '@/types/name';

export { IconName };

/**
 * Renders an SVG icon. The icon defaults to the size of the font. To make it
 * align vertically with neighboring text, you can pass the text as a child of
 * the icon and it will be automatically aligned.
 * Alternatively, if you're not ok with the icon being to the left of the text,
 * you need to wrap the icon and text in a common parent and set the parent to
 * display "flex" (or "inline-flex") with "items-center" and a reasonable gap.
 */
export function Icon({
    name,
    children,
    size = '1rem',
    ...props
}: BoxProps<'svg'> & {
    name: IconName;
    size?: string | number;
}) {
    if (children) {
        return (
            <Box gap={1} component='span' alignItems='center' display='inline-flex'>
                <Icon name={name} {...props} />
                {children}
            </Box>
        );
    }

    return (
        <Box
            width={size}
            height={size}
            component='svg'
            display='inline'
            alignSelf='center'
            {...props}>
            <use href={`/icons/sprite.svg#${name}`} />
        </Box>
    );
}
