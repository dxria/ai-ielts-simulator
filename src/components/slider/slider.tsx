import React, { ReactNode, useCallback, useEffect, useState } from 'react'

import { Box } from '@mui/material'

export default function Slider({ children }: { children: ReactNode[] }) {
    return <MobileSlider slides={children} />
}

export function MobileSlider({ slides }: { slides: ReactNode[] }) {
    const [activeSlide, setActiveSlide] = useState(1)

    const slideCount = slides.length

    const nextSlide = useCallback(() => {
        setActiveSlide((prev) => (prev < slideCount ? prev + 1 : 1))
    }, [slideCount])

    useEffect(() => {
        const interval = setInterval(nextSlide, 7000)
        return () => clearInterval(interval)
    }, [nextSlide, slideCount])

    return (
        <Box
            width='100%'
            height='100%'
            display='flex'
            overflow='hidden'
            textAlign='center'
            alignItems='center'
            position='relative'
            flexDirection='column'
            justifyContent='center'
        >
            <Box
                width='100%'
                display='flex'
                textAlign='center'
                alignItems='center'
                flexDirection='column'
                justifyContent='center'
            >
                <Box width='100%' overflow='hidden' position='relative'>
                    <Box
                        display='flex'
                        mb={{ sm: 2, md: 4 }}
                        sx={{
                            transition: 'transform 0.5s ease-in-out',
                            transform: `translateX(-${(activeSlide - 1) * 100}%)`,
                        }}
                    >
                        {slides.map((slide, idx) => (
                            <Box
                                key={idx}
                                width='100%'
                                flexShrink={0}
                                display='inline-block'
                            >
                                <Box
                                    height='100%'
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                >
                                    {slide}
                                </Box>
                            </Box>
                        ))}
                    </Box>

                    <Box
                        p={1}
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                    >
                        {slides.map((_, index) => (
                            <Box
                                key={index}
                                mx={0.5}
                                borderRadius={3}
                                width={{ xs: 8, sm: 8, md: 12 }}
                                height={{ xs: 8, sm: 8, md: 12 }}
                                bgcolor={
                                    activeSlide === index + 1
                                        ? 'primary.main'
                                        : '#D9D9D9'
                                }
                                onClick={() => setActiveSlide(index + 1)}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export function Slide({ children }: React.PropsWithChildren) {
    return (
        <Box
            id='slide'
            width='100%'
            height='100%'
            display='flex'
            justifyContent='center'
        >
            {children}
        </Box>
    )
}
