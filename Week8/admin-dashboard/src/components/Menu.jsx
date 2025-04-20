import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { HeaderContext } from './HeaderContext'
import { Box, Typography, Button, Divider } from '@mui/material'

function Menu() {
  const { setTileHeader } = useContext(HeaderContext)

  const handleChangeTitle = (title) => {
    setTileHeader(title)
  }

  return (
    <Box className="menu" sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#ffffff',
      boxShadow: '1px 0 3px rgba(0, 0, 0, 0.06)'
    }}>
      <NavLink 
        to="/logo" 
        className={({isActive}) => `child ${isActive ? 'active' : ''}`} 
        onClick={() => handleChangeTitle("Dashboard")}
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '1.5rem 0',
          marginBottom: '0.5rem'
        }}
      >
        <img src="/Image 1858.png" alt="Logo" height="20%" style={{ maxHeight: '32px' }} />
      </NavLink>
      
      <Divider sx={{ mb: 2 }} />
      
      <Box sx={{ padding: '0 0.5rem' }}>
        <NavLink 
          to="/" 
          end 
          className={({isActive}) => `child ${isActive ? 'active' : ''}`} 
          onClick={() => handleChangeTitle("Dashboard")}
          style={({ isActive }) => ({
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          })}
        >
          <img src="/Squares four 1.png" alt="Dashboard icon" /> 
          <Typography sx={{ fontWeight: ({ isActive }) => isActive ? 500 : 400 }}>Dashboard</Typography>
        </NavLink>
        
        <NavLink 
          to="/teams" 
          className={({isActive}) => `child ${isActive ? 'active' : ''}`} 
          onClick={() => handleChangeTitle("Teams")}
          style={({ isActive }) => ({
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          })}
        >
          <img src="Groups.png" alt="Teams icon" /> 
          <Typography sx={{ fontWeight: ({ isActive }) => isActive ? 500 : 400 }}>Teams</Typography>
        </NavLink>
        
        <NavLink 
          to="/analytics" 
          className={({isActive}) => `child ${isActive ? 'active' : ''}`} 
          onClick={() => handleChangeTitle("Analytics")}
          style={({ isActive }) => ({
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          })}
        >
          <img src="/Pie chart.png" alt="Analytics icon" /> 
          <Typography sx={{ fontWeight: ({ isActive }) => isActive ? 500 : 400 }}>Analytics</Typography>
        </NavLink>
        
        <NavLink 
          to="/messengers" 
          className={({isActive}) => `child ${isActive ? 'active' : ''}`} 
          onClick={() => handleChangeTitle("Messengers")}
          style={({ isActive }) => ({
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          })}
        >
          <img src="/Chat.png" alt="Messengers icon" /> 
          <Typography sx={{ fontWeight: ({ isActive }) => isActive ? 500 : 400 }}>Messengers</Typography>
        </NavLink>
        
        <NavLink 
          to="/integrations" 
          className={({isActive}) => `child ${isActive ? 'active' : ''}`} 
          onClick={() => handleChangeTitle("Integrations")}
          style={({ isActive }) => ({
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          })}
        >
          <img src="/Code.png" alt="Integrations icon" /> 
          <Typography sx={{ fontWeight: ({ isActive }) => isActive ? 500 : 400 }}>Integrations</Typography>
        </NavLink>
      </Box>

      <Box className="promo-box" sx={{
        mt: 'auto',
        m: 2,
        p: 2.5,
        borderRadius: '12px',
        backgroundColor: 'var(--secondary-color)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        }
      }}>
        <img src="/Group.png" alt="Promo image" style={{ marginBottom: '1rem', maxWidth: '100%' }} />
        <Button
          variant="contained"
          sx={{
            bgcolor: 'var(--primary-color)',
            color: 'white',
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: 500,
            padding: '8px 16px',
            boxShadow: '0 2px 8px rgba(249, 73, 133, 0.2)',
            '&:hover': {
              bgcolor: '#E03E75',
              boxShadow: '0 4px 12px rgba(249, 73, 133, 0.3)',
            }
          }}
        >
          Try now
        </Button>
      </Box>
    </Box>
  )
}

export default Menu
