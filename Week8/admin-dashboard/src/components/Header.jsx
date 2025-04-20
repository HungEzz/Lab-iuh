import React, { useContext } from 'react'
import { HeaderContext } from './HeaderContext.jsx'
import { Box, Typography, InputBase, Avatar, IconButton, Badge } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'

// Styled search input
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '8px',
  backgroundColor: alpha('#f7f7f7', 0.9),
  '&:hover': {
    backgroundColor: alpha('#f7f7f7', 1),
  },
  marginRight: '16px',
  width: '100%',
  maxWidth: '280px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: '0 12px',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'var(--text-color)',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '10px 10px 10px 36px',
    width: '100%',
    fontSize: '0.875rem',
  },
}));

function Header() {
  const { titleHeader } = useContext(HeaderContext)
  
  return (
    <Box className="header" sx={{
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '0.875rem 1.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
      backgroundColor: '#ffffff'
    }}>
      <Box className="header-title">
        <Typography 
          variant="h5" 
          className="title"
          sx={{ 
            color: 'var(--primary-color)',
            margin: 0,
            fontWeight: 600,
            letterSpacing: '-0.01em',
            fontSize: '1.375rem'
          }}
        >
          {titleHeader}
        </Typography>
      </Box>

      <Box className="header-actions" sx={{ display: 'flex', alignItems: 'center' }}>
        <Search>
          <SearchIconWrapper>
            <img src="/Search.png" alt="Search" style={{ width: '16px', height: '16px', opacity: 0.7 }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        
        <Box className="user-icons" sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <IconButton 
            sx={{ 
              padding: '8px',
              backgroundColor: alpha('#f5f5f5', 0.6),
              '&:hover': {
                backgroundColor: alpha('#f5f5f5', 1),
              },
              transition: 'all 0.2s ease'
            }}
          >
            <Badge 
              badgeContent={3} 
              color="error" 
              sx={{ 
                '& .MuiBadge-badge': { 
                  bgcolor: 'var(--primary-color)',
                  fontSize: '0.7rem'
                } 
              }}
            >
              <img src="/Bell 1.png" alt="Notifications" style={{ width: '20px', height: '20px' }} />
            </Badge>
          </IconButton>
          
          <IconButton 
            sx={{ 
              padding: '8px',
              backgroundColor: alpha('#f5f5f5', 0.6),
              '&:hover': {
                backgroundColor: alpha('#f5f5f5', 1),
              },
              transition: 'all 0.2s ease'
            }}
          >
            <img src="/Question 1.png" alt="Help" style={{ width: '20px', height: '20px' }} />
          </IconButton>
          
          <Avatar 
            src="/Avatar 313.png" 
            alt="User profile" 
            sx={{ 
              width: 38, 
              height: 38,
              border: '2px solid #f5f5f5',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }} 
          />
        </Box>
      </Box>
    </Box>      
  )
}

export default Header
