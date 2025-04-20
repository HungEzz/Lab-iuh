import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  FormControl, 
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

function UpdateCustomerModal({ open, customer, close_method }) {
  if (!open) return null;

  const [formData, setFormData] = useState({
    id: customer.id,
    customerName: customer.customerName || '',
    avatar: customer.avatar || '',
    company: customer.company || '',
    orderValue: customer.orderValue || '',
    orderDate: '',
    status: customer.status || 'New'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    if (customer) {
      const initialData = {
        id: customer.id,
        customerName: customer.customerName || '',
        avatar: customer.avatar || '',
        company: customer.company || '',
        orderValue: customer.orderValue || '',
        orderDate: convertToYYYYMMDD(customer.orderDate),
        status: customer.status || 'New'
      };
      setFormData(initialData);
      setOriginalData(initialData);
    }
  }, [customer]);

  // Convert date format if needed
  const convertToYYYYMMDD = (dateStr) => {
    if (!dateStr) return '';
    
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (regex.test(dateStr)) return dateStr;
    
    // Handle dd/mm/yyyy format
    if (dateStr.includes('/')) {
      const [d, m, y] = dateStr.split('/');
      return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
    
    return dateStr;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
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
    if (!formData.orderValue.toString().trim()) {
      setError('Order value is required');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`http://localhost:3001/customer/${customer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update customer');
      }
      
      const data = await response.json();
      console.log('Customer updated successfully:', data);
      close_method(true); // Pass true to indicate refresh is needed
    } catch (error) {
      console.error('Error updating customer:', error);
      setError('Failed to update customer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Check if form is dirty (has unsaved changes)
  const isFormDirty = () => {
    return (
      formData.customerName !== originalData.customerName ||
      formData.company !== originalData.company ||
      formData.orderValue.toString() !== originalData.orderValue.toString() ||
      formData.orderDate !== originalData.orderDate ||
      formData.status !== originalData.status
    );
  };

  const handleCancel = () => {
    if (isFormDirty()) {
      const confirm = window.confirm('You have unsaved changes. Are you sure you want to discard them?');
      if (!confirm) return;
    }
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
          Update Customer
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

        <Box className="avatar-display" sx={{ 
          margin: '16px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <Typography variant="body2" sx={{ fontWeight: 500, marginBottom: '4px' }}>Current Avatar:</Typography>
          <Box className="avatar-preview" sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'var(--secondary-color)',
            padding: '8px 12px',
            borderRadius: '8px',
            width: 'fit-content'
          }}>
            <Avatar
              src={`/${formData.avatar}`} 
              alt="Avatar" 
              onError={(e) => e.target.src = "/Avatar (4).png"}
              sx={{ width: 40, height: 40 }}
            />
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              {formData.avatar}
            </Typography>
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
          error={error && !formData.orderValue.toString().trim()}
          helperText={error && !formData.orderValue.toString().trim() ? "Order value is required" : ""}
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
          onClick={handleSave} 
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
              <Typography>Saving...</Typography>
            </Box>
          ) : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateCustomerModal;
