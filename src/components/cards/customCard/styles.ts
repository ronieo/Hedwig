/**
 * PostCard 스타일
 */
export const cardStyle = {
    width: '380px',
    padding: '12px 0',
    border: '1px solid #5c940d',
    transition: 'all 0.3s ease-in-out',
}

/**
 * PostCard 의 CardHeader 컴포넌트 스타일
 */
export const cardHeaderStyle = {
    padding: '0',
    '& .MuiCardHeader-content': {
        display: 'flex',
        alignItems: 'center',
        gap: '0.6em',
        '& .MuiCardHeader-title': {
            fontWeight: 'bold',
            fontSize: '1.2em',
            letterSpacing: '-0.08em',
            color: '#000',
        },
        '& .MuiCardHeader-subheader': {
            fontSize: '0.8em',
            letterSpacing: '-0.1em',
            color: '#71767b',
        },
    },
}

/**
 * PostCard 의 CardContent 컴포넌트 스타일
 */
export const cardContentStyle = {
    width: 'inherit',
    padding: '0',
    margin: 'auto',
    lineHeight: '1.5em',
    overflowWrap: 'break-word',
    cursor: 'pointer',
}

/**
 * PostCard 의 CardMedia 컴포넌트 스타일
 */
export const cardMediaStyle = {
    maxWidth: 'inherit',
    objectFit: 'cover',
    margin: '0.6em 0',
    cursor: 'pointer',
}

/**
 * PostCard 의 IconButton 컴포넌트 스타일
 */
export const cardIconButtonStyle = {
    display: 'flex',
    margin: '0.6em 0',
    justifyContent: 'start',
    color: 'grey',
    button: {
        color: 'inherit',
        borderRadius: '0.5em',
        justifyContent: 'start',
        gap: '0',
    },
}

export const inputStyle = {
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'transparent',
        },
        '&:hover fieldset': {
            borderColor: 'transparent',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'transparent',
        },
    },
}
