import React from 'react'
import { Box, Typography, Link } from '@mui/material'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <Box className="footer" sx={{
      textAlign: 'center',
      padding: '1rem',
      borderTop: '1px solid var(--border-color)',
      backgroundColor: '#ffffff'
    }}>
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{ 
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
        }}
      >
        © {currentYear} Dashboard UI Kit. All rights reserved. Made with ❤️ by <Link 
          href="#" 
          underline="hover"
          sx={{ 
            color: 'var(--primary-color)',
            fontWeight: 500,
            transition: 'color 0.2s',
            '&:hover': {
              color: '#E03E75'
            }
          }}
        >
          Minimal UI
        </Link>
      </Typography>
    </Box>
  )
}

export default Footer
