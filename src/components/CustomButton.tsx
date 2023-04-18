import { Button } from '@mui/material'
import * as React from 'react'

interface btnProps {
    size?: 'large' | 'medium' | 'small'
    color?: 'primary' | 'sub' | string
    children?: React.ReactNode
}

interface ColorMap {
    [key: string]: string
}
const CustomButton = ({ size = 'medium', color = 'primary', children, ...rest }: btnProps) => {
    const colorMap: ColorMap = {
        primary: '#5c940d',
        sub: '#ffffff',
    }

    const widthMap = {
        large: '78vw',
        medium: '44.2vw',
        small: '3vw',
    }

    const backgroundColor = colorMap[color] || color
    const width = widthMap[size] || widthMap['medium']
    const textColor = color === 'primary' ? '#ffffff' : colorMap.primary
    const borderRadius = '20px'
    const border = '1px solid #5c940d'

    return (
        <Button style={{ width, backgroundColor, borderRadius, color: textColor, border }} {...rest}>
            {children}
        </Button>
    )
}

export default CustomButton
