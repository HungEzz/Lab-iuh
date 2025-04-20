import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio,
  Box,
  Typography,
  Avatar,
  Divider,
  CircularProgress
} from '@mui/material';

function AddCustomerModal({ open, close_method }) {
  if (!open) return null;

  const [formData, setFormData] = useState({
    customerName: '',
    avatar: 'Avatar (4).png', // Default avatar
    company: '',
    orderValue: '',
    orderDate: new Date().toISOString().slice(0, 10),
    status: 'New'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    // For simplicity, just store the filename rather than trying to upload the file
    if (e.target.files && e.target.files[0]) {
      setFormData(prevData => ({
        ...prevData,
        avatar: e.target.files[0].name
      }));
    }
  };

  const validateForm = () => {
    if (!formData.customerName.trim()) {
      setError('Customer name is required');
      return false;
    }
    if (!formData.company.trim()) {
      setError('Company name is required');
      return false;
    }
    if (!formData.orderValue.trim()) {
      setError('Order value is required');
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData({
      customerName: '',
      avatar: 'Avatar (4).png',
      company: '',
      orderValue: '',
      orderDate: new Date().toISOString().slice(0, 10),
      status: 'New'
    });
    setError('');
  };

  const handleAdd = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:3001/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add customer');
      }
      
      const data = await response.json();
      console.log('Customer added successfully:', data);
      resetForm();
      setTimeout(() => {
        close_method(true);
      }, 300);
    } catch (error) {
      console.error('Error adding customer:', error);
      setError('Failed to add customer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Check if form has been modified
    const isModified = 
      formData.customerName.trim() !== '' || 
      formData.company.trim() !== '' || 
      formData.orderValue.trim() !== '';
    
    if (isModified) {
      const confirm = window.confirm('You have unsaved changes. Are you sure you want to close?');
      if (!confirm) return;
    }
    
    // Reset form and close
    resetForm();
    close_method();
  };

  return (
    <Dialog 
      open={open} 
      className='update-customer-modal'
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          overflow: 'hidden'
        }
      }}
    >
      <Box className="title-modal" sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: 'var(--secondary-color)',
        padding: '16px 24px'
      }}>
        <DialogTitle id="alert-dialog-title" sx={{ 
          padding: 0, 
          color: 'var(--primary-color)', 
          fontWeight: '600',
          fontSize: '1.25rem'
        }}>
          Add New Customer
        </DialogTitle>
        <Button 
          onClick={handleCancel} 
          className="close-button"
          sx={{
            minWidth: '36px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            padding: 0,
            backgroundColor: 'rgba(249, 73, 133, 0.1)',
            color: 'var(--primary-color)',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            '&:hover': {
              backgroundColor: 'rgba(249, 73, 133, 0.2)',
            }
          }}
        >
          ×
        </Button>
      </Box>
       
      <DialogContent sx={{ padding: '24px 32px' }}>
        {error && (
          <Box sx={{ 
            backgroundColor: 'rgba(220, 53, 69, 0.1)', 
            color: 'var(--error-color)',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '0.875rem'
          }}>
            {error}
          </Box>
        )}
        
        <TextField
          label="Customer Name"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
          error={error && !formData.customerName.trim()}
          helperText={error && !formData.customerName.trim() ? "Customer name is required" : ""}
          InputProps={{
            sx: { borderRadius: '8px' }
          }}
        />

        <Box className="file-input-container" sx={{ 
          margin: '16px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <Typography variant="body2" sx={{ fontWeight: 500, marginBottom: '4px' }}>Avatar:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button
              variant="outlined"
              component="label"
              sx={{
                borderRadius: '8px',
                borderColor: 'var(--border-color)',
                color: 'var(--text-color)',
                padding: '8px 16px',
                textTransform: 'none',
                '&:hover': {
                  borderColor: 'var(--primary-color)',
                  backgroundColor: 'rgba(249, 73, 133, 0.05)',
                }
              }}
            >
              Choose File
              <input 
                type="file" 
                id="avatar-upload"
                accept='.png,.jpg,.jpeg'
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
            </Button>
            <Box className="selected-file" sx={{ flex: 1 }}>
              {formData.avatar && (
                <Box className="avatar-preview" sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <Avatar
                    src={`/${formData.avatar}`}
                    alt="Avatar preview"
                    onError={(e) => e.target.src = "/Avatar (4).png"}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                    {formData.avatar}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <TextField
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
          error={error && !formData.company.trim()}
          helperText={error && !formData.company.trim() ? "Company name is required" : ""}
          InputProps={{
            sx: { borderRadius: '8px' }
          }}
        />

        <TextField
          label="Order Value"
          name="orderValue"
          value={formData.orderValue}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
          error={error && !formData.orderValue.trim()}
          helperText={error && !formData.orderValue.trim() ? "Order value is required" : ""}
          InputProps={{
            startAdornment: <Typography sx={{ marginRight: 8, color: 'var(--text-color)' }}>$</Typography>,
            sx: { borderRadius: '8px' }
          }}
        />

        <TextField
          label="Order Date"
          name="orderDate"
          type="date"
          value={formData.orderDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            sx: { borderRadius: '8px' }
          }}
        />

        <FormControl component="fieldset" margin="normal" sx={{ width: '100%' }}>
          <FormLabel component="legend" sx={{ color: 'var(--text-color)', fontWeight: 500 }}>Status</FormLabel>
          <RadioGroup 
            row 
            name="status" 
            value={formData.status} 
            onChange={handleChange}
            sx={{ justifyContent: 'space-between', padding: '8px 0' }}
          >
            <FormControlLabel 
              value="New" 
              control={
                <Radio 
                  sx={{ 
                    color: 'var(--text-secondary)',
                    '&.Mui-checked': {
                      color: 'var(--primary-color)',
                    }
                  }} 
                />
              } 
              label={
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Box sx={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    backgroundColor: '#42A5F5' 
                  }} />
                  <Typography>New</Typography>
                </Box>
              } 
            />
            <FormControlLabel 
              value="In-progress" 
              control={
                <Radio 
                  sx={{ 
                    color: 'var(--text-secondary)',
                    '&.Mui-checked': {
                      color: 'var(--primary-color)',
                    }
                  }} 
                />
              } 
              label={
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Box sx={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    backgroundColor: '#FF9800' 
                  }} />
                  <Typography>In Progress</Typography>
                </Box>
              } 
            />
            <FormControlLabel 
              value="Completed" 
              control={
                <Radio 
                  sx={{ 
                    color: 'var(--text-secondary)',
                    '&.Mui-checked': {
                      color: 'var(--primary-color)',
                    }
                  }} 
                />
              } 
              label={
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Box sx={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    backgroundColor: '#4CAF50' 
                  }} />
                  <Typography>Completed</Typography>
                </Box>
              } 
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ 
        padding: '16px 32px', 
        justifyContent: 'flex-end',
        gap: '16px'
      }}>
        <Button 
          onClick={handleCancel}
          className="cancel"
          disabled={loading}
          variant="outlined"
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            padding: '8px 20px',
            borderColor: 'var(--border-color)',
            color: 'var(--text-color)',
            '&:hover': {
              borderColor: 'var(--text-color)',
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleAdd} 
          variant="contained" 
          color="primary"
          className="save"
          disabled={loading}
          sx={{
            borderRadius: '8px',
            backgroundColor: 'var(--primary-color)',
            textTransform: 'none',
            padding: '8px 24px',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: '#E03E75',
              boxShadow: '0 2px 8px rgba(249, 73, 133, 0.25)',
            }
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CircularProgress size={16} color="inherit" />
              <Typography>Adding...</Typography>
            </Box>
          ) : 'Add Customer'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCustomerModal;
