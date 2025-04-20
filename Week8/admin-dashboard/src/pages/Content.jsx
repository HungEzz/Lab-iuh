import React, { useEffect, useState } from 'react'
import AddCustomerModal from '../components/AddCustomerModal'
import EnhancedTable from '../components/Table.jsx'

// Helper function to format numbers
const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
  }).format(num);
};

// Helper function to format percentages
const formatPercentage = (percentage) => {
  const value = parseFloat(percentage);
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};

// Loading spinner component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
);

function Content() {
  const [overviews, setOverviews] = useState([])
  const [customers, setCustomers] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchCustomerData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:3001/customer")
      const data = await response.json()
      setCustomers(data)
    } catch (error) {
      console.error("Error fetching customer data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchOverviewData = async () => {
    try {
      const response = await fetch('http://localhost:3000/overview')
      const data = await response.json()
      setOverviews(data)
    } catch (error) {
      console.error("Error fetching overview data:", error)
    }
  }
  
  useEffect(() => {
    fetchOverviewData()
    fetchCustomerData()
  }, [])

  // Add this useEffect to ensure customer data is re-fetched when needed
  useEffect(() => {
    // This effect runs whenever customers change to ensure UI is updated
    console.log("Customers data updated, count:", customers.length)
  }, [customers]);

  const handleClickOpenModal = () => {
    setOpenModal(true)
  }

  const handleClickCloseModal = (shouldRefresh = false) => {
    setOpenModal(false)
    if (shouldRefresh) {
      console.log("Refreshing customer data after add/update")
      fetchCustomerData()
    }
  }

  return (
    <div className="content">  
      <div className="content-header">
        <img src="/Squares four 1.png" alt="" />
        <h4>Overview</h4>
      </div>
      
      <div className="overview-cards">
        <ul>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            overviews.map((overview, index) => (
              <li key={index}>
                <div className={`overview-card overview-card-${index}`}>
                  <div className="overview-card-content">
                    <h5>{overview.title}</h5>
                    <h4>{overview.unit}{formatNumber(overview.value)}</h4>
                    <span className={`change-value ${parseFloat(overview.change) >= 0 ? 'positive' : 'negative'}`}>
                      {formatPercentage(overview.change)}
                    </span>
                    <span className="change-label">period of change</span>
                  </div>
                  <div className="overview-card-icon">
                    <img src={overview.img} alt="" />
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div> 

      <div className="detailed-report-header">
        <div className="report-title">
          <img src="/File text 1.png" alt="" />
          <h4>Detailed report</h4>
        </div>
        <div className="report-actions">
          <button onClick={handleClickOpenModal}>+ Add</button>
          <AddCustomerModal 
            open={openModal} 
            close_method={handleClickCloseModal} 
          />
        </div>
      </div>

      <div className="data-table-container">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <EnhancedTable 
            customersProps={customers} 
            onRefreshNeeded={fetchCustomerData} 
          />
        )}
      </div>
    </div>
  )
}

export default Content

